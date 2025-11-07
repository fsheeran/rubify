// import { IDEOGRAPH_BLOCKS, makeUnicodeBlockRegex } from "./unicodeRanges";
import { hanRegExp, notHanRegExp } from "./cjkUtils";
import KonohaTokenizationSchema from "./schemas/KonohaTokenizationSchema";
import type { TextSegment, Annotation, IndexPair } from "./types";
import { toHiragana } from "wanakana";
import { JSONFilePreset } from "lowdb/node";
import { error } from "@sveltejs/kit";

interface Furigana {
    // for some reason "ruby" is the base text and rt is the actual ruby text
    ruby: string;
    rt: string;
}

interface JmdictFuriganaEntry {
    text: string;
    reading: string;
    furigana: Furigana[];
}

interface JmdictData {
    [text: string]: JmdictFuriganaEntry[];
}

const jmdictDb = await JSONFilePreset<JmdictData>("$lib/server/assets/JmdictFurigana.json", {});

enum Language {
    Japanese,
}

function segmentOnHan(baseText: string, startIndex: number, endIndex: number): TextSegment[] {
    const segments: TextSegment[] = [];

    let currSegmentStart = -1;
    for (let i = startIndex; i < endIndex; i++) {
        let isHan = hanRegExp.test(baseText[i]);
        if (currSegmentStart < 0) {
            currSegmentStart = i;
        } else if (hanRegExp.test(baseText[currSegmentStart]) != isHan) {
            segments.push({ indices: [currSegmentStart, i], annotations: isHan ? undefined : [] });
            currSegmentStart = -1;
        }
    }

    if (currSegmentStart >= 0) {
        segments.push({
            indices: [currSegmentStart, endIndex],
            annotations: hanRegExp.test(baseText[currSegmentStart]) ? [] : undefined,
        });
    }

    return segments;
}

async function fetchKonoha(text: string) {
    return fetch("http://localhost:8000/api/v1/tokenize", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenizer: "sudachi", text: text }),
    });
}

export default async function (baseText: string, language: Language = Language.Japanese): Promise<TextSegment[]> {
    switch (language) {
        case Language.Japanese:
            let konohaResponse = await fetchKonoha(baseText).catch((error: TypeError) => {
                console.error("Failed to call Konoha", error);
                return null;
            });

            if (!konohaResponse) {
                return segmentOnHan(baseText, 0, baseText.length);
            }

            let tokenization = KonohaTokenizationSchema.safeParse(await konohaResponse.json());
            if (tokenization.success) {
                if (tokenization.data.tokens.map(({ surface }) => surface).join("") === baseText) {
                    const segments: TextSegment[] = [];
                    let segmentStart = 0;
                    for (const { surface, yomi, base_form, normalized_form } of tokenization.data.tokens) {
                        if (!hanRegExp.test(surface)) {
                            segments.push({ indices: [segmentStart, segmentStart + surface.length] });
                            segmentStart += surface.length;
                            continue;
                        }

                        const jmdictEntries = jmdictDb.data[normalized_form];

                        if (!jmdictEntries || jmdictEntries.length == 0) {
                            segments.push(...segmentOnHan(baseText, segmentStart, segmentStart + surface.length));
                            segmentStart += surface.length;
                            continue;
                        }

                        // select the entry whose reading matches most closely the reading from konoha
                        let bestFit: JmdictFuriganaEntry = jmdictEntries[0];
                        let bestFitScore = -1;
                        for (let entry of jmdictEntries) {
                            const entryYomi = toHiragana(entry.reading);
                            const hiraYomi = toHiragana(yomi);
                            let score = 0;
                            for (let i = 0; i < hiraYomi.length; i++) {
                                score += i < entryYomi.length && entryYomi[i] == hiraYomi[i] ? 1 : 0;
                            }
                            if (score > bestFitScore) {
                                bestFit = entry;
                                bestFitScore = score;
                            }
                        }

                        const annotations: Annotation[] = [];
                        let segIndex = 0;
                        for (let furigana of bestFit.furigana) {
                            if (furigana.rt) {
                                annotations.push({
                                    indices: [segmentStart + segIndex, segmentStart + segIndex + furigana.ruby.length],
                                    annotationText: furigana.rt,
                                });
                            }
                            segIndex += furigana.ruby.length;
                        }

                        if (annotations.length < 1) {
                            segments.push({ indices: [segmentStart, segmentStart + surface.length] });
                            segmentStart += surface.length;
                            continue;
                        }

                        segments.push({
                            indices: [annotations[0].indices[0], annotations[annotations.length - 1].indices[1]],
                            annotations,
                        });
                        segmentStart += surface.length;
                    }

                    return segments;
                } else {
                    console.warn("Konoha response does not cover full text", JSON.stringify(tokenization.data));
                }
            }

            console.warn(
                "Failed to parse Konoha response",
                tokenization.error?.message,
                JSON.stringify(konohaResponse)
            );

        default:
            return segmentOnHan(baseText, 0, baseText.length);
    }
}

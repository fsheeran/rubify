import { hanRegExp } from "$lib/cjkUtils";
import BackendAnnotateResponse from "$lib/schemas/BackendAnnotateResponse";
import type { TextSegment } from "$lib/types";

enum Language {
    Japanese = "jpn",
    Chinese = "zho"
}

function segmentOnHan(baseText: string, startIndex: number, endIndex: number): TextSegment[] {
    const segments: TextSegment[] = [];
    let nonHanSegmentStart = -1;
    for (let i = startIndex; i < endIndex; i++) {
        if (hanRegExp.test(baseText[i])) {
            if (nonHanSegmentStart >= 0) {
                segments.push({ indices: [nonHanSegmentStart, i]});
                nonHanSegmentStart = -1;
            }
            segments.push({ indices: [i, i + 1], annotations: [{ indices: [i, i + 1], annotationText: "" }] });
        }
        else {
            if (nonHanSegmentStart < 0) {
                nonHanSegmentStart = i;
            }
        }
    }
    if (nonHanSegmentStart >= 0) {
        segments.push({ indices: [nonHanSegmentStart, endIndex]});
    }

    return segments;
}

export default async function (baseText: string, language: Language = Language.Japanese): Promise<TextSegment[]> {
    switch (language) {
        case Language.Japanese:
            const parsedResponse = await fetch("http://localhost:8000/annotate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ language: language, base_text: baseText }),
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`Error fetching annotation from server: ${response.status}`);
                }
                return response.json();
            })
            .then(rawResponseBody => {
                const parsedResponse = BackendAnnotateResponse.safeParse(rawResponseBody);
                if (parsedResponse.success) {
                    return parsedResponse.data;
                }
                console.error("Failed to parse response from backend", JSON.stringify(parsedResponse.error.issues));
            })
            .catch(error => {
                console.error('Failed to deserialize response from backend:', error);
            });
            if (parsedResponse) {
                return parsedResponse;
            }
        default:
            return segmentOnHan(baseText, 0, baseText.length);

    }
}

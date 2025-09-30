// import { IDEOGRAPH_BLOCKS, makeUnicodeBlockRegex } from "./unicodeRanges";
import { hanRegExp } from "./cjkUtils";

type IndexPair = [number, number]

interface Annotation {
    // annotation indices should be relative to segment, not full base text
    indices: IndexPair;
    annotationText: string;
}

interface AnnotatedTextSegment {
    indices: IndexPair;
    annotations?: Annotation[];
};

interface AnnotatedText {
    baseText: string;
    segments: AnnotatedTextSegment[];
}

// parts of the base text not covered by annotated segments implicitly dont need annotations
// an AnnotatedTextSegment without annotations means we counldnt determine what the annotation
// should be exactly, but know there probably should be one
// example: 'お寿司が食べたい'; through some magic algorithm,
// we've determined that 寿司 should be すし, but weren't able to figure out what to do with 食

// heres an example
// let example: RubiedText = {
//   baseText: 'お寿司が食べたい',
//   segments: [
//     {
//       indices: [1, 3],
//       annotations:[
//         {
//           indices: [1, 2],
//           annotationText: 'す'
//         },
//         {
//           indices: [2, 3],
//           annotationText: 'し'
//         }
//       ]
//     },
//     {
//       indices: [4, 5]
//     },
//   ]
// }

export default function (baseText: string): AnnotatedText {
    // for now just do based on if hanzi or not
    const segments: AnnotatedTextSegment[] = []
    let currSegmentStart = -1;
    for (let i = 0; i < baseText.length; i++) {
        let char = baseText[i];
        if (hanRegExp.test(char)) {
            if (currSegmentStart == -1) {
                currSegmentStart = i;
            }
        } else if (currSegmentStart != -1) {
                segments.push({indices: [currSegmentStart, i]})
                currSegmentStart = -1;
        }
    }

    if (currSegmentStart != -1) {
        segments.push({indices: [currSegmentStart, baseText.length]})
    }

    return {
        baseText,
        segments
    }
}
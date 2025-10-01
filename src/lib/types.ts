export type IndexPair = [number, number]

export interface Annotation {
    // annotation indices should be relative to segment, not full base text
    indices: IndexPair;
    annotationText: string;
}

export interface AnnotatedTextSegment {
    indices: IndexPair;
    annotations?: Annotation[];
};

export interface AnnotatedText {
    baseText: string;
    segments: AnnotatedTextSegment[];
}

export type BaseRubyPair = [string, string | null]
export interface RubiedTextProps {
    baseRubyPairs: BaseRubyPair[]
}

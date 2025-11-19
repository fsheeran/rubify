export type IndexPair = [number, number]

export interface Annotation {
    // annotation indices should be relative to segment, not full base text
    indices: IndexPair;
    annotationText?: string;
}

export interface TextSegment {
    indices: IndexPair;
    annotations?: Annotation[];
};

export interface AnnotatedText {
    baseText: string;
    segments: TextSegment[];
}

export interface BaseRubyPair {
    baseText: string;
    rubyText?: string;
}

export interface RunProps {
    baseRubyPairs: BaseRubyPair[]
}

export interface EditableRunProps extends RunProps {
    onEdit: (pairIndex: number, pair: BaseRubyPair) => void;
}

export interface RubiedTextProps {
    pair: BaseRubyPair;
    onEdit: (pair: BaseRubyPair) => void;
}

export interface ButtonProps {
    buttonText: string;
    onClick(): void;
}

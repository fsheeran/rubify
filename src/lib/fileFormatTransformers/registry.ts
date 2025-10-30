import type { BaseRubyPair } from "$lib/types";
import { transform } from "zod/v4";

export interface FileFormatTransformer {
    fileExtension: string;
    transformerFunction: (baseRubyPairs: BaseRubyPair[]) => Promise<Blob>;
}

export const getRegistry = () => {

    const transformers: Record<string, (baseRubyPairs: BaseRubyPair[]) => Promise<Blob>> = {}

    return {
        registerTransformer: (transformer: FileFormatTransformer) => {
            transformers[transformer.fileExtension] = transformer.transformerFunction;
        },
        getTransformer: (fileExtension: string): FileFormatTransformer | undefined => {
            return {fileExtension, transformerFunction: transformers[fileExtension]};
        },
        getTransformers: (): FileFormatTransformer[] => {
            return Object.entries(transformers).map(([fileExtension, transformerFunction]) => {
                return {fileExtension, transformerFunction};
            });
        }
    }
}
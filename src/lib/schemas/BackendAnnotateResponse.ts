import * as z from "zod/v4";
import type { TextSegment, Annotation, IndexPair } from "$lib/types";

const ZodIndices = z.tuple([z.number(), z.number()]) satisfies z.ZodType<IndexPair>;

const inputAnnotation = z.object({
    indices: ZodIndices,
    annotation_text: z.string().optional(),
}) satisfies z.ZodType<Annotation>;

const outputAnnotation = inputAnnotation.transform((input) => ({
    indices: input.indices,
    annotationText: input.annotation_text,
})) satisfies z.ZodType<Annotation>;

const textSegment = z.object({
    indices: ZodIndices,
    annotations: z.array(outputAnnotation).optional(),
}) satisfies z.ZodType<TextSegment>;

export default z.array(textSegment);

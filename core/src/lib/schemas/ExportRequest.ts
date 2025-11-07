import * as z from "zod/v4";

import { getTransformers } from "$lib/fileFormatTransformers";

const fileExtension = z.literal(getTransformers().map(transformer => transformer.fileExtension));

const baseText = z.coerce
                    .string()
                    .trim()
                    .normalize()
                    .max(1000)
                    .min(1);

const rubyText = z.coerce
                    .string()
                    .normalize()
                    .max(10)
                    .optional();

const baseRubyPairs = z.array(z.strictObject({baseText, rubyText}));

export default z.object({ fileExtension, baseRubyPairs });

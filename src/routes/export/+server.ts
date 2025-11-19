import { getTransformer, getTransformers } from '$lib/server/fileFormatTransformers';
import type { RequestHandler } from './$types';

import * as z from "zod/v4";

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

const ExportRequest = z.object({ fileExtension, baseRubyPairs });


export const POST: RequestHandler = async ( { request } ) => {
    
    const safeParseResult = ExportRequest.safeParse(await request.json());

    if (!safeParseResult.success) {
        return new Response(JSON.stringify(z.treeifyError(safeParseResult.error)), { status: 400 });
    }

    let transformer = getTransformer(safeParseResult.data.fileExtension);
    if (!transformer) {
        return new Response(
            JSON.stringify({ error: `${safeParseResult.data.fileExtension} is not a valid file format` }), 
            { status: 400 });
    }

    let blob = await transformer.transformerFunction(safeParseResult.data.baseRubyPairs);

    return new Response(blob, {
        headers: {
            'Content-Type': blob.type
        }
    });
};

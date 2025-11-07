import { getTransformer } from '$lib/fileFormatTransformers/index.js';
import ExportRequest from '$lib/schemas/ExportRequest';
import z from 'zod/v4';
import type { RequestHandler } from './$types';
import { json, fail } from '@sveltejs/kit';

interface ExportResponse {
    data: Blob;
}

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

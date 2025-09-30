import type { Actions } from './$types';
import GenerateRequest from "$lib/schemas/GenerateRubyClientRequest";
import { fail, redirect, type RequestEvent } from "@sveltejs/kit";
import db from "$lib/server/db";
import { z } from "zod/v4";

async function handleGenerateRequest(event: RequestEvent) {
    const formData = await event.request.formData();
    const safeParseResult = GenerateRequest.safeParse(Object.fromEntries(formData.entries()));

    if (!safeParseResult.success) {
        // return fail(400, { error: safeParseResult.error });
        return fail(400, { error: z.treeifyError(safeParseResult.error) });
    }

    const requestEntry = {
        uuid: crypto.randomUUID(),
        timestamp: Date.now(),
        baseText: safeParseResult.data?.baseText ?? ''
    }
    await db.write(requestEntry);

    redirect(303, `generate/${requestEntry.uuid}`);

    // and then on load, do the generation and return a payload

    // return {success: true, requestId: requestEntry.uuid};
}

export const actions = {
    default: handleGenerateRequest
} satisfies Actions;
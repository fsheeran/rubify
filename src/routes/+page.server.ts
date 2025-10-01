import type { Actions } from './$types';
import GenerateRequest from "$lib/schemas/GenerateRubyClientRequest";
import { error, fail, redirect, type RequestEvent } from "@sveltejs/kit";
import db from "$lib/server/db";
import { z } from "zod/v4";
import rubify from '$lib/rubify';
import type { AnnotatedText } from '$lib/types';

function generateSessionId() {
  const byteArray = crypto.getRandomValues(new Uint8Array(32));

  let hexString = '';
  for (let i = 0; i < byteArray.length; i++) {
    hexString += byteArray[i].toString(16).padStart(2, '0');
  }

  return hexString;
}

interface PageLoadResponse {
    isInitialLoad: boolean;
    annotatedText?: AnnotatedText;
}

export const load = async ({ cookies }): Promise<PageLoadResponse> => {
	let sessionId = cookies.get('sessionid');
    if (sessionId) {
        const request = await db.read(sessionId);
        if (request) {
            return {isInitialLoad: false, annotatedText: rubify(request.baseText)};
        }
    }

    let sid = generateSessionId();
    cookies.set('sessionid', sid, { path: '/' });
    return {isInitialLoad: true}
};



async function handleGenerateRequest(event: RequestEvent) {
    const formData = await event.request.formData();
    const safeParseResult = GenerateRequest.safeParse(Object.fromEntries(formData.entries()));

    if (!safeParseResult.success) {
        return fail(400, { error: z.treeifyError(safeParseResult.error) });
    }

    const sessionId = event.cookies.get('sessionid');
    if (!sessionId) {
        return fail(400);
    }

    const requestEntry = {
        uuid: sessionId,
        timestamp: Date.now(),
        baseText: safeParseResult.data?.baseText ?? ''
    }
    await db.write(requestEntry);

    return {success: true};
}

export const actions = {
    default: handleGenerateRequest
} satisfies Actions;
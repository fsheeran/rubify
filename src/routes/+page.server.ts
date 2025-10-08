import type { Actions } from './$types';
import { z } from "zod/v4";
import db from "$lib/server/db";
import GenerateRequest from "$lib/schemas/GenerateRubyClientRequest";
import { fail, redirect, type RequestEvent } from "@sveltejs/kit";


function generateSessionId() {
  const byteArray = crypto.getRandomValues(new Uint8Array(32));

  let hexString = '';
  for (let i = 0; i < byteArray.length; i++) {
    hexString += byteArray[i].toString(16).padStart(2, '0');
  }

  return hexString;
}

interface RootPageLoadResponse {}

export const load = async ({ cookies }): Promise<RootPageLoadResponse> => {
    let sid = generateSessionId();
    cookies.set('sessionid', sid, { path: '/' });
    return {}
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

    throw redirect(303, '/generate');
}

export const actions = {
    default: handleGenerateRequest
} satisfies Actions;
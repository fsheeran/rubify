import db from "$lib/server/db";
import { redirect } from "@sveltejs/kit";
import type { AnnotatedText } from "$lib/types";
import rubify from '$lib/rubify';

interface GeneratePageLoadResponse {
    annotatedText?: AnnotatedText;
}

export const load = async ({ cookies }): Promise<GeneratePageLoadResponse> => {
    let sessionId = cookies.get('sessionid');
    if (sessionId) {
        const request = await db.read(sessionId);
        if (request) {
            // db.delete(sessionId);
            return {annotatedText: rubify(request.baseText)};
        }
    }

    redirect(307, '/');
};

import { error } from '@sveltejs/kit';
import db from "$lib/server/db";
import rubify from '$lib/rubify.js';


export const load = async ({ params }) => {
	const request = await db.read(params.uuid);
	if (request) {
		return rubify(request.baseText);
	}

	error(404, 'Not found');
};
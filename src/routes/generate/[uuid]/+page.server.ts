import { error } from '@sveltejs/kit';
import db from "$lib/server/db";


export const load = async ({ params }) => {
	const request = await db.read(params.uuid);
	if (request) {
		return {
			baseText: request.baseText
		};
	}

	error(404, 'Not found');
};
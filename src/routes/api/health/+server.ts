import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Model } from 'mongoose';

/* TODO Elaborate on health content */
export const GET = (async ({ url }) => {
	try {
		// send response

		return json({ status: 'OK' }, { status: 200 });
	} catch (e) {
		console.log('Error == ' + JSON.stringify(e));

		return json(e, { status: 400 });
	}
}) satisfies RequestHandler;

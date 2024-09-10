import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { queryStringToMongo, convertToRegex } from '$lib/utils/query-params';
import { DataService, GenericDataService } from '$lib/commonjs/GenericDataService';
import { WebContent } from '$lib/models/WebContent.model';
import { Payload } from '$lib/commonjs/helpers/Payload';

/**
 * GET WebContent
 */
export const GET = (async ({ url }) => {
	try {
		const q = queryStringToMongo(url.search);

		//console.log('Query == ' + JSON.stringify(q));

		const resp = await GenericDataService.fetchOne(q, WebContent, true);
		//console.log('Resp == ' + JSON.stringify(resp));

		if (!resp.data) {
			throw Error(404, 'Could not fetch data');
		}
		const ep: Payload = new Payload(resp);
		return json(ep, { status: 200 });
	} catch (e) {
		console.error(e);
		const ep = Payload.errorPayload(e);
		return json(ep, { status: 400 });
	}
}) satisfies RequestHandler;

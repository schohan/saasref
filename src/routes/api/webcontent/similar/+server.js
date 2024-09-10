import { json, error } from '@sveltejs/kit';
import { queryStringToMongo, convertToRegex } from '$lib/utils/query-params';
import { GenericDataService } from '$lib/commonjs/GenericDataService';
import { WebContent } from '$lib/models/WebContent.model';
import { Payload } from '$lib/commonjs/helpers/Payload';

/**
 * GET WebContent similar to a given category Path and tag set.
 * Create filter using 1 random tag from tag set passed and categorryPath
 */
export const GET = async ({ params, url }) => {
	try {
		// console.log(' ***** In webcontent.similar.server: url ' + url.search);
		const queryMongo = queryStringToMongo(url.search);
		if (!queryMongo.sort) {
			queryMongo.sort = { order: 1 };
		}
		// console.log('queryMongo: ' + JSON.stringify(queryMongo.filter));

		const resp = await GenericDataService.fetchData(queryMongo, WebContent);

		if (!resp.data) {
			throw Error(404, 'Could not fetch data');
		}
		const ep = new Payload(resp);
		return json(ep, { status: 200 });
	} catch (e) {
		console.error(e);
		const ep = Payload.errorPayload(e);
		return json(ep, { status: 400 });
	}
};

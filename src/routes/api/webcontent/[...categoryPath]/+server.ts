import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { queryStringToMongo, convertToRegex } from '$lib/utils/query-params';
import { DataService, GenericDataService } from '$lib/commonjs/GenericDataService';
import { WebContent } from '$lib/models/WebContent.model';
import { Payload } from '$lib/commonjs/helpers/Payload';

/**
 * GET WebContent
 */
export const GET = (async ({ params, url }) => {
	try {
		console.log(' ***** In webcontent.server: url ' + url.pathname);

		const categoryPath = params.categoryPath;
		url.search += `&categoryPath=/${categoryPath}/i`;

		console.log(' ***** In webcontent.server: ' + JSON.stringify(url.search));
		const queryMongo = queryStringToMongo(url.search);
		if (!queryMongo.sort) {
			queryMongo.sort = { order: 1 };
		}
		console.log('queryMongo: ' + JSON.stringify(queryMongo.filter));
		// queryStringToMongo(url.search)

		const resp = await GenericDataService.fetchData(queryMongo, WebContent);

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

/* Update link data  */
export const PUT = (async ({ params, request }) => {
	try {
		const id = params.id;
		const formData: Link = await request.json();
		console.log('Updating new data= ' + JSON.stringify(formData) + ' for id ' + id);

		//const resp = await Link.findOneAndUpdate(formData._id, formData);
		/* const resp = await Link.findOneAndUpdate({ _id: id }, formData, {
			safe: true,
			new: true
		});

		console.log('AFTER saving data ' + JSON.stringify(resp));

		if (!resp) {
			throw Error(404, 'Could not update data');
		} */
		const resp = await GenericDataService.update({ _id: id }, formData, Link);
		return json(resp, { status: 201 });
	} catch (e) {
		console.log('Error == ' + JSON.stringify(e));

		return json(e, { status: 400 });
		//throw error(e.status, e.message);
	}
}) satisfies RequestHandler;

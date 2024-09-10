import { List } from './list.model';
import { json, error } from '@sveltejs/kit';
import { GenericDataService } from '$lib/commonjs/GenericDataService';
import validator from 'validator';
import { queryStringToMongo } from '$lib/utils/query-params';
import { Payload, ErrorPayload } from '$lib/commonjs/helpers/Payload';
import _ from 'lodash';

export const GET = (async ({ url, locals }) => {
	try {
		const queryMongo = queryStringToMongo(url.search);
		const resp = await GenericDataService.fetchData(queryMongo, List);

		const ep: Payload = new Payload(resp);
		return json(ep, { status: 200 });
	} catch (e) {
		console.error(`Could not get user list: ` + e);
		const ep = Payload.errorPayload(e);
		return json(ep, { status: 500 });
	}
}) satisfies RequestHandler;

/**
 * Create new list
 * @param param0
 * @returns
 */
export async function POST({ locals, request }) {
	const reqBody = await request.json();

	try {
		if (!validator.isAlphanumeric(reqBody.owner)) {
			throw Error('Owner has to be a string');
		} else if (validator.isEmpty(reqBody.name)) {
			throw new Error('List name must not be empty');
		}

		const savedLists: List[] = await GenericDataService.insert(reqBody, List);

		//const response = await List.create(reqBody);
		// console.info('Created new list:' + response);
		const ep = new Payload(savedLists);
		return json(ep, { status: 201 });
	} catch (e) {
		console.error('Error : ', e);
		const ep = Payload.errorPayload(e);
		return json(ep, { status: 400 });
	}
}

/* Update multiple links  */
export const PUT = (async ({ params, request }) => {
	try {
		const reqJson = await request.json();
		if (_.isEmpty(reqJson?.filter)) {
			throw new error(400, 'No arguments passed');
		}

		const list: List = reqJson.object;
		const { filter } = queryStringToMongo(reqJson.filter);

		console.log(
			'Updating new data= ' + JSON.stringify(list) + ' for ids ' + JSON.stringify(filter)
		);

		const resp = await GenericDataService.update(filter, list, List);
		return json(resp, { status: 200 });
	} catch (e) {
		console.error('Error == ' + JSON.stringify(e));

		return json(e, { status: 400 });
		//throw error(e.status, e.message);
	}
}) satisfies RequestHandler;

export const DELETE = (async ({ url }) => {
	try {
		console.log('***** Deleting ==== ' + JSON.stringify(url.search));
		const { filter } = queryStringToMongo(url.search);

		// This code runs in the main thread
		//const catIds = await request.json();
		console.log('Deleting links= ' + JSON.stringify(filter));

		if (filter.length === 0) {
			throw Error(404, 'No link ids found for deletion. Post at least one id.');
		}

		const deletedLists = await List.deleteMany(filter);
		if (!deletedLists) {
			throw Error('Could not delete lists');
		}
		console.log('Deleted Links ' + JSON.stringify(deletedLinks));

		return json(deletedLists, { status: 201 });
	} catch (e) {
		console.log('Error == ' + e);
		return json(e, { status: 400 });
	}
}) satisfies RequestHandler;

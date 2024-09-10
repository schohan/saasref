import { json, error } from '@sveltejs/kit';
import { Model } from 'mongoose';
import { queryStringToMongo } from '$lib/utils/query-params';
import { Payload } from '$lib/commonjs/helpers/Payload';
import { GenericDataService } from '$lib/commonjs/GenericDataService';

/**
 * A generic controller that supports CRUD operations.
 * A doman specific controller can lever this class to implement CRUD operations.
 */
export class GenericController {
	static async get(urlQueryStr: string, model: Model<T>) {
		try {
			if (!urlQueryStr) throw new Error('No query passed');

			const queryMongo = queryStringToMongo(urlQueryStr);
			const resp = await GenericDataService.fetchData(queryMongo, model);
			if (!resp.data) {
				throw Error(404, 'Could not fetch data');
			}
			const ep: Payload = new Payload(resp);
			return json(ep, { status: 200 });
		} catch (e) {
			console.error('Error == ', e);
			const ep = Payload.errorPayload(e);
			return json(ep, { status: 400 });
		}
	}

	static async insertMany(data: [T], model: Model<T>) {
		try {
			// save data
			const savedRes: object = await GenericDataService.insert(data, model);

			if (!savedRes) {
				throw Error(404, 'Could not save data');
			}
			const ep = new Payload(savedRes);
			return json(ep, { status: 201 });
		} catch (e: erro) {
			console.error('Error : ', e);
			const ep = Payload.errorPayload(e);
			return json(ep, { status: 400 });
		}
	}

	static async updateMany(filter, data: T, model: Model<T>) {
		try {
			const resp = await GenericDataService.update(filter, data, model);
			const ep: Payload = new Payload(resp);
			return json(ep, { status: 200 });
		} catch (e) {
			console.error('Error == ', e);
			const ep = Payload.errorPayload(e);
			return json(ep, { status: 400 });
		}
	}

	static async deleteMany(urlQueryStr: string, model: Model<T>) {
		try {
			if (!urlQueryStr) throw new Error('No query passed');

			const queryMongo = queryStringToMongo(urlQueryStr);
			const resp = await GenericDataService.delete(queryMongo, model);
			const ep: Payload = new Payload(resp);
			return json(ep, { status: 200 });
		} catch (e) {
			console.error('Error == ', e);
			const ep = Payload.errorPayload(e);
			return json(ep, { status: 400 });
		}
	}
}

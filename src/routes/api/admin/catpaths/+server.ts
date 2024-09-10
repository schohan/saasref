/**
 * Get Category Paths
 *
 */

import { json } from '@sveltejs/kit';
import { Category } from '$lib/models/Category.model';
import { queryStringToMongo } from '$lib/utils/query-params';
import { GenericDataService } from '$lib/commonjs/GenericDataService';

function extractUidTitle(obj) {
	console.log('obj ' + obj.title);

	return {
		uid: obj.uid,
		title: obj.title,
		subcategories: obj.subcategories ? obj.subcategories.map(extractUidTitle) : []
	};
}

/* Get categories */
export const GET = (async ({ url }) => {
	try {
		const mongoQuery = queryStringToMongo(url.search, ['format']);
		// default order by is by order
		if (mongoQuery.filter.orderBy === null) {
			mongoQuery.sort = { order: 1 };
		}
		//TODO do validations here
		const resp = await GenericDataService.fetchData(mongoQuery, Category, true);

		if (!resp) {
			throw Error('Could not fetch data');
		}

		const catPaths = [];

		resp.data.forEach((data) => {
			const path = data.uid;

			const subCats = data.subcategories;
			console.log('data.subcategories ' + subCats);
			console.log('data.subcategories.length ' + subCats.length);

			subCats.forEach((subcategory) => {
				const subPath = path + '/' + subcategory.uid;
				catPaths.push(subPath);
			});
			//console.log('path: ' + path);
		});

		return json(catPaths, { status: 200 });
		// console.log('url.searchParams.get(format)  ' + url.searchParams.get('format'));
		// if (url.searchParams.get('format') == 'short') {
		// 	console.log('resp.data == ' + JSON.stringify(resp));

		// 	const shortResp = resp.data.map(extractUidTitle);
		// 	console.log('print shortform ->  ' + JSON.stringify(shortResp));
		// 	return json(shortResp, { status: 200 });
		// } else {
		// 	return json(resp, { status: 200 });
		// }
	} catch (e) {
		console.log('Error == ' + e.stack);
		return json(e.message, { status: 400 });
	}
}) satisfies RequestHandler;

/* Save categories */
export const POST = (async ({ request }) => {
	try {
		// This code runs in the main thread
		const formData: Array<Category> = await request.json();
		console.log('Received new categories= ' + JSON.stringify(formData));

		if (formData.length === 0) {
			throw Error(
				'No categories found. Post at least one category object in an array',
				'Invalid length'
			);
		}
		const savedCats = await GenericDataService.insert(formData, Category);
		console.log('-->Saved Cats ' + JSON.stringify(savedCats));

		return json(savedCats, { status: 201 });
	} catch (e) {
		return json(e.message, { status: 400 });
	}
}) satisfies RequestHandler;

/* Delete categories */
export const DELETE = (async ({ url }) => {
	try {
		console.log('***** Query ==== ' + JSON.stringify(url.search));
		const mongoQuery = queryStringToMongo(url.search);

		// TODO validate here
		//const catIds = await request.json();
		console.log('Deleting categories= ' + JSON.stringify(mongoQuery));

		//const deletedCats = await Category.deleteMany(filter);
		const deletedCats = await GenericDataService.delete(mongoQuery, Category);
		if (!deletedCats) {
			throw Error('Could not delete cats');
		}
		console.log('Deleted Cats ' + JSON.stringify(deletedCats));

		return json(deletedCats, { status: 200 });
	} catch (e) {
		console.log('Error == ' + e);
		return json(e.message, { status: 400 });
	}
}) satisfies RequestHandler;

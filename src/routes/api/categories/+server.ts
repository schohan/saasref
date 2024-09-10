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
		if (!mongoQuery.sort) {
			mongoQuery.sort = { order: 1 };
		}
		console.log('query ' + JSON.stringify(mongoQuery));

		//TODO do validations here
		const resp = await GenericDataService.fetchData(mongoQuery, Category);

		if (!resp) {
			throw Error('Could not fetch data');
		}

		console.log('url.searchParams.get(format)  ' + url.searchParams.get('format'));
		if (url.searchParams.get('format') == 'short') {
			console.log('resp.data == ' + JSON.stringify(resp));

			const shortResp = resp.data.map(extractUidTitle);
			console.log('print shortform ->  ' + JSON.stringify(shortResp));
			return json(shortResp, { status: 200 });
		} else {
			return json(resp, { status: 200 });
		}
	} catch (e) {
		console.log('Error == ' + e.stack);
		return json(e.message, { status: 400 });
	}
}) satisfies RequestHandler;

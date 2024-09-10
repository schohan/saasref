import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { SearchService } from '$lib/commonjs/SearchService';


let searchService;
function buildIndex() {
	searchService = new SearchService();
}

/* TODO Elaborate on health content */
export const GET = (async (request) => {
	try {
		const url = request.url;
		const query = url.searchParams.get('q');
		console.log('Query ' + url.searchParams.get('q'));
		const fuse = request.locals.searchIndex;
		console.log(' searchIndex == ' + fuse.getIndex().size());
		// send response
		const searchRes = fuse.search(query, { limit: 10 });

		console.log('Search Results: ', JSON.stringify(searchRes));

		return json({ status: 'OK here', results: searchRes }, { status: 200 });
	} catch (e) {
		console.log('Error == ' + e);
		return json(e, { status: 400 });
	}
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const url = request.url;
	console.log('Body == ' + JSON.stringify(request.json));

	//const service = new SearchService('testindex', fields, {});

	service.addDocuments('testindex', data);

	return json({ status: 'OK' }, { status: 200 });
}) satisfies RequestHandler;

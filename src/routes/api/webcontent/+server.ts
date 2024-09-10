import { json, error } from '@sveltejs/kit';
import { normalize } from '$lib/utils/url-params';

import type { RequestHandler } from './$types';
import { WebContent } from '$lib/models/WebContent.model';
import { GenericDataService } from '$lib/commonjs/GenericDataService';
import { getLinkPreview, getPreviewFromContent } from 'link-preview-js';

import { queryStringToMongo } from '$lib/utils/query-params';

import { Payload, ErrorPayload } from '$lib/commonjs/helpers/Payload';
import { InsertAck } from '$lib/commonjs/helpers/InsertAck';

/**
 * GET WebContent
 */
export const GET = (async ({ url }) => {
	try {
		console.log('***** In webcontent.server: ' + JSON.stringify(url.search));
		const queryMongo = queryStringToMongo(url.search);
		if (!queryMongo.sort) {
			queryMongo.sort = { order: 1 };
			//console.log('Added sort ');
		}
		console.log('queryMongo: ' + JSON.stringify(queryMongo));

		const resp = await GenericDataService.fetchData(queryMongo, WebContent);
		if (!resp.data) {
			throw Error(404, 'Could not fetch data');
		}

		console.log('After content fetched ' + new Date());

		const ep: Payload = new Payload(resp);
		return json(ep, { status: 200 });
	} catch (e) {
		console.error('Error == ', e);
		const ep = Payload.errorPayload(e);
		return json(ep, { status: 400 });
	}
}) satisfies RequestHandler;

/**
 * Accepts WebContent as lines of text + WebContent. Clean up the line before inserting the WebContent
 */
export const POST = (async ({ request }) => {
	try {
		// This code runs in the main thread
		const urls: WebContent[] = await request.json();

		// validate form data
		//Todo: validate

		// normalize WebContent before inserting
		await urls.map(async (link) => {
			link.url = await normalize(link.url);
			return link;
		});

		// save data
		const savedWebContent: WebContent[] = await GenericDataService.insert(urls, WebContent);
		//const savedWebContent: InsertAck = await WebContentervice.insert(urls, Link);

		if (!savedWebContent) {
			throw ErrorPayload(404, 'Could not save data');
		}
		console.log('Saved WebContent == ' + savedWebContent);

		// Fetch page content for page URls
		if (savedWebContent.length > 0) {
			fetchPages(savedWebContent);
		}
		const ep = new Payload(savedWebContent);
		return json(ep, { status: 201 });
	} catch (e: erro) {
		//console.error('Error == ' + JSON.stringify(e));
		console.error('Error : ', e);
		const ep = Payload.errorPayload(e);
		return json(ep, { status: 400 });
	}
}) satisfies RequestHandler;

/**
 * Add preview
 * @param linkArr
 * @returns
 */
async function addPreview(linkArr) {
	await linkArr.forEach(async (link) => {
		try {
			const data = await getLinkPreview(normalize(link?.url), {
				headers: {
					'user-agent': 'googlebot' // fetches with googlebot crawler user agent
				},
				followRedirects: `follow`,
				timeout: 3000
			});
			data.previewFetchedAt = new Date();
			data.url = normalize(data.url); // NOTE: getLinkPreview is adding extra slash for certain urls. This is to strip that.
			console.log(data.url + ' (url) - Fetched data ' + JSON.stringify(data));
			await Link.findByIdAndUpdate(link._id, data);
		} catch (e) {
			await Link.findByIdAndUpdate(link._id, { WebContenttatus: WebContenttatus.ERROR });
			console.error(e);
		}
	});
	return linkArr;
}

export const DELETE = (async ({ url }) => {
	try {
		console.log('***** Deleting ==== ' + JSON.stringify(url.search));
		const { filter } = queryStringToMongo(url.search);

		// This code runs in the main thread
		//const catIds = await request.json();
		console.log('Deleting WebContent= ' + JSON.stringify(filter));

		if (filter.length === 0) {
			throw Error(404, 'No link ids found for deletion. Post at least one WebContent id.');
		}

		const deletedWebContent = await Link.deleteMany(filter);
		if (!deletedWebContent) {
			throw Error('Could not delete WebContent');
		}
		console.log('Deleted WebContent ' + JSON.stringify(deletedWebContent));

		return json(deletedWebContent, { status: 201 });
	} catch (e) {
		console.log('Error == ' + e);
		return json(e, { status: 400 });
	}
}) satisfies RequestHandler;

/* Update multiple WebContent  */
export const PUT = (async ({ params, request }) => {
	try {
		const { filter } = queryStringToMongo(params._id);

		const formData: Link = await request.json();
		console.log(
			'Updating new data= ' + JSON.stringify(formData) + ' for ids ' + JSON.stringify(filter)
		);

		const resp = await GenericDataService.update(filter, formData, Link);
		return json(resp, { status: 200 });
	} catch (e) {
		console.error('Error == ' + JSON.stringify(e));

		return json(e, { status: 400 });
		//throw error(e.status, e.message);
	}
}) satisfies RequestHandler;

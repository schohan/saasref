import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Page } from './Page.model';
import { GenericDataService } from '$lib/commonjs/GenericDataService';
import { getLinkPreview, getPreviewFromContent } from 'link-preview-js';

import { GenericController } from '$lib/commonjs/GenericController';
import { normalize } from '$lib/utils/url-params';
import { queryStringToMongo } from '$lib/utils/query-params';
import _ from 'lodash';

/**
 * Get Pages
 */
export const GET = (async ({ url }) => {
	return await GenericController.get(url.search, Page);
}) satisfies RequestHandler;

/**
 * Accepts a list urls as
 * @aparam { "urls": ["http://url1.com", "http://url2.com"]}
 */
export const POST = (async ({ request }) => {
	//TODO validate input
	const reqJson: [string] = await request.json();
	console.log('reqJson == ' + reqJson?.urls);
	if (!reqJson.urls) throw error(404, ' Urls cannot be empty');

	const urls: [string] = reqJson.urls;

	// normalize links before inserting
	const pages: [Page] = await urls.map((rawUrl) => {
		const normUrl = normalize(rawUrl);
		const p = new Page();
		p.url = normUrl;
		return p;
	});

	return await GenericController.insertMany(pages, Page);
}) satisfies RequestHandler;

/**
 *
 * @param linkArr
 * @returns
 */
/* async function addPreview(linkArr) {
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
			await Link.findByIdAndUpdate(link._id, { linkStatus: LinkStatus.ERROR });
			console.error(e);
		}
	});
	return linkArr;
} */

/**
 *
 * Update multiple pages based on filtering criteria.
 * @param request In query string format e.g. {filter: _id=1&_id=2, object: { param1: val1}}
 */
export const PUT = (async ({ params, request }) => {
	const reqJson = await request.json();
	if (_.isEmpty(reqJson?.filter)) {
		throw new error(400, 'No arguments passed');
	}

	const page: Page = reqJson.object;
	const { filter } = queryStringToMongo(reqJson.filter);

	console.log('Updating new data= ' + JSON.stringify(page) + ' for ids ' + JSON.stringify(filter));

	return await GenericController.updateMany(filter, page, Page);
}) satisfies RequestHandler;

/**
 * Delete multiple pages based on filtering criteria
 * @param query string format e.g. "_id=1&_id=2" or "url=a.com&url=b.com" etc.
 */
export const DELETE = (async ({ url }) => {
	console.log('Deleting  ' + JSON.stringify(url.search));

	return await GenericController.deleteMany(url.search, Page);
}) satisfies RequestHandler;

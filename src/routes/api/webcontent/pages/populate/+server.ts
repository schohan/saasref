import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from '$types';
//import { Page } from '../Page.model';
import { WebContent } from '$lib/models/WebContent.model';
import { GenericDataService } from '$lib/commonjs/GenericDataService';
import { getLinkPreview, getPreviewFromContent } from 'link-preview-js';

import { GenericController } from '$lib/commonjs/GenericController';
import { normalize } from '$lib/utils/url-params';
import { queryStringToMongo } from '$lib/utils/query-params';
import _ from 'lodash';
import { Payload } from '$lib/commonjs/helpers/Payload';

/**
 * Trigger population of pages
 * @param Search string with a criteria
 * False by default.
 */
export const GET = (async ({ url }) => {
	const searchStr = url.search;

	const webcontentList = await GenericDataService.fetchData(searchStr, WebContent);
	console.log('--> Webcontent to process ' + JSON.stringify(webcontentList));

	const resp = {};

	// summarize page
	for (const page of webcontentList.data) {
		try {
			await summarizePage(resp);
		} catch (err) {
			console.error('Error summarizing page ' + page.url + ', ' + err);
		}
	}
	const ep = new Payload(pageRes);
	return json(ep, { status: 200 });
}) satisfies RequestHandler;

async function fetchPages(pages: [Page]) {
	// fetch all pages
	console.log('Fetching pages:' + pages?.length);
}

// Function to fetch a webpage and extract text
async function fetchAndExtract(url) {
	try {
		// Fetch the webpage
		const response = await fetch(url);
		const html = await response.text();

		// Use Cheerio to load the HTML content
		const $ = cheerio.load(html);

		// Extract text content
		const textContent = $('body').text();

		return textContent;
	} catch (error) {
		console.error('Error fetching or extracting content:', error.message);
		throw error;
	}
}

import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import { WebContentZod, WebContent } from '$lib/models/WebContent.model';
import { GenericDataService } from '$lib/commonjs/GenericDataService';
import { queryStringToMongo } from '$lib/utils/query-params';
import { Payload, ErrorPayload } from '$lib/commonjs/helpers/Payload';
import { getLinkPreview, getPreviewFromContent } from 'link-preview-js';

/**
 * GET links
 */
export const GET = async ({ url }) => {
	try {
		const queryMongo = queryStringToMongo(url.search);
		const resp = await GenericDataService.fetchData(queryMongo, Link);
		if (!resp.data) {
			throw Error(404, 'Could not fetch data');
		}
		const Payload = new Payload(resp);
		return json(ep, { status: 200 });
	} catch (e) {
		console.error('Error == ', e);
		const ep = Payload.errorPayload(e);
		return json(ep, { status: 400 });
	}
};

/**
 * Accepts links as lines of text + links. Clean up the line before inserting the links
 */
export const POST = async ({ request }) => {
	try {
		// This code runs in the main thread
		const urls = await request.json();

		// validate form data
		//Todo: validate

		// normalize links before inserting
		await urls.map(async (link) => {
			link.url = await normalize(link.url);
			return link;
		});

		// save data
		const savedLinks = await GenericDataService.insert(urls, Link);
		//const savedLinks: InsertAck = await LinkService.insert(urls, Link);

		if (!savedLinks) {
			throw ErrorPayload(404, 'Could not save data');
		}
		console.log('Saved Links == ' + savedLinks);

		// Fetch page content for page URls
		if (savedLinks.length > 0) {
			fetchPages(savedLinks);
		}
		const ep = new Payload(savedLinks);
		return json(ep, { status: 201 });
	} catch (e) {
		//console.error('Error == ' + JSON.stringify(e));
		console.error('Error : ', e);
		const ep = Payload.errorPayload(e);
		return json(ep, { status: 400 });
	}
};

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
			await Link.findByIdAndUpdate(link._id, { linkStatus: LinkStatus.ERROR });
			console.error(e);
		}
	});
	return linkArr;
}

export const DELETE = async ({ url }) => {
	try {
		console.log('***** Deleting ==== ' + JSON.stringify(url.search));
		const { filter } = queryStringToMongo(url.search);

		// This code runs in the main thread
		//const catIds = await request.json();
		console.log('Deleting links= ' + JSON.stringify(filter));

		if (filter.length === 0) {
			throw Error(404, 'No link ids found for deletion. Post at least one links id.');
		}

		const deletedLinks = await Link.deleteMany(filter);
		if (!deletedLinks) {
			throw Error('Could not delete links');
		}
		console.log('Deleted Links ' + JSON.stringify(deletedLinks));

		return json(deletedLinks, { status: 201 });
	} catch (e) {
		console.log('Error == ' + e);
		return json(e, { status: 400 });
	}
};

/* Update multiple links  */
export const PUT = async ({ params, request }) => {
	try {
		const { filter } = queryStringToMongo(params._id);

		const formData = await request.json();
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
};

function fetchPages(saveLinks) {
	saveLinks.forEach((link) => {
		console.log('Link === >>>>>> ' + link);

		Worker.run(add, [1, 2]);
	});
}

function add(a, b) {
	return a + b;
}

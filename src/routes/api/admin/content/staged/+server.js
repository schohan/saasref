import { StagedContent } from '$lib/models/StagedContent.model';
import { GenericDataService } from '$lib/commonjs/GenericDataService';
import { queryStringToMongo } from '$lib/utils/query-params';
import { json } from '@sveltejs/kit';
import validator from 'validator';
import _ from 'lodash';
import { normalizeWithOptions, urlExists } from '$lib/utils/url-params';

import { Payload } from '$lib/commonjs/helpers/Payload';
import { WorkerWrapper } from '$lib/commonjs/helpers/WorkerWrapper';
import { WebUtils } from '$lib/utils/WebUtils';

const STATUS_READY = 'added';

export async function GET({ url }) {
	try {
		// if (!url.searchParams.get('status')) {
		// 	url.search += `&status=${STATUS_READY}`;
		// }

		const mongoQuery = queryStringToMongo(url.search);

		//TODO do validations here
		const resp = await GenericDataService.fetchData(mongoQuery, StagedContent);

		if (!resp) {
			throw Error('Could not fetch data');
		}

		//console.log('resp==  ' + JSON.stringify(resp));

		return json(resp, { status: 200 });
	} catch (e) {
		console.log('Error == ', e);
		return json(e.message, { status: 400 });
	}
}

/**
 * Accepts WebContent as lines of text + WebContent. Clean up the line before inserting the WebContent
 */
export async function POST({ request }) {
	// This code runs in the main thread
	let postedUrls;

	try {
		// This code runs in the main thread
		postedUrls = await request.json();
		console.log('POSTED URLs ' + JSON.stringify(postedUrls));

		// normalize urls before inserting
		let stagedContent = [];
		let notProcessed = [];

		for (const u of postedUrls) {
			console.log('Processing = ' + JSON.stringify(u));
			try {
				let stagedObj = new StagedContent();

				if (typeof u === 'object') {
					stagedObj = u;
				} else {
					stagedObj.url = u;
				}

				const newUrl = await normalizeWithOptions(stagedObj.url, { normalizeProtocol: true });
				const exists = await urlExists(newUrl);

				if (!exists) {
					console.log('domain does not exists:' + newUrl);
					notProcessed.push(u);
					continue;
				}
				stagedObj.url = newUrl;
				stagedObj.domain = WebUtils.getDomain(stagedObj.url);

				// stagedContent.push(stagedObj);
				await GenericDataService.insert(stagedObj, StagedContent);
				stagedContent.push(u);
			} catch (e) {
				console.log('Error == ', e);
				notProcessed.push(u);
			}
		}
		// save data
		//const savedWebContent = await GenericDataService.insert(stagedContent, StagedContent);
		const ep = new Payload({ stagedContent, notProcessed });

		console.log('Sending response ' + JSON.stringify(ep));

		return json(ep, { status: 201 });
	} catch (e) {
		console.log('Error == ', e);
		// console.log('Details of failed insertions:', failedInserts);
		const ep = Payload.errorPayload(e);
		return json(ep, { status: 400 });
	}
}

/* Update staged content  */
export const PUT = async ({ url, request }) => {
	try {
		const { filter } = queryStringToMongo(url.search);
		const updatedStagedContent = await request.json();

		if (_.isEmpty(filter)) {
			throw Error('No arguments passed');
		}

		console.log(
			'Updating new data= ' +
				JSON.stringify(updatedStagedContent) +
				' for ids ' +
				JSON.stringify(filter)
		);

		const resp = await GenericDataService.update(filter, updatedStagedContent, StagedContent);
		return json(resp, { status: 200 });
	} catch (e) {
		console.error('Error == ' + JSON.stringify(e));

		return json(e, { status: 400 });
		//throw error(e.status, e.message);
	}
};

/**
 * Add preview
 * @param linkArr
 * @returns
 */
// async function addPreview(linkArr) {
// 	await linkArr.forEach(async (link) => {
// 		try {
// 			const data = await getLinkPreview(normalize(link?.url), {
// 				headers: {
// 					'user-agent': 'googlebot' // fetches with googlebot crawler user agent
// 				},
// 				followRedirects: `follow`,
// 				timeout: 3000
// 			});
// 			data.previewFetchedAt = new Date();
// 			data.url = normalize(data.url); // NOTE: getLinkPreview is adding extra slash for certain urls. This is to strip that.
// 			console.log(data.url + ' (url) - Fetched data ' + JSON.stringify(data));
// 			await Link.findByIdAndUpdate(link._id, data);
// 		} catch (e) {
// 			await Link.findByIdAndUpdate(link._id, { WebContenttatus: WebContenttatus.ERROR });
// 			console.error(e);
// 		}
// 	});
// 	return linkArr;
// }

export const DELETE = async ({ url, request }) => {
	try {
		console.log('DELETE Request == ' + JSON.stringify(request));

		let filter = {};
		// if request body is empty, use the query string
		if (Object.keys(request).length !== 0) {
			let filterForDeletion = await request.json();
			console.log('filterForDeletion == ' + JSON.stringify(filterForDeletion));
			filter = { $or: filterForDeletion };
		} else if (!_.isEmpty(url.search)) {
			filter = queryStringToMongo(url.search)?.filter;
			console.log('Search is SET. Filter = ' + JSON.stringify(filter));
		} else {
			throw Error('No filter found for deletion');
		}

		console.log('Filter for deletion ' + JSON.stringify(filter));
		//const { filter } = queryStringToMongo(url.search);

		// This code runs in the main thread
		//const catIds = await request.json();

		if (filter.length === 0) {
			throw Error('No link ids found for deletion. Post at least one WebContent id.');
		}

		console.log('Deleting StagedContent= ' + JSON.stringify(filter));

		const deletedWebContent = await StagedContent.deleteMany(filter);
		if (!deletedWebContent) {
			throw Error('Could not delete WebContent');
		}
		console.log('Deleted WebContent ' + JSON.stringify(deletedWebContent));

		return json(deletedWebContent, { status: 201 });
	} catch (e) {
		console.log('Error == ' + e);
		return json(e, { status: 400 });
	}
};

function fetchPages(saveWebContent) {
	saveWebContent.forEach((link) => {
		console.log('Link === >>>>>> ' + link);

		new WorkerWrapper().run(add, [1, 6]);
	});
}

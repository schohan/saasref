import { error } from '@sveltejs/kit';
import { getContentDetail } from '$lib/custom/dataloader';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const payloadResp = await getContentDetail(fetch, params.domain);

	const pageMetaTags = Object.freeze({
		title: 'Use ' + params.domain + ' for ' + params.subcategory,
		description: params.domain + ' is a top tool for ' + params.subcategory,
		openGraph: {
			title: params.domain,
			description: params.domain + ' is a top tool for ' + params.subcategory
		}
	});

	if (payloadResp) {
		return {
			payload: payloadResp.payload,
			pageMetaTags
		};
	}
}

/**
 * Load data required for /startp-tool langing page
 */
import { getContent, getCategories } from '$lib/custom/dataloader';
import { AppConfig } from '$lib/config/appConfig';

export async function load({ fetch }) {
	const limit = AppConfig.pagination?.defaultLimit || 10;
	const payloadResp = await getContent(fetch, '', 'limit=' + limit);

	const pageMetaTags = Object.freeze({
		title: 'Tools & Services',
		description: 'Startup Tools & Services',
		openGraph: {
			title: 'Tools & Services',
			description: 'Startup Tools & Services'
		}
	});

	// Return the data to be used in the page component
	return {
		payload: payloadResp?.payload,
		pageMetaTags
	};
}

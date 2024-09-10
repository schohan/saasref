/**
 * Loads /[category] page. This is the parent/group name for a set of subcategories.
 */
import { getContent } from '$lib/custom/dataloader';
import { AppConfig } from '$lib/config/appConfig';
import _ from 'lodash';

/**
 * Load data for the selected category uid
 * @param
 * @returns
 */
export async function load({ fetch, params }) {
	const limit = AppConfig.pagination?.defaultLimit || 10;
	const payloadResp = await getContent(fetch, params.category, 'limit=' + limit);

	const category = _.replace(params.category, '-', ' ');
	const pageMetaTags = Object.freeze({
		title: 'Tools & Services for ' + category,
		description: 'Various Tools & Services for ' + category,
		openGraph: {
			title: 'Tools & Services for ' + category,
			description: 'Various Tools & Services for ' + category
		}
	});

	return {
		payload: payloadResp?.payload,
		pageMetaTags,
		selectedCat: params.category
	};
}

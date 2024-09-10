/**
 * Loads /category/sub-category page
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

	const payloadResp = await getContent(
		fetch,
		params.category + '/' + params.subcategory,
		'limit=' + limit
	);

	const subcategory = _.replace(params.subcategory, '-', ' ');
	const pageMetaTags = Object.freeze({
		title: 'Tools & Services for ' + subcategory,
		description: 'Various Tools & Services for ' + subcategory,
		openGraph: {
			title: 'Tools & Services for ' + subcategory,
			description: 'Various Tools & Services for ' + subcategory
		}
	});

	return {
		payload: payloadResp?.payload,
		pageMetaTags,
		selectedCat: params.category + '/' + params.subcategory
	};
}

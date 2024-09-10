/**
 * Load data required for /startp-tool langing page
 */

import { getStagedContent } from '$lib/custom/dataloader';
import _ from 'lodash';

export async function load({ url, fetch }) {
	console.log('url.search ' + url.search);
	let query;
	// if search is not specified, default to 'status=added'
	if (_.isEmpty(url.search)) {
		query = 'status=' + (url.searchParams.get('status') ? url.searchParams.get('status') : 'added');
	} else {
		query = url.search.substring(1);
	}
	query += '&limit=50';

	console.log('admin/content/Page.server search ' + JSON.stringify(query));
	// const contentResp = await fetch(`/api/webcontent`);
	const payloadResp = await getStagedContent(fetch, '', query);

	// console.log(
	// 	'\n\n *** admin page.server.js: Payload Response from server ==>> ' +
	// 		JSON.stringify(payloadResp)
	// );

	// Return the data to be used in the page component
	return {
		payload: payloadResp?.payload
	};
}

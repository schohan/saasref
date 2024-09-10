export async function getCategories(fetch, queryString = '') {
	try {
		const catResp = await fetch(`/api/categories?${queryString}`);
		const categories = await catResp.json();

		if (catResp.ok) {
			return {
				categories: categories.data
			};
		} else throw Error(catResp.statusText);
	} catch (error) {
		console.log('Could not fetch categoriies ' + error);
		return {
			categories: []
		};
	}
}

export async function getContent(fetch, pathSuffix = '', queryString = '') {
	let contentPath = '/api/webcontent';
	if (pathSuffix !== '') {
		contentPath += '/' + pathSuffix;
	}

	const url = `${contentPath}?${queryString}`;
	try {
		const res = await fetch(url);
		if (res.ok) {
			const payloadResp = await res.json();
			// console.log(
			// 	'\n\n--------- Content Received in DataLoader.js = ' + JSON.stringify(payloadResp)
			// );
			return { payload: payloadResp };
		} else throw Error(res.statusText);
	} catch (error) {
		console.log('Could not fetch content: ' + url);
		console.log(error);
		return {};
	}
}

export async function getContentDetail(fetch, domain) {
	const url = `/api/webcontent/detail?domain=${domain}`;
	try {
		const res = await fetch(url);
		if (res.ok) {
			const payload = await res.json();
			return payload;
		} else throw Error(res.statusText);
	} catch (error) {
		console.log('Could not fetch projects: ' + url);
		console.log(error);
		return {
			payload: { data: [] }
		};
	}
}

/**
 * Fetch content for staging
 *
 * @param {} fetch
 * @param {*} pathSuffix
 * @param {*} queryString
 * @returns
 */
export async function getStagedContent(fetch, pathSuffix = '', queryString = '') {
	let contentPath = '/api/admin/content/staged';

	const url = `${contentPath}?${queryString}`;
	try {
		const res = await fetch(url);
		if (res.ok) {
			const payloadResp = await res.json();
			// console.log(
			// 	'\n\n--------- getStagedContent: Content Received in DataLoader.js = ' +
			// 		JSON.stringify(payloadResp)
			// );
			return { payload: payloadResp };
		} else throw Error(res.statusText);
	} catch (error) {
		console.log('Could not fetch content: ' + url);
		console.log(error);
		return {};
	}
}

/**
 * Fetch content similar to the content object passed
 * @param {*} fetch
 * @param {*} similarTo
 * @returns
 */
export async function getSimilarContent(fetch, similarTo, limit) {
	let contentPath = '/api/webcontent/similar';
	if (!similarTo) {
		throw Error('SimilarTo object is required');
	}
	// NOTE: Only replace # with %23 and not encode whole URI as it won't work with query to mongo.
	const hashtags = similarTo.hashtags.toString().replaceAll('#', '%23');
	const url = `${contentPath}?_id!=${similarTo._id}&hashtags=${hashtags}&limit=${limit}`;

	try {
		const res = await fetch(url);
		if (res.ok) {
			const payloadResp = await res.json();
			// console.log(
			// 	'\n\n--------- Content Received in DataLoader.js = ' + JSON.stringify(payloadResp)
			// );
			return { payload: payloadResp };
		} else throw Error(res.statusText);
	} catch (error) {
		console.log('Could not fetch content: ' + url);
		console.log(error);
		return null;
	}
}

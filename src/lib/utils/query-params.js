/**
 * see https://www.npmjs.com/package/api-query-params
 */

import aqp from 'api-query-params';
import _ from 'lodash';
import { isBlank } from '$lib/utils/string-utils';

const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 10;

// Covert query string to Mongo
export const queryStringToMongo = (query, blacklist = []) => {
	let qstring = query;

	// strip '?' character in query string as aqp() mistakenly makes it part of the param name
	if (query && query?.charAt(0) === '?') {
		qstring = query.slice(1, query.length);
	}
	const criteria = aqp(qstring, { blacklist });
	console.log('criteria == ', JSON.stringify(criteria));

	if (isBlank(criteria.limit)) {
		criteria.limit = DEFAULT_LIMIT;
	} else {
		if (criteria.limit > 100) {
			criteria.limit = MAX_LIMIT;
		}
		if (criteria.limit < 1) {
			criteria.limit = DEFAULT_LIMIT;
		}
	}

	if (isBlank(criteria.skip)) {
		criteria.skip = 0;
	} else {
		if (!criteria.skip) {
			criteria.skip = 0;
		}
		/* if (!criteria.projection) {
			criteria.projection = null;
		} */
	}

	return criteria;
};

/* Converts a JSON object to query string that can be used with a GET url */
export const paramsToQueryString = (paramsObj) => {
	let queryString = '';
	if (paramsObj == undefined) {
		return {};
	} else {
		queryString = Object.keys(paramsObj)
			.filter((key) => {
				return _.trim(paramsObj[key]) !== '';
			})
			.map((key) => {
				return encodeURIComponent(key) + '=' + encodeURIComponent(paramsObj[key]);
			})
			.join('&');
	}
	return queryString;
};

export const queryStringToParams = (queryString) => {
	let params = new URLSearchParams(queryString);
	let returnObj = {};
	for (var key of params.keys()) {
		returnObj[key] = params.get(key);
	}
	return returnObj;
};

export const convertToRegex = (val) => {
	return { $regex: val, $options: 'i' };
};

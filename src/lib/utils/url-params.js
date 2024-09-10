import normalizeUrl from 'normalize-url';
import { linkExists } from 'link-exists';

// Convert a JS object to Http Query Params
export const convertParams = (params) => {
	let convertedParams = Object.entries(params)
		.map(([key, value]) => {
			return `${key}=${value}`;
		})
		.join('&');
	return convertedParams;
};

// returns date in the format 'yyyy-mm-dd
export const formatDateForQuery = (date) => {
	return date.toISOString().split('T')[0];
};

/* Normalize a URL */
export const normalize = (url) => {
	return normalizeWithOptions(url, { stripHash: true });
};

export const normalizeWithOptions = (url, options) => {
	console.log('url = ' + url + ' options = ' + JSON.stringify(options));
	return normalizeUrl(url, options);
};

export const urlExists = async (url) => {
	return await linkExists(url);
};

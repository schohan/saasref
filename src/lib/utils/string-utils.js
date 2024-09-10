import _ from 'lodash';

/* Convert a comma and space separated string into an array */
export function stringToArray(str, toLCase = false) {
	if (str) {
		return _.split(str, /[,\r\n]/)
			.filter((e) => {
				return _.trim(e) !== '';
			})
			.map((e) => {
				if (e != '') return _.trim(toLCase ? _.toLower(e) : e);
			});
	} else {
		return [];
	}
}

export function subStr(strInp, len = 200) {
	if (isBlank(strInp)) return '';
	if (len > strInp.length) {
		len = strInp.length;
	}
	return strInp.substring(0, len);
}

export function isEmpty(obj) {
	return Object.keys(obj).length === 0;
}

/* Check if object is not undefined or not null or not empty */
export function isNotBlank(str) {
	return !_.isUndefined(str) && !_.isEmpty(_.trim(str));
}

/* Check if object is undefined or null or empty */
export function isBlank(str) {
	return _.isUndefined(str) || _.isEmpty(_.trim(str));
}

export function blankIfUndefined(str, def = '') {
	return _.isUndefined(str) ? def : str;
}

export function formatCurrency(val, currency = 'USD', fractions = 0, locale = 'en-US') {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: currency,
		minimumFractionDigits: fractions
	}).format(val);
}

export function simplifyStr(str) {
	return str.replaceAll('\t', '').replaceAll('\n', '').replaceAll(/s+/g, ' ').trim();
}

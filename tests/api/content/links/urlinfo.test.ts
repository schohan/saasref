import { expect, test } from 'vitest';
import { UrlInfo } from '../../../../src/lib/utils/UrlInfo';

test('validate URLs in UrlInfo', async ({ request }) => {
	const badUrl = 'somebadbandurl';
	const validUrl = 'https://google.com/search';

	let urlInfo: UrlInfo = new UrlInfo(badUrl);

	console.log('1 urlInfo.isValid() ' + urlInfo.isValid());

	expect(urlInfo.isValid()).toBeFalsy();

	/* urlInfo = new UrlInfo(validUrl);

	console.log('urlInfo: ' + urlInfo.domain);
	expect(urlInfo.isValid()).toBeTruthy(); */
});

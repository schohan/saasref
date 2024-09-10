import { generateSiteMap } from '$lib/commonjs/init/AppInit.js';

export async function GET({ url, headers }) {
	console.log('Generate new sitemap');

	const sitemap = generateSiteMap();

	const response = new Response({ sitemap: sitemap }, { status: 200 });
	return response;
}

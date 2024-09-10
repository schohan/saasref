import { json } from '@sveltejs/kit';
import fs from 'fs';
import { GenericDataService } from '$lib/commonjs/GenericDataService';
import { WebContent } from '$lib/models/WebContent.model';
import { AppConfig } from '$lib/config/appConfig';

export async function generateSiteMap() {
	const host = AppConfig.prodUrl;
	const webcontent = await GenericDataService.fetchData({ limit: 10000 }, WebContent);
	console.log('webcontent ' + webcontent.data.length);
	const sitemapUrls = await createSitemapUrls(host + '/startup-tools', webcontent?.data);

	const fixedUrls = [host, host + '/startup-tools'];
	const sitemap = await generateSitemapXml(fixedUrls, sitemapUrls);

	await fs.writeFileSync('static/sitemap.xml', sitemap);
	return sitemap;
}

async function generateSitemapXml(fixedUrls, dynamicUrls) {
	return `<?xml version="1.0" encoding="UTF-8" ?>
			<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
			>
			${fixedUrls
				.map(
					(page) =>
						`<url>
				<loc>${page}</loc>
				<changefreq>weekly</changefreq>
				<priority>0.9</priority>
				</url>`
				)
				.join('')}
			
			${dynamicUrls
				.map(
					(page) =>
						`<url>
						<loc>${page}</loc>
						<changefreq>daily</changefreq>
						<priority>0.7</priority>
					</url>`
				)
				.join('')}
			</urlset>`;
}

async function createSitemapUrls(baseUrl, data) {
	const sitemap = [];

	data.forEach((item) => {
		const categoryUrl = `${baseUrl}/${item.categoryPath}`;
		const contentUrl = `${baseUrl}/${item.categoryPath}/${item.domain}`;

		// Avoid adding duplicate category URLs
		if (!sitemap.includes(categoryUrl)) {
			sitemap.push(categoryUrl);
		}

		sitemap.push(contentUrl);
	});

	return sitemap;
}

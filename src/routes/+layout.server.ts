// import type { LayoutLoad } from './$types';
import navJson from '$lib/data/nav-data.json';
import { queryStringToMongo } from '$lib/utils/query-params';
import { AppConfig } from '$lib/config/appConfig.js';
import { getCategories, getContent } from '$lib/custom/dataloader';
/*
 * Top level navigation
 */
export async function load({ fetch }) {
	// For example, fetching data from an API
	const catsRespObj = await getCategories(fetch, 'limit=8');
	const catsResp = catsRespObj.categories;

	// fetch top items
	const toolsRespObj = await getContent(fetch, '', 'limit=5&sort=-createdAt');
	const toolsResp = toolsRespObj.payload.payload.data;

	// console.log('*** Categories loaded ' + JSON.stringify(catsResp));
	// console.log('*** Featured Content loaded ' + JSON.stringify(toolsResp));

	// Make certain config properties available to the client side pages
	// TODO: add feature flags here to show/hide features on the client side
	const exportedConfigs = {
		env: AppConfig.env,
		baseUrl: AppConfig.baseUrl,
		baseImagePath: AppConfig.baseImagePath,
		baseImagePathLocal: AppConfig.baseImagePathLocal,
		defaultLimit: AppConfig.defaultLimit,
		refSuffix: AppConfig.analytics.refSuffix
	};

	const baseMetaTags = Object.freeze({
		title: 'Tools & Service to Build Your Startup',
		titleTemplate: '%s | Startup Sparks',
		description:
			'A comprehensive source of various tools and services to help you go from ideation to launch in your startup journey.',
		canonical: AppConfig.prodUrl,
		openGraph: {
			type: 'website',
			url: AppConfig.prodUrl,
			locale: 'en_IE',
			title: 'Startup Sparks',
			description: 'Collection of Tools & Services to Build Your Startup',
			siteName: 'startupsparks.com',
			images: [
				{
					url: 'https://startupsparks.com/logo.jpeg',
					alt: 'Startup Sparks Logo'
				}
			]
		}
	});

	// Return the data to be used in the page component
	return {
		navs: navJson,
		featuredCats: catsResp,
		featuredTools: toolsResp,
		config: exportedConfigs,
		baseMetaTags
	};
}

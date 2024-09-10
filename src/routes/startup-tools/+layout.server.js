/**
 * Load data required for all startup pages. e.g. categories
 */
import { getCategories } from '$lib/custom/dataloader';

export async function load({ fetch }) {
	// Add your code here to fetch data or perform any other async operations
	// For example, fetching data from an API

	// const response = await fetch(`/api/categories`);
	const categories = await getCategories(fetch);

	//console.log('--> Layout.server.js categories  ==>> ' + JSON.stringify(categories));
	return {
		categories: categories.categories
	};
}

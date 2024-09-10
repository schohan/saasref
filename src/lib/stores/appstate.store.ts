/*
 * Tracks application specific state.
 * Optionally, this info can be stored in localstorage to preserve work state.
 */
import { writable } from 'svelte/store';

/*
 * Selected Filters.
 * @see API.Filters
 */
const contentFilters = {
	tenant: '',
	category: '',
	subcategory: ''
};
export const selectedFilters = writable(contentFilters);

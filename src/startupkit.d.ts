/* API request, response types */
declare namespace API {
	type ContentFilters = {
		tenant?: string;
		catgegory?: string;
		subcategory?: string;
	};
}

interface SearchResult<T> {
	id: string;
	score: number;
	data: T;
}

import { SearchService } from '../commonjs/SearchService';

export class CategorySearch {
	private searchService = new SearchService({
		idField: '_id',
		fields: ['tenant', 'category', 'subcategory', 'aliases', 'tags'],
		storeFields: ['tenant', 'category', 'subcategory']
	});

	index(docs: T[]): void {
		this.searchService.index(docs);
	}

	search(query: string, options): SearchResult<T>[] {
		return this.searchService.search(query, options);
	}
}

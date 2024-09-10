import { test, expect } from '@playwright/test';
import { SearchService } from '../../src/lib/commonjs/SearchService';

const data = [
	{
		title: "Old Man's War",
		author: {
			firstName: 'John',
			lastName: 'Scalzi'
		}
	},
	{
		title: 'The Lock Artist',
		author: {
			firstName: 'Steve',
			lastName: 'Hamilton'
		}
	}
];

test('test', async ({ request }) => {
	console.log('Running test');

	const service: SearchService = new SearchService('test', [
		'title',
		'author.firstName',
		'author.lastName'
	]);
	service.addDocuments(data);

	const searchRes = await service.search('john');

	console.log('Search Results: ', JSON.stringify(searchRes));

	expect(searchRes).toHaveProperty('title');
});

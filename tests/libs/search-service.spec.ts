import { expect, test } from '@playwright/test';
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

test('index and search basic docs', async () => {
	console.log('Running test');

	const fields = ['title', 'author.firstName', 'author.lastName'];
	const service = new SearchService('test', fields, {});

	service.addDocuments('test', data);
	const searchRes = await service.search('test', 'john');

	console.log('Search Results: ', JSON.stringify(searchRes));

	expect(searchRes).toHaveProperty('title');
});

test('dummy', async ({ request }) => {
	console.log('Dummy  test');
});

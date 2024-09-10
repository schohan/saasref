import { faker } from '@faker-js/faker';

function generateRecord(uid) {
	return {
		uid,
		title: faker.company.name(),
		url: faker.internet.url(),
		domain: faker.internet.domainName(),
		contentType: 'webpage',
		status: 'published',
		imageUrl: faker.image.urlLoremFlickr({ category: 'business' }),
		tagline: faker.lorem.sentence(),
		summarizedText: 'To be fetched',
		tags: [faker.word.noun(), faker.word.adjective()],
		categoryTree: 'online-presence.website-development',
		viewCount: faker.number.int(100),
		favCount: faker.number.int(10)
	};
}

function generateRecords(count) {
	const records = [];
	for (let i = 1; i <= count; i++) {
		const uid = `glitch${i}`;
		records.push(generateRecord(uid));
	}
	return records;
}

function main() {
	const totalRecords = process.argv[2];

	if (!totalRecords || isNaN(totalRecords) || totalRecords <= 0) {
		console.error('Please provide a valid positive number for the total records.');
		process.exit(1);
	}

	const records = generateRecords(parseInt(totalRecords, 10));
	console.log(JSON.stringify(records, null, 2));
}

main();

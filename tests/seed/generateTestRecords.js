import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

const cats = ['product-development', 'market-research', 'business-strategy'];
const subCats = {
	'product-development': ['minimum-viable-product', 'user-experience-design'],
	'market-research': ['target-audience-analysis', 'competitor-analysis'],
	'business-strategy': ['business-model', 'revenue-streams']
};

function randomCat() {
	const index = faker.helpers.rangeToNumber({ min: 0, max: cats.length - 1 });
	return cats[index];
}
function randomSubCat(cat) {
	const subCatArr = subCats[cat];
	const index = faker.helpers.rangeToNumber({ min: 0, max: subCatArr.length - 1 });
	return subCatArr[index];
}

function generateRecord() {
	const cat = randomCat();
	const subCat = randomSubCat(cat);

	return {
		title: faker.company.name(),
		url: faker.internet.domainName(),
		imageUrl: faker.image.urlLoremFlickr({ category: 'business' }),
		tagline: faker.lorem.sentence(),
		summarizedText: 'To be fetched',
		tags: [faker.word.noun(), faker.word.adjective()],
		categoryTree: cat + '/' + subCat,
		viewCount: faker.number.int(100),
		favCount: faker.number.int(10)
	};
}

function generateStagedRecord(count) {
	const records = [];
	for (let i = 1; i <= count; i++) {
		records.push({
			url: faker.internet.url()
		});
	}
	return records;
}

function generateRecords(count) {
	const records = [];
	for (let i = 1; i <= count; i++) {
		records.push(generateRecord());
	}
	return records;
}

function writeRecords(filePath, totalRecords, isStaged = false) {
	let records;
	if (isStaged) {
		records = generateStagedRecord(parseInt(totalRecords, 10));
	} else {
		records = generateRecords(parseInt(totalRecords, 10));
	}
	const jsonString = JSON.stringify(records, null, 2);
	// Write the JSON data to the file
	fs.writeFileSync(filePath, jsonString);

	// Assuming this code is in a file named 'example.js'
	console.log(path.dirname(new URL(import.meta.url).pathname));
	console.log(`Generated data has been written to: ${filePath}`);
}

function main() {
	const dir = path.dirname(new URL(import.meta.url).pathname);
	let filePath = dir + '/data/generatedData.json';
	let stagedFilePath = dir + '/data/generatedStagedData.json';
	console.log('filePath == ' + filePath);
	const totalRecords = process.argv[2];

	if (process.argv[3]) {
		filePath = process.argv[3];
	}
	if (!totalRecords || isNaN(totalRecords) || totalRecords <= 0) {
		console.error('Please provide a valid positive number for the total records.');
		process.exit(1);
	}
	writeRecords(filePath, totalRecords);
	writeRecords(stagedFilePath, totalRecords, true);
}

main();

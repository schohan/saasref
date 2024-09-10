// Imports the Google Cloud client library
import { Storage } from '@google-cloud/storage';

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */

export class GoogleStorage {
	// serviceAccountKeyJson
	static async uploadToBucket(bucketName, fileName, content) {
		//const credentials = JSON.parse(serviceAccountKeyJson);
		// const credentials = JSON.parse();
		// const storage = new Storage({ credentials });
		console.log('Bucket name ' + bucketName);
		const storage = new Storage();

		const bucket = storage.bucket(bucketName);
		const file = bucket.file(fileName);

		await file.save(content, { resumable: false });

		console.log(`${fileName} uploaded to ${bucketName}.`);
		return;
	}
}

// Usage:
// GoogleStorage.uploadToBucket('web-content-images', 'uptest.txt', 'Hello, world!');

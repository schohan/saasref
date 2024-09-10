import { WorkerWrapper } from '$lib/commonjs/helpers/WorkerWrapper';
import { StagedContent, ContentStatus } from '$lib/models/StagedContent.model';
import { json } from '@sveltejs/kit';
import { WebScreenShot } from '$lib/utils/WebScreenShot';
import { WebUtils } from '$lib/utils/WebUtils';
import { GenericDataService } from '$lib/commonjs/GenericDataService';
import { GoogleUrlSummarizer } from '$lib/utils/GoogleUrlSummarizer';
import { AppConfig } from '$lib/config/appConfig';
import { WebContent } from '$lib/models/WebContent.model';
import { GoogleStorage } from '$lib/utils/GoogleStorage';

const ACTION = { SCREENSHOT: 'screenshot', PROCESS: 'process', PUBLISH: 'publish' };

/**
 * Endpoint with optional parameters. These actions are to be applied to passed in URLs
 *
 * /api/admin/content/staged/process?[action=publish|process]&[force=false|true]
 * @param {}
 * @returns
 */

/**
 * Following actions are allowed:
 *
 * 1. PROCESS: Processes staged content by getting snapshot and summary of the website
 * 2. APPROVE: Indicates that content has been reviewed and is ready to be published.
 * 3. PUBLISH: Publishes/Moves staged content items to 'WebContent' ONLY when categoryPath is not null and current
 *    status is PROCESSED
 *
 * 	  Parameter 'imageOnly' is used to process images only
 **/

export const PUT = async ({ url, params }) => {
	try {
		const action = url.searchParams.get('action') || ACTION.SCREENSHOT;
		const domainToUpdate = params.domain;

		console.log('domainToUpdate ' + domainToUpdate);

		const dbResult = await GenericDataService.fetchOne(
			{ filter: { domain: domainToUpdate } },
			StagedContent
		);

		const stagedContent = dbResult?.data;

		if (action === ACTION.SCREENSHOT) {
			await takeSnapshot(stagedContent, AppConfig.baseImagePathLocal);
			return json({ message: ' URL to be processed. ' + stagedContent?.url }, { status: 200 });
		}
		if (action === ACTION.PROCESS) {
			await generateSummary(stagedContent);
			return json({ message: ' URL to be processed. ' + stagedContent?.url }, { status: 200 });
		}
		if (action === ACTION.PUBLISH) {
			// moves content to WebContent
			const res = await publish(stagedContent);
			uploadFilesToCloud(domainToUpdate?.imageName);
			return json({ message: res }, { status: 200 });
		}
	} catch (e) {
		console.error('Error == ', e);
		return json(e, { status: 400 });
	}
};

/**
 * Do the following:
 * 1. Create a snapshot of the website.
 * 2. Save it to Google Dir (can be done manually as batch for now)
 * 3. Call Bard to generate summary of the website
 * 4. Save generated data into content table
 * 5. Update the status of staged content to 'processed'
 * @returns
 */
// async function getSnapshotAndSummary(urlToUpdate, imageOnly) {
// 	// fetch URLs in ready state
// 	// let newStagedUrls = await StagedContent.find({ status: 'added' });
// 	// projection: '_id url imageDone status'
// 	const criteria = [ContentStatus.ADDED];
// 	let filter = { status: { $in: criteria } };

// 	const newStagedUrls = await GenericDataService.fetchData({ filter: filter }, StagedContent);

// 	let toProcess = [];
// 	if (newStagedUrls?.data.length > 0) {
// 		// Capture URLs to process for sync response to be sent back now
// 		toProcess = newStagedUrls.data.map((item) => item.url);

// 		console.log('Processing newly added URLs: ' + newStagedUrls.data.length);

// 		// iterate through every URL, and process them
// 		newStagedUrls.data.forEach(async (stagedContent) => {
// 			try {
// 				if (imageOnly) {
// 					// take snapshot of the page
// 					await takeSnapshot(stagedContent, AppConfig.baseImagePathLocal, imageOnly);
// 				} else {
// 					// generate summary of this page/url
// 					await generateSummary(stagedContent);
// 				}
// 			} catch (e) {
// 				console.error('Error == ', e);
// 				await GenericDataService.update(
// 					{ _id: stagedContent._id },
// 					{ status: ContentStatus.FAILED },
// 					StagedContent
// 				);
// 			}
// 		});
// 		console.log('Done summarizing');
// 	} else {
// 		console.log('No new content to to summarize');
// 	}
// 	return toProcess;
// }

async function generateSummary(stagedContent) {
	console.log('Generating summary for: ' + stagedContent?.url);

	try {
		if (!stagedContent) {
			throw new Error("Couldn't find StagedContent: " + stagedContent?.url);
		}

		const summaryJson = await new GoogleUrlSummarizer().summarize(stagedContent?.url);
		if (summaryJson) {
			// Save summary to
			// title, tagline, summary, features, and hashtags
			stagedContent.status = ContentStatus.PROCESSED;
			stagedContent.title = summaryJson.title;
			stagedContent.tagline = summaryJson.tagline;
			stagedContent.summary = summaryJson.summary;
			stagedContent.features = summaryJson.features;
			stagedContent.hashtags = summaryJson.hashtags;

			await GenericDataService.update({ _id: stagedContent._id }, stagedContent, StagedContent);
		}
	} catch (e) {
		console.error('Error == ', e);
		await GenericDataService.update(
			{ _id: stagedContent._id },
			{ status: ContentStatus.FAILED },
			StagedContent
		);
	}
}

async function takeSnapshot(stagedContent, baseDir) {
	console.log('Taking snapshot for: ' + stagedContent?.url + ' BaseDir ' + baseDir);

	try {
		//console.log('stagedContent ' + JSON.stringify(stagedContent));
		if (stagedContent) {
			const imageName = stagedContent.domain;
			const fileName = baseDir + imageName + '.jpeg';
			console.log('Saving screenshot and saving to:  ' + fileName);
			try {
				await WebScreenShot.takeScreenshot(stagedContent?.url, fileName);

				// update status of staged content
				stagedContent.imageName = imageName;
				await GenericDataService.update(
					{ _id: stagedContent._id },
					{ imageName: imageName },
					StagedContent
				);
			} catch (e) {
				console.error('Error == ', e);
				await GenericDataService.update(
					{ _id: stagedContent._id },
					{ status: ContentStatus.FAILED },
					StagedContent
				);
			}
		} else {
			console.log('Screenshot already exists for URL: ' + stagedContent?.url);
		}
	} catch (e) {
		console.error('Error == ', e);
		await GenericDataService.update(
			{ _id: stagedContent._id },
			{ status: ContentStatus.FAILED },
			StagedContent
		);
	}
}

/**
 * Move content to WebContent collection and update status of staged content
 * @returns
 */
async function publish() {
	const toPublish = await GenericDataService.fetchData(
		{ filter: { status: ContentStatus.PROCESSED, categoryPath: { $ne: null } } },
		StagedContent
	);
	//let count = -1;
	//console.log('Publishing processed URLs: ' + JSON.stringify(toPublish.data));
	console.log('Publishing processed URLs: ' + toPublish.data.length);

	if (toPublish.data.length > 0) {
		try {
			const res = await GenericDataService.insert(toPublish.data, WebContent);
			return res;
		} catch (e) {
			console.error('Error == ', e);
		}
	}
	return null;
}

/**
 * Upload saved files to the cloud storage.
 */
async function uploadFilesToCloud(domainToUpdate) {
	console.log(
		'Uploading files to cloud storage...' +
			AppConfig.cloudBucketName +
			'/' +
			AppConfig.cloudScreenshotsPath
	);
	// For all files at given location, upload them to the cloud storage
	// GoogleStorage.uploadToBucket(AppConfig.cloudBucketName, AppConfig.cloudScreenshotsPath + '/' + fileName, )
}

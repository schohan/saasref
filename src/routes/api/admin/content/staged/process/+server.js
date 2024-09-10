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
import _ from 'lodash';

//const ACTION = { PROCESS: 'process', APPROVE: 'approve', PUBLISH: 'publish' };
const ACTION = { ALL: 'all', SCREENSHOT: 'screenshot', PROCESS: 'process', PUBLISH: 'publish' };

/**
 * Endpoint with optional parameters
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

export const PUT = async ({ url, request }) => {
	try {
		const action = url.searchParams.get('action') || ACTION.PROCESS;

		let filter = {};
		if (url.searchParams.get('url')) {
			filter.url = url.searchParams.get('url');
		}
		if (url.searchParams.get('categoryPath')) {
			filter.categoryPath = url.searchParams.get('categoryPath');
		} else {
			filter = { status: ContentStatus.ADDED };
		}

		const newStagedUrls = await GenericDataService.fetchData({ filter: filter }, StagedContent);
		console.log("newStagedUrls.data = '" + newStagedUrls.data.length);
		const contentList = newStagedUrls.data;

		if (action === ACTION.ALL) {
			processAll(contentList);
			return json({ message: 'Processing ' + newStagedUrls.data }, { status: 200 });
		} else if (action === ACTION.SCREENSHOT) {
			await takeSnapShots(contentList);
			// console.log('stagedUrl ' + stagedUrl.data);
			// const toProcess = await takeSnapshot(stagedUrl.data, AppConfig.baseImagePathLocal);
			return json(
				{ message: 'Taking snapshots. For failed snapshots, FAILED status will be posted.' },
				{ status: 200 }
			);
		}
		if (action === ACTION.PROCESS) {
			const toProcess = await getSnapshotAndSummary(false);
			return json(
				{ message: toProcess.length + ' URLs to be processed. ' + toProcess },
				{ status: 200 }
			);
		}
		if (action === ACTION.PUBLISH) {
			// moves content to WebContent
			const res = await publish();
			uploadFilesToCloud();
			// TODO upload data to prod db here
			return json({ message: res }, { status: 200 });
		}
	} catch (e) {
		console.error('Error == ', e);
		return json(e, { status: 400 });
	}
};

function takeSnapShots(contentList) {
	contentList.forEach(async (stagedContent) => {
		await takeSnapShot(stagedContent);
	});
}

async function takeSnapShot(stagedContent) {
	try {
		await takeSnapshot(stagedContent, AppConfig.baseImagePathLocal);
		console.log('done processing ' + stagedContent.url);
	} catch (e) {
		console.error('Error == ', e);
		await GenericDataService.update(
			{ url: stagedContent.url },
			{ status: ContentStatus.FAILED },
			StagedContent
		);
	}
}

/**
 * Do the following:
 * 1. Create a snapshot of the website.
 * 2. Save it to Google Dir (can be done manually as batch for now)
 * 3. Call Bard to generate summary of the website
 * 4. Save generated data into content table
 * 5. Update the status of staged content to 'processed'
 * @returns
 */
async function getSnapshotAndSummary(imageOnly) {
	// fetch URLs in ready state
	// let newStagedUrls = await StagedContent.find({ status: 'added' });
	// projection: '_id url imageDone status'
	const criteria = [ContentStatus.ADDED];
	let filter = { status: { $in: criteria } };

	const newStagedUrls = await GenericDataService.fetchData({ filter: filter }, StagedContent);

	let toProcess = [];
	if (newStagedUrls?.data.length > 0) {
		// Capture URLs to process for sync response to be sent back now
		toProcess = newStagedUrls.data.map((item) => item.url);

		console.log('Processing newly added URLs: ' + newStagedUrls.data.length);

		// iterate through every URL, and process them
		newStagedUrls.data.forEach(async (stagedContent) => {
			try {
				if (imageOnly) {
					// take snapshot of the page
					await takeSnapshot(stagedContent, AppConfig.baseImagePathLocal);
				} else {
					// generate summary of this page/url
					//_.delay(generateSummary, 500, stagedContent);
					await generateSummary(stagedContent);
				}
			} catch (e) {
				console.error('Error == ', e);
				await GenericDataService.update(
					{ _id: stagedContent._id },
					{ status: ContentStatus.FAILED },
					StagedContent
				);
			}
		});
		console.log('Done summarizing');
	} else {
		console.log('No new content to to summarize');
	}
	return toProcess;
}

async function generateSummary(stagedContent) {
	if (stagedContent.status === 'processed') {
		console.log('Summary present. Not generating summary for: ' + stagedContent.url);
		return;
	}
	console.log('Generating summary for: ' + stagedContent.url);
	const summaryJson = await new GoogleUrlSummarizer().summarize(stagedContent.url);

	if (summaryJson) {
		// Save summary to
		// title, tagline, summary, features, and hashtags
		stagedContent.status = ContentStatus.PROCESSED;
		console.log('Title= ' + summaryJson.title);

		stagedContent.title = summaryJson.title;
		stagedContent.tagline = summaryJson.tagline;
		stagedContent.summary = summaryJson.summary;
		stagedContent.features = summaryJson.features;
		stagedContent.hashtags = summaryJson.hashtags;

		await GenericDataService.update({ _id: stagedContent._id }, stagedContent, StagedContent);
	}
}

async function takeSnapshot(stagedContent, baseDir) {
	const url = stagedContent.url;
	console.log('in takeSnapshot ' + stagedContent.url);
	if (!stagedContent.imageName) {
		const imageName = stagedContent.domain;
		const fileName = baseDir + imageName + '.jpeg';
		console.log('Saving screenshot and saving to:  ' + AppConfig.baseImagePath);
		try {
			await WebScreenShot.takeScreenshot(url, fileName);

			// update status of staged content
			stagedContent.imageName = imageName;
			await GenericDataService.update(
				{ url: stagedContent.url },
				{ imageName: imageName },
				StagedContent
			);
		} catch (e) {
			console.error('Error == ', e);
			await GenericDataService.update(
				{ url: stagedContent.url },
				{ status: ContentStatus.FAILED },
				StagedContent
			);
		}
	} else {
		console.log('Screenshot already exists for URL: ' + url);
	}
}

/**
 * Move content to WebContent collection and update status of staged content
 * @returns
 */
async function publish() {
	const toPublish = await GenericDataService.fetchData(
		{ filter: { status: ContentStatus.APPROVED, categoryPath: { $ne: null } } },
		StagedContent
	);
	//let count = -1;
	console.log('Publishing processed URLs: ' + JSON.stringify(toPublish.data.length));

	if (toPublish.data.length > 0) {
		try {
			toPublish.data.forEach(async (item) => {
				// upsert WebContent
				const res = await WebContent.updateOne({ _id: item._id }, item, { upsert: true });

				// update status of staged content
				await GenericDataService.update(
					{ status: ContentStatus.APPROVED },
					{ status: ContentStatus.PUBLISHED },
					StagedContent
				);
			});
			return 'Published ' + toPublish.data.length + ' URLs';
		} catch (e) {
			console.error('Error == ', e);
		}
	}
	return null;
}

/**
 * Upload saved files to the cloud storage.
 */
async function uploadFilesToCloud() {
	console.log(
		'Uploading files to cloud storage...' +
			AppConfig.cloudBucketName +
			'/' +
			AppConfig.cloudScreenshotsPath
	);
	// For all files at given location, upload them to the cloud storage
	// GoogleStorage.uploadToBucket(AppConfig.cloudBucketName, AppConfig.cloudScreenshotsPath + '/' + fileName, )
}

async function processAll(contentList) {
	// take screenshots
	takeSnapShots(contentList);

	// process urls
	const toProcess = await getSnapshotAndSummary(false);
	console.log('Proessing ....');

	// // approve and publish
	// const res = await publish();
	// uploadFilesToCloud();
}

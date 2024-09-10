/* Main Conf Service */
import { AppConfig } from '$lib/config/appConfig';
import { queryStringToMongo } from '$lib/utils/query-params';
import Preview from '$lib/utils/preview';
import { isBlank } from '$lib/utils/string-utils';
import { json } from '@sveltejs/kit';

const BATCH_SIZE = AppConfig.previewBatchSize || 100;

/* Generate preview */
export const GET = async ({ locals, url }) => {
	if (AppConfig.adminKey !== locals.adminKey) {
		return {
			status: 401,
			body: {
				error: {
					message: 'Unauthorized access'
				}
			}
		};
	}

	let { filter } = queryStringToMongo(url.search);

	// always add this
	filter.isDeleted = false;
	let regen = filter.regen ? filter.regen : false; // should we regenerate previews
	delete filter.regen;

	try {
		let projection = '_id title url preview image';
		let skip = 0;

		let content; //= await fetchConfs(filter, skip, BATCH_SIZE, projection);

		do {
			content = await fetchWebContent(filter, skip, BATCH_SIZE, projection);
			console.log('Processing ' + content.length + ',  skip ' + skip + ', limit ' + BATCH_SIZE);

			// process fetched conferences
			content.forEach(async (content) => {
				console.log('Processing content: ' + content.url);
				try {
					if (isBlank(conf.preview) || regen) {
						let data;
						try {
							data = await Preview.create(conf.website);
						} catch (prevErr) {
							data = { error: prevErr };
							conf.isErrInPreview = true;
						}
						console.log('data now --> ' + JSON.stringify(data));

						conf.preview = JSON.stringify(data);
						if (data.images) {
							if (data.images?.length > 1) {
								conf.image = data.images[1];
							} else {
								conf.image = data.images[0];
							}
						} else {
							conf.image = `https://via.placeholder.com/224x156.png/FF0000/FFFFFF?text=${conf.name}`;
						}
						await conf.save();
						await sleep(2000);
					}
				} catch (err) {
					console.log('Error ' + err);
				}
			});
			skip += confs.length;
		} while (confs.length >= BATCH_SIZE);
		return json({ data: { processed: skip } }, { status: 200 });
		// return response
		// return {
		// 	status: 200,
		// 	body: {
		// 		data: { processed: skip }
		// 	}
		// };
	} catch (err) {
		// return {
		// 	status: 500,
		// 	body: {
		// 		error: {
		// 			message: 'Could not process previews'
		// 		}
		// 	}
		// };
		console.error('Error ' + err);
		return json({ error: { message: 'Could not process previews' } }, { status: 500 });
	}
};

function fetchWebContent(filter, skip, limit, projection) {
	return WebContent.find(filter).skip(skip).limit(limit).select(projection).exec();
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

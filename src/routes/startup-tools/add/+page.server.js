import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import { WebContentZod, WebContent } from '$lib/models/WebContent.model';
import { GenericDataService } from '$lib/commonjs/GenericDataService';
import { queryStringToMongo } from '$lib/utils/query-params';
import { Payload, ErrorPayload } from '$lib/commonjs/helpers/Payload';
import { getLinkPreview, getPreviewFromContent } from 'link-preview-js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	// Send empty form with default values
	const form = await superValidate(WebContentZod, { errors: false });
	return { form };
}

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, WebContentZod);

		if (!form.valid) {
			return message(form, 'Invalid form', { status: 403 });
		}

		if (form.data.url.includes('.xxx')) {
			return message(form, 'No spam please', {
				status: 403
			});
		}
		try {
			// save data
			const savedRes = await GenericDataService.insert([form.data], WebContent);

			if (!savedRes) {
				throw Error('Could not save data');
			}
		} catch (e) {
			console.log('Error saving ' + e);
			let msg = 'Invalid data';
			if (e.message.includes('E11000')) {
				msg = 'Duplicate Url ' + form.data.url;
			}
			return message(form, msg, { status: 403 });
		}
		return message(form, 'Url ' + form.data.url + ' saved!');
		//const reqJson: [string] = await request.json();

		//return await GenericController.insertMany([form.data], WebContent);
		// Just returns { form } with the message (and status code 200).
		//return message(form, 'Saved!');
	}
};

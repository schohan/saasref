import { GenericDataService } from '$lib/commonjs/GenericDataService';
import { StagedContent, StagedContentZod } from '$lib/models/StagedContent.model';
import { fail } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	add: async ({ request }) => {
		console.log('Saving request');
		try {
			const data = await request.formData();
			const urlsStr = data.get('urls');
			const urls = JSON.parse(urlsStr);
			console.log('Saving request: data ' + JSON.stringify(urls));
			console.log('urls ' + typeof urls);

			if (!urls || urls.length === 0) {
				return fail(400, { urls, missing: true });
			}
			//const validateUrl = StagedContentZod.parse(urls);

			console.log('validateUrl == ' + JSON.stringify(urls));

			const saved = await GenericDataService.insert(urls, StagedContent);
			console.log('Saved', JSON.stringify(saved));
			return json(JSON.stringify(saved), { status: 201 });
		} catch (e) {
			console.log('could not save ', e);
			return fail(400, { message: e.message, invalid: true });
		}
	}
};

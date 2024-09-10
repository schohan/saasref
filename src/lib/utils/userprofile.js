import { browser } from '$app/env';
import { isBlank } from '$utils/string-utils';
import _ from 'lodash';

/* Return URL for retrieving profile pic */
export async function getProfilePicUrl(userId) {
	if (!browser) return;

	const url = '/api/users/profile-pic?_id=' + userId;
	let imageData = '';
	try {
		const resp = await fetch(url);
		if (resp.ok) {
			imageData = await resp.text();

			if (isBlank(imageData)) throw new Error('No profile pic for user ' + userId);

			return imageData;
		} else {
			console.debug('No profile pic found');
		}
	} catch (error) {
		console.debug(error);
	}

	return null;
}

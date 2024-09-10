import { sendActivationMail } from './auth-utils';
import { isNotBlank } from '$lib/utils/string-utils';

/**
 * Generate and send account activation email.
 * Params are passed as search parameters. Caller must be authenticated. It doesn't have to be same user.
 *
 * @param email User email
 */
export async function GET({ url, locals }) {
	const user = locals.user;
	if (!user) {
		return {
			status: 401,
			body: {
				error: {
					message: 'Please register/login to perform this action'
				},
				redirect: '/auth/login'
			}
		};
	}

	let name = url.searchParams.get('name');
	const email = url.searchParams.get('email');
	console.debug(`User activation invoked by ${user.name} for user ${user} with email ${email}`);

	if (!isNotBlank(name)) {
		name = email;
	}
	let resJson = sendActivationMail(name, email);

	if (resJson.response.status == 200) {
		return {
			status: 200,
			body: {
				message: `Your account requires activation. Please respond to activation email sent at ${email}.`
			}
		};
	} else {
		console.error('Response Status = ' + resJson.response.status);
		throw Error('Could not send email ' + JSON.stringify(resJson.response));
	}
}

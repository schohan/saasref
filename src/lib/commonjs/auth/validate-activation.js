import { Encrypter } from '../../utils/security.js';
import { User } from '$schemas/user/user.model.js';
import { isNotBlank } from '$utils/string-utils';
// import { config } from '$config/config.js';

/* Activation account, if correct token is passed.

 * @param token Token containing encrypted account info
 */
export async function get({ url }) {
	const token = url.searchParams.get('token');

	console.log('Token ' + token);

	try {
		if (!isNotBlank(token)) {
			throw Error('Requires a valid token');
		}

		let decStr = await Encrypter.decrypt(token);
		let decStrItems = decStr.split(';');

		// console.log('decStr ' + decStr);

		// validate link
		let expDatetime = Date.parse(decStrItems[1]);
		let linkExpired = expDatetime < new Date().getTime();

		if (linkExpired) throw Error('Link has expired. Please generate a new reset password link.');

		// validate email
		let email = decStrItems[0];
		if (!email) {
			throw Error('Invalid Token');
		}

		// Activate user in the database
		const user = await User.findOneAndUpdate(
			{ email },
			{ isActive: true, activationDate: new Date() }
		);
		if (user) {
			return {
				status: 302,
				headers: {
					location: '/auth/validate'
				}
			};
		} else {
			throw Error(`Email is not registered. Please create an account first.`);
		}
	} catch (err) {
		console.error('Could not validate email. ' + err);
		return {
			status: 302,
			headers: {
				location: '/auth/validate?error=' + err
				// 'Set-Cookie': user.jwtToken(),
			}
		};
	}
}

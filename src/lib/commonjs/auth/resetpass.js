import { User } from '../../../schemas/user/user.model.js';
import { Encrypter } from '../../utils/security.js';

export async function post({ request }) {
	const { token, password } = await request.json();

	let decStr = await Encrypter.decrypt(token);
	let decStrItems = decStr.split(';');

	try {
		// validate link
		let expDatetime = Date.parse(decStrItems[1]);
		let linkExpired = expDatetime < new Date().getTime();

		if (linkExpired) throw Error('Link has expired. Please generated a new reset password.');

		// validate email
		let email = decStrItems[0];
		if (!email) {
			throw Error('Invalid Token');
		}

		if (!password) {
			return Error("New password can't be blank");
		}

		// Check to see if email and password both match to one in database
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			existingUser.setPassword(password);
			existingUser.isActive = true;

			let user = await existingUser.save();
			return {
				status: 200,
				headers: {
					status: 201,
					'Set-Cookie': user.jwtToken()
				},
				body: user.toAuthJson()
			};
		} else {
			throw Error(`Invalid User`);
		}
	} catch (err) {
		console.log('Could not reset password. ' + err);
		return {
			status: err.code ? err.code : 500,
			body: {
				error: {
					message: err.message
				}
			}
		};
	}
}

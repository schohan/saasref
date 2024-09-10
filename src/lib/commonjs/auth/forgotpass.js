import { User } from '../../../schemas/user/user.model.js';
import { Encrypter } from '../../utils/security.js';
import { Emailer } from '$utils/Emailer.js';
import { config } from '$config/config.js';

export async function post({ request }) {
	const { email } = await request.json();

	try {
		// Check to see if email and password both match to one in database
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			const name = existingUser.name;
			// Send email here
			// Create a new date by adding 1 day to current time
			let expDate = new Date();
			expDate.setHours(expDate.getHours() + config.authUrls.expAfterHours);
			let encStr = encodeURIComponent(await Encrypter.encrypt(email + ';' + expDate.toISOString()));
			let resetUrl = `${config.authUrls.resetUrl}?token=${encStr}`;
			let fromName = 'OneSkool Admin',
				fromAddr = 'resetpassword@oneskool.com',
				toAddr = email,
				subject = 'Reset Password Link. Expires in 24 hours.',
				htmlBody = `Please <a href='${resetUrl}'> click here  </a> to reset your password. 
                            <p> You can also copy/paste this URL to reset password: </p>
                            <p> ${resetUrl} </p>
                            <p> Thank You</p><p> Team OneSkool </p>`;

			let respJson = await Emailer.sendMail(fromName, fromAddr, name, toAddr, subject, htmlBody);
			let resp = respJson.response;

			if (resp.status === 200) {
				return {
					status: 200,
					body: resp
				};
			} else {
				throw Error('Could not send email ' + resp.status);
			}
		} else {
			throw Error(
				`If we found an account associated to that email, we've sent password reset instructions.`
			);
		}
	} catch (err) {
		console.error('Could not reset password. ' + err.message);
		return {
			status: 400,
			body: {
				error: {
					message: err.message
				}
			}
		};
	}
}

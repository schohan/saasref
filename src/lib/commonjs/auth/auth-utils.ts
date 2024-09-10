import { User } from '$lib/models/User.model';
import { Encrypter } from '$lib/utils/security.js';
import { Emailer } from '$lib/utils/Emailer.js';
import { AppError } from '$lib/utils/AppError';

export class AuthUtils {
	/* Create new user and return post auth user Json */
	static async createUser(userData, hashPass = true) {
		const user = new User(userData);
		const plainPass = user.password;

		if (hashPass) {
			user.setPassword(userData.password);
		}
		user.lastLoginAt = new Date();
		const savedUser = await user.save();
		console.log('savedUser = ' + JSON.stringify(savedUser));

		return await AuthUtils.createPostLoginResp(savedUser);
	}

	// Get single user and login
	static async login(email, password) {
		// Check to see if email and password both match to one in database
		const existingUser = await this.findUserByEmail(email);
		if (existingUser) {
			console.log(
				'existingUser.isActive = ' +
					!existingUser?.isActive +
					', existingUser.isDeleted = ' +
					existingUser.isDeleted
			);
			// Handle exception cases
			if (!existingUser?.isActive)
				throw new AppError(
					401,
					'User account has not been activated yet. Respond to validation email or talk to your administrator.'
				);
			if (existingUser.isDeleted) throw new AppError(401, 'This account has been deleted.');

			// User is active and not deleted
			if (await existingUser.comparePassword(password)) {
				return await AuthUtils.createPostLoginResp(existingUser);
			} else {
				throw new AppError(401, 'Password does not match email');
			}
		} else {
			throw new AppError(401, 'Account does not exists or is inactive');
		}
	}

	/* Given a user, return cookie and public json. Always assume non-null param. */
	static async createPostLoginResp(user) {
		user.lastLoginAt = new Date();
		await user.save();
		return {
			pubJson: await user.toAuthJson(),
			cookie: await user.jwtToken()
		};
	}

	static async getLogoutCookies() {
		return ['token=deleted; Path=/; HttpOnly; Max-Age=0'];
	}

	static async findUserByEmail(email) {
		return this.findUser(email);
	}

	static async findUserByOAuthId(oauthId) {
		return findUser(null, oauthId);
	}

	/* Find a user using a criteria (email or authId) */
	static async findUser(email, oauthId) {
		const condition = {};
		if (email) {
			condition.email = email;
		}
		if (oauthId) {
			condition.oauthUserId = oauthId;
		}
		/* 	condition.isDeleted = false;
	condition.isActive = true;
 */ return await User.findOne(condition);
	}

	/*
	 * Send a single activation email
	 *
	 * @param toName Name of recepients
	 * @param toEmail Email of recepients
	 */
	static async sendActivationMail(toName, toEmail) {
		const expDate = new Date();
		expDate.setHours(expDate.getHours() + config.authUrls.expAfterHours);

		const encStr = encodeURIComponent(
			await Encrypter.encrypt(toEmail + ';' + expDate.toISOString())
		);
		const activateUrl = `${config.authUrls.activateUrl}?token=${encStr}`;
		const fromName = 'Admin',
			fromAddr = 'resetpassword@oneskool.com',
			subject = `Activate your account. Link expires in ${config.authUrls.expAfterHours} hours.`,
			htmlBody = `Hi ${toName}, 
				<p>
                Thanks for signing up at OneSkool.com. Before you can login, please  
                <a href=${activateUrl}'> click here </a> to verify your email address. 
                <p/>
                <p> If link doesn't work, you can copy/paste this URL in browser's address bar: </p>
                <p> ${activateUrl} </p>
                <p> Thank You
                </p><p> 
                Team OneSkool 
                </p>`;

		return await Emailer.sendMail(fromName, fromAddr, toName, toEmail, subject, htmlBody);
	}
}

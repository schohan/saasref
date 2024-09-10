import { User } from '$lib/models/User.model.js';
import { Encrypter } from '$lib/utils/security.js';
import { Emailer } from '$lib/utils/Emailer.js';
import { AppConfig } from '$lib/config/appConfig.js';

/* Create new user and return post auth user Json */
export async function createUser(userData, hashPass = true) {
	const user = new User(userData);
	if (hashPass) {
		user.setPassword(userData.password);
	}
	user.lastLoginAt = new Date();
	await user.save();
	return user;
}

/* Given a user, return cookie and public json. Always assume non-null param. */
export async function createPostLoginResp(user) {
	user.lastLoginAt = new Date();
	await user.save();

	return {
		pubJson: await user.toAuthJson(),
		cookie: await user.jwtToken()
	};
}

export async function findUserByEmail(email) {
	return findUser(email);
}

export async function findUserByOAuthId(oauthId) {
	return findUser(null, oauthId);
}

export async function getLogoutCookies() {
	return ['token=deleted; Path=/; HttpOnly; Max-Age=0'];
}

/* Find a user using a criteria (email or authId) */
async function findUser(email, oauthId) {
	let condition = {};
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
export async function sendActivationMail(toName, toEmail) {
	let expDate = new Date();
	expDate.setHours(expDate.getHours() + AppConfig.authUrls.expAfterHours);

	let encStr = encodeURIComponent(await Encrypter.encrypt(toEmail + ';' + expDate.toISOString()));
	let activateUrl = `${AppConfig.authUrls.activateUrl}?token=${encStr}`;
	let fromName = 'OneSkool Admin',
		fromAddr = 'resetpassword@oneskool.com',
		subject = `Activate your account. Link expires in ${AppConfig.authUrls.expAfterHours} hours.`,
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

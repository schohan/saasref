import { User } from '$lib/models/User.model.js';
import { AuthUtils } from '$lib/commonjs/auth/auth-utils';
import { AppConfig } from '$lib/config/appConfig';
import * as CompanyEmailValidator from 'company-email-validator';
import { Payload, ErrorPayload } from '$lib/commonjs/helpers/Payload';
import { json } from '@sveltejs/kit';

/**
 * Create user
 * @param json {Object} - User object
 * @returns
 */
export async function POST({ request, locals }) {
	try {
		let user = await request.json();
		user.isActive = true;
		console.log('Login- User:' + user.email + ', IP:' + locals.ip);

		const { pubJson, cookie } = await AuthUtils.createUser(user);

		console.log('pubJson ' + JSON.stringify(pubJson));
		const payload = new Payload(pubJson);

		console.log('payload:' + JSON.stringify(payload));
		return json(payload, { status: 201, headers: { 'Set-Cookie': cookie } });
	} catch (err) {
		console.log('Could not register user ', err);
		const errorPayload = new ErrorPayload(400, err.message);

		return json(errorPayload, { status: 400 });
	}

	// try {
	// 	let { name, email, password, role } = await request.json();

	// 	// Check that user input is not blank
	// 	if (!email || !password) throw Error('Email or Password cannot be blank');

	// 	// Check (if user is professional role) if email is not a free email provider
	// 	// if (role === UserRoles.PROFESSIONAL && !CompanyEmailValidator.isCompanyEmail(email))
	// 	// 	throw Error('Email cannot be a free service email provider');

	// 	// Check that password is a string & right size
	// 	if (typeof password !== 'string') throw Error('Invalid password');
	// 	if (password && password.length < 8) {
	// 		throw Error('Password must be at least 8 char long');
	// 	}
	// 	// Check if email is already in use, and throw error if it is
	// 	let existingUser = await User.findOne({ email }).lean();
	// 	if (existingUser) {
	// 		throw new Error('Email is already in use.');
	// 	}

	// 	let newUser = await AuthUtils.createUser({ name, email, password, role });

	// 	// Send activation email
	// 	if (config.env === 'prod' || config.email.sendActivationMail === true) {
	// 		AuthUtils.sendActivationMail(name, email);
	// 	} else {
	// 		newUser.isActive = true;
	// 	}
	// 	await newUser.save();

	// 	console.log('User saved');

	// 	// Return cookie
	// 	let pubJson = await newUser.toAuthJson();

	// 	console.log('User pubJson ' + JSON.stringify(pubJson));

	// 	return {
	// 		headers: {
	// 			status: 201
	// 		},
	// 		body: JSON.stringify(pubJson)
	// 	};
	// } catch (err) {
	// 	console.error(err);
	// 	return {
	// 		status: 400,
	// 		body: {
	// 			error: {
	// 				message: err
	// 			}
	// 		}
	// 	};
	// }
}

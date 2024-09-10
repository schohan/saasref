import { User } from '../../../schemas/user/user.model.js';
import { createUser, sendActivationMail } from './auth-utils.js';
import { config } from '$config/config';
import * as CompanyEmailValidator from 'company-email-validator';
import { UserRoles } from '../../../common/user-roles.js';
import { StudentProfile } from '$schemas/user/student-profile.model.js';

// Create a new User
export async function post({ request }) {
	try {
		let { name, email, password, role } = await request.json();

		// Check that user input is not blank
		if (!email || !password) throw Error('Email or Password cannot be blank');

		// Check (if user is professional role) if email is not a free email provider
		if (role === UserRoles.PROFESSIONAL && !CompanyEmailValidator.isCompanyEmail(email))
			throw Error('Email cannot be a free service email provider');

		// Check that password is a string & right size
		if (typeof password !== 'string') throw Error('Invalid password');
		if (password && password.length < 8) {
			throw Error('Password must be at least 8 char long');
		}
		// Check if email is already in use, and throw error if it is
		let existingUser = await User.findOne({ email }).lean();
		if (existingUser) {
			throw new Error('Email is already in use.');
		}

		let newUser = await createUser({ name, email, password, role });

		// Send activation email
		if (config.env === 'prod' || config.email.sendActivationMail === true) {
			await newUser.save();
			sendActivationMail(name, email);
		} else {
			newUser.isActive = true;
			await newUser.save();
		}
		// Create User profile
		if (newUser.role === UserRoles.STUDENT) {
			const studentProfile = await new StudentProfile({
				userId: newUser._id,
				userSlug: newUser.slug,
				basicInfo: {
					name: newUser.name
				}
			});
			await studentProfile.save();
		} else if (newUser.role === UserRoles.PROFESSIONAL) {
			console.log('Creating pro profile');
			// TODO create pro profile here
		}

		// Return cookie
		let pubJson = await newUser.toAuthJson();
		return {
			headers: {
				status: 201
			},
			body: JSON.stringify(pubJson)
		};
	} catch (err) {
		console.error(err);
		return {
			status: 400,
			body: {
				error: {
					message: err
				}
			}
		};
	}
}

import Mongoose from 'mongoose';
const { Schema, model } = Mongoose;

import { Hasher, SessionTokenizer } from '$lib/utils/security.js';
import validator from 'validator';

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		validate: [validator.isEmail, 'invalid email']
	},
	password: {
		type: String,
		required: true,
		minlength: 8
	},
	oauthToken: { type: String, required: false },
	oauthTokenExpiresAt: { type: Date, required: false },
	oauthUserId: { type: String, required: false },
	oauthDomain: { type: String, required: false },
	isActive: {
		type: Boolean,
		default: false
	},
	activationDate: {
		type: Date
	},
	isDeleted: {
		type: Boolean,
		default: false
	},
	lastLoginAt: {
		type: Date,
		default: new Date()
	},
	username: {
		type: String,
		required: false,
		trim: true
	},

	// TODO  Items below are TBD as they have moved to student-profile.model.js or pro-profile.model.js
	hideProfile: {
		type: Boolean,
		default: false
	},
	linkedInUrl: {
		type: String,
		required: false
	},
	address: {
		city: String,
		country: String
	},

	// For user to override/set profile pic
	profilePicUrl: String,

	createdAt: {
		type: Date,
		default: new Date()
	},
	updatedAt: {
		type: Date,
		default: new Date()
	}
});

/* Set password */
UserSchema.methods.setPassword = async function (password) {
	this.password = await Hasher.hash(password);
};

UserSchema.methods.comparePassword = async function (toCompare) {
	return await Hasher.compare(toCompare, this.password);
};

UserSchema.methods.jwtToken = async function () {
	return await SessionTokenizer.createCookie(this.toAuthJson());
};

/* TODO: Send this object back to client as User object */
UserSchema.methods.toAuthJson = function () {
	return {
		userId: this._id,
		name: this.name,
		email: this.email,
		linkedInUrl: this.linkedInUrl,
		createdAt: this.createdAt,
		updatedAt: this.updatedAt,
		oauthDomain: this.oauthDomain,
		tokenExpDate: this.oauthTokenExpiresAt
	};
};

UserSchema.index({ hideProfile: 1 });
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ username: 1 }, { unique: true, sparse: true });
UserSchema.index({ linkedInUrl: 1 }, { unique: true, sparse: true });
UserSchema.index({ isActive: 1, isDeleted: 1 });
UserSchema.index({
	name: 'text'
});
UserSchema.index({ email: 1 });
UserSchema.index({ isActive: 1, isDeleted: 1 });

export const User = model('user', UserSchema);

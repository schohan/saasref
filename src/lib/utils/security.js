import jwt from 'jsonwebtoken';
import { AppConfig } from '$lib/config/appConfig.js';
import CryptoJS from 'crypto-js';

/* Generate JWT (or another) token used to encrypt a payload  */
export class SessionTokenizer {
	/* Convert payload to JWT token */
	/**
	 * @param {any} payload
	 */
	static async tokenize(payload) {
		const exp = AppConfig.secrets.jwtExp ? AppConfig.secrets.jwtExp : '30d';
		return jwt.sign(payload, AppConfig.secrets.jwt, { expiresIn: exp });
	}

	/* Send another token with new exp date. Transfer the payload.  */
	/**
	 * @param {any} token
	 */
	static async refreshToken(token) {
		return token;
	}

	/* Extract payload from given JWT token */
	/**
	 * @param {string} token
	 */
	static async extractPayload(token) {
		try {
			const decToken = await Encrypter.decrypt(token);
			return jwt.verify(decToken, AppConfig.secrets.jwt);
		} catch (err) {
			throw new Error(`Name=${err.name}. Message=${err.message}`);
		}
	}

	/* Construct a jwt token with a payload  */
	/**
	 * @param {any} payload
	 */
	static async createCookie(payload) {
		const jwtToken = await SessionTokenizer.tokenize(payload);
		const encToken = await Encrypter.encrypt(jwtToken);
		return `token=${encToken}; SameSite=Strict; Path=/; HttpOnly; Max-Age=${AppConfig.secrets.cookieMaxAge};`;
	}
}

/* Hash and complare text  */
export class Hasher {
	/* Encrypt & return Hash */
	/**
	 * @param {any} plainText
	 */
	static async hash(plainText) {
		return CryptoJS.SHA256(plainText);
	}

	/* Match encrypted string with plain text*/
	/**
	 * @param {any} plainText
	 * @param {any} encryptedString
	 */
	static async compare(plainText, encryptedString) {
		return CryptoJS.SHA256(plainText) == encryptedString;
	}
}

/* Encrypt/Decrypt text. Use for cookies etc. */
export class Encrypter {
	/**
	 * @param {any} plainText
	 */
	static async encrypt(plainText) {
		return CryptoJS.AES.encrypt(plainText, AppConfig.secrets.encSecret);
	}

	/**
	 * @param {any} encText
	 */
	static async decrypt(encText) {
		const bytes = CryptoJS.AES.decrypt(encText, AppConfig.secrets.encSecret);
		return bytes.toString(CryptoJS.enc.Utf8);
	}

	/**
	 * @param {any} plainObj
	 */
	static async encryptObj(plainObj) {
		return CryptoJS.AES.encrypt(JSON.stringify(plainObj), AppConfig.secrets.encSecret).toString();
	}

	/**
	 * @param {any} encObj
	 */
	static async decryptObj(encObj) {
		var bytes = CryptoJS.AES.decrypt(encObj, AppConfig.secrets.encSecret);
		return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	}
}

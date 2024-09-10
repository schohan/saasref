import validator from 'validator';
import { simplifyStr } from './string-utils';

export class Validators {
	static isLenInRange(range) {
		return {
			validator: (v) => {
				return validator.isLength(v, range);
			},
			message: (props) =>
				`'${props.value}' lenght is not within the range ${range.min} and ${range.max}.`
		};
	}

	static isUrl() {
		return {
			validator: (v) => {
				return validator.isURL(v, { require_protocol: true });
			},
			message: (props) =>
				`'${props.value}' is not a valid URL. Make sure protocol is also specified.`
		};
	}

	static isEmail() {
		return {
			validator: (v) => {
				return validator.isEmail(v);
			},
			message: (props) => `'${props.value}' is not a valid email address.`
		};
	}

	static isPhone() {
		return {
			validator: (v) => {
				const pattern =
					/^([+]?([1-9]{1})?([1-9]{1})?[\s]?)?[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
				return !!pattern.test(v?.trim());
			},
			message: (props) =>
				simplifyStr(`'${props.value}' is not a valid phone number. Allowed formats are:
									 555-555-5555 | 
									(555)555-5555 | 
									(555) 555-5555 | 
									555 555 5555 | 
									5555555555 | 
									1 555 555 5555`)
		};
	}

	static validURL(str) {
		var pattern = new RegExp(
			'^(https?:\\/\\/)?' + // protocol
				'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
				'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
				'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
				'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
				'(\\#[-a-z\\d_]*)?$',
			'i'
		); // fragment locator
		return !!pattern.test(str);
	}
}

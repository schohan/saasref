// Create top
export class AppError extends Error {
	constructor(code, message) {
		super();
		this.code = code;
		this.message = message;
	}
}

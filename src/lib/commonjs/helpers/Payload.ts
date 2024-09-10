import _ from 'lodash';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

/* Wrap all response objects in this format */

export interface Pagination {
	limit: number;
	skip: number;
	total: number;
}

export class ErrorPayload {
	code: number;
	message: string;

	constructor(code: number, message: string) {
		this.code = code;
		this.message = message;
	}
}

export class Results {
	data: [object];
	pagination?: Pagination;
}

export class Payload {
	private payload: Results;
	private error: ErrorPayload;

	constructor(data: T) {
		this.payload = data;
	}

	// rename _id as id in response
	toJSON(): Payload {
		return _.omitBy(this, (value) => value === null);
	}

	stringify(): string {
		const payloadJson: Payload = this.toJSON();
		return JSON.stringify(payloadJson);
	}

	static errorPayload(e: unknown) {
		const error: ErrorPayload = new ErrorPayload();
		let partialData: Array = null;
		if (e.code === 11000) {
			// if partial data is inserted, set it to data
			partialData = e.insertedDocs;
			error.code = StatusCodes.CONFLICT;
			error.message = ReasonPhrases.CONFLICT + ' - ';
			// add to message
			e.writeErrors.map((e) => {
				error.message += e.err.errmsg + ' ';
			});
		} else {
			error.code = StatusCodes.BAD_REQUEST;
			error.message = e.message + '. ' + ReasonPhrases.BAD_REQUEST;
		}
		const ep = new Payload(partialData);
		ep.error = error;
		return ep.toJSON();
	}
}

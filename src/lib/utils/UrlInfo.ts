import * as tldjs from 'tldjs';
import isUrl from 'is-url-superb';

const { parse } = tldjs;

export class UrlInfo {
	private parsedObj: object;
	private url: string;

	constructor(url: string) {
		this.url = url;
		this.parsedObj = parse(url);
		console.log('Parsed value: ' + JSON.stringify(this.parsedObj));
	}

	isValid(): boolean {
		return isUrl(this.url, { lenient: true });
	}

	exists(): boolean {
		return this.parsedObj.tldExists;
	}

	domain(): string {
		return this.parsedObj.domain;
	}

	subdomain(): string {
		return this.parsedObj.subdomain;
	}
}

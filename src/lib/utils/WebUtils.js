/* Utility functions that might rely on browser compoenents */

export class WebUtils {
	// Open a poppup window
	static popupWindow(url, windowName, w, h) {
		const y = window.top.outerHeight / 2 + window.top.screenY - h / 2;
		const x = window.top.outerWidth / 2 + window.top.screenX - w / 2;
		return window.open(
			url,
			windowName,
			`toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`
		);
	}

	static getDomain(urlString) {
		const parsedUrl = new URL(urlString);
		return parsedUrl.hostname;
	}

	static slugify(urlString) {
		return urlString
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-') // Replace one or more non-alphanumeric characters with a hyphen
			.replace(/^-|-$/g, '');
	}
}

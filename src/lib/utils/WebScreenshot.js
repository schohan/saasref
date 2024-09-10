import { chromium } from 'playwright';

export class WebScreenShot {
	/**
	 * Take screenshot and returns it as a buffer. If filename is passed, file is saved with .jpeg extension.
	 *
	 * @param {string} url
	 * @param {string} fileToSave
	 */
	static async takeScreenshot(url, fileToSave = null, quality = 50) {
		console.log('Taking screenshot of: ' + url);
		// Launch a headless browser
		const browser = await chromium.launch();

		// Open a new page
		const page = await browser.newPage({
			userAgent:
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
		});

		// Navigate to the webpage
		await page.goto(url, { timeout: 10000 });

		// Capture screenshot of above-the-fold view
		try {
			if (fileToSave === null) {
				const buffer = await page.screenshot({ type: 'jpeg', quality });
				return buffer;
			} else {
				await page.screenshot({ path: fileToSave, type: 'jpeg', quality });
			}
		} finally {
			// Close the browser
			await browser.close();
			console.log('Saved screenshot of: ' + url + ' at ' + fileToSave);
		}
	}
}

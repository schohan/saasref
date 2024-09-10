export class ImageUtils {
	static async getBase64Image(imageUrl) {
		const response = await fetch(imageUrl);
		const blob = await response.blob();

		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});
	}

	/**
	 * Returns image after prefixing it with basePath.
	 * If image not found, returns a placeholder using title text.
	 *
	 * @param {*} basePath
	 * @param {*} image
	 * @param {*} title
	 * @returns
	 */
	static getImage(basePath, image, title) {
		if (image) {
			return basePath + image;
		}
		return `https://placehold.co/600x400?text=${title}`;
	}
}

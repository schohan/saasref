/* Object utilities */

export default class ObjUtils {
	/* Calculate percent values set as boolean 'true' in an object */
	static calcTruePercent(inpObj) {
		if (inpObj) {
			let trueCount = 0;
			const items = Object.entries(inpObj);
			items.forEach((item) => {
				trueCount = trueCount + (item[1] ? 1 : 0);
			});
			return Math.ceil((trueCount / items.length) * 100);
		}
	}
}

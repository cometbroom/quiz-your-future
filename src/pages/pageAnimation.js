//Placeholder to get the ability to remove interval
let intervalPlaceHolder;

/**
 * Will animate an array of elements
 * @param {Array} els - Array of elements
 * @param {string} target - Target style to animate, default is opacity
 * @param {number} changeBy - How much to change target style every 10 ms
 * @param {string} suffix - Suffix to apply when computed goes to style.
 * @returns {undefined}
 */
export const animateElements = (els, target = "opacity", changeBy = 0.05, suffix = "") => {
	//Initialize with 0
	els.forEach(el => {
		el.style[target] = "0";
	});
	intervalPlaceHolder = setInterval(() => {
		let elementStyle;
		//For each element take the style, change, and feed back
		els.forEach((el) => {
			elementStyle = parseFloat(el.style[target]);
			elementStyle += changeBy;
			el.style[target] = `${elementStyle}${suffix}`;
		});
		//Break at 1.
		if (elementStyle >= 1) {
			clearInterval(intervalPlaceHolder);
			return;
			}
	}, 10);
}

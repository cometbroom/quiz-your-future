let intervalPlaceHolder;

export const animateElements = (els, target = "opacity", changeBy = 0.05, suffix = "") => {
	els.forEach(el => {
		el.style[target] = "0";
	});
	intervalPlaceHolder = setInterval(() => {
		let elementStyle;
		els.forEach((el) => {
			elementStyle = parseFloat(el.style[target]);
			elementStyle += changeBy;
			el.style[target] = `${elementStyle}${suffix}`;
		});
		if (elementStyle >= 1) {
			clearInterval(intervalPlaceHolder);
			return;
			}
	}, 10);
}

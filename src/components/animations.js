let intervalPlaceholder;
let opacityAdder = 0.02;

//Set opacity of element to 0 and animate it to 1
export const opacityAnimation = (el) => {
	el.style.opacity = "0";
	
	intervalPlaceholder = setInterval(intervalMethod(el), 4);

}

const intervalMethod = (el) => {
	return () => {
		let opacity = parseFloat(el.style.opacity);

		opacity += opacityAdder;
		el.style.opacity = opacity;
		if (opacity >= 1) {
			clearInterval(intervalPlaceholder);
			return;
		}
	}
}


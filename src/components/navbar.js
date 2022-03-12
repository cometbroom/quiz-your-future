import { CURRENT_QUESTION_DISPLAY_ID, HIGH_SCORE_DISPLAY_ID, INFO_UI_ID, TIMER_DISPLAY_ID } from "../constants.js";
import { quizData } from "../data.js";
import { opacityAnimation } from "./animations.js";

const infoUI = document.getElementById(INFO_UI_ID);
const timerDisplay = infoUI.querySelector(`#${TIMER_DISPLAY_ID}`);
const questionDisplay = infoUI.querySelector(`#${CURRENT_QUESTION_DISPLAY_ID}`);
const scoreDisplay = infoUI.querySelector(`#${HIGH_SCORE_DISPLAY_ID}`);
export const navFinalScore = () => {
	return navData.score;
};
export const setNavFinalScore = (amount) => {
	navData.score = amount;
}
//Counter that take our timer's setInterval() method.
let timerCounter;
const navData = {
	mins: 0,
	secs: 0,
	score: 0,
	qCurrent: 0,
	qMax: quizData.questionsToShow
};
const getTimeFormatted = () => {
	return (
		`${navData.mins.toString().padStart(2, '0')}:${navData.secs.toString().padStart(2, '0')}`
	);
} 
/**
 * Initialize the top bar info elements.
 * @returns {void}
 */
export const starterNavUI = () => {
	timerDisplay.textContent = "00:00";
	scoreDisplay.textContent = "";
	questionDisplay.textContent = "";
};
export const lastPageNav = () => {
	scoreDisplay.textContent = "";
	questionDisplay.textContent = "";
	localStorage.setItem("currentIndex", quizData.questionsToShow);
}
export const initInfoUI = () => {
	//Make the initial content with forEach loop
	//Question upperlimit according to data
	const initContent = [
		"", 
		`${navData.qCurrent}/${navData.qMax}`, 
		getTimeFormatted()];

	initContent.forEach((item, idx) => {
		//Child 0, 1, 2 always have to be the same for this to work
		infoUI.children[idx].textContent = item;
	})
	//Make our second and mins variables

	//Interval that will count the time and update its display
	timerCounter = setInterval(() => {

		//Add seconds or minutes according to clock standard
		navData.secs < 59 ? navData.secs++: (navData.mins++, navData.secs = 0);
		timerDisplay.textContent = getTimeFormatted();
	}, 1000);
}

window.addEventListener('beforeunload', () => {
	if (localStorage.getItem('currentIndex') != null) {
		localStorage.setItem('navData', JSON.stringify(navData));
	} 
});

/**
 * Register the current question's index on the UI display
 * @returns {void}
 */
export const nextQuestionRegister = () => {
	navData.qCurrent++;
	localStorage.setItem('currentIndex', navData.qCurrent - 1);
	questionDisplay.textContent = `${navData.qCurrent}/${navData.qMax}`;
}

/**
 * Add to the user's score
 * @param {number} amount - Amount to add by.
 * @returns {void}
 */
 export const addToCurrentScore = (amount) => {
	navData.score += amount;
	
	scoreDisplay.innerHTML = String.raw`
	<img src="./public/assets/img/plus.png"><span>${amount}</span>
	`;
	opacityAnimation(scoreDisplay);
	setTimeout(() => {
		scoreDisplay.innerHTML = "";
	}, 800);
}


/**
 * Remove our UI infos and clear intervals.
 * @returns {void}
 */
export const removeUIInfos = () => {
	timerDisplay.textContent = '';
	questionDisplay.textContent = '';
	clearIntervals();
}

/**
 * Clear the set intervals for the navbar component.
 * @returns {void}
 */
export const clearIntervals = () => {
	clearInterval(timerCounter);
}


export const getTimerFromNavbar = () => {
	return (
		(navData.mins * 60) + navData.secs
	);
}

export const getDataNavbar = () => navData;
export const setDataNavbar = (data) => {
	Object.keys(data).forEach(key => {
		navData[key] = data[key];
	});
}
import { CURRENT_QUESTION_DISPLAY_ID, HIGH_SCORE_DISPLAY_ID, INFO_UI_ID, TIMER_DISPLAY_ID } from "../constants.js";
import { quizData } from "../data.js";
import { opacityAnimation } from "./animations.js";

//Navbar elements
const infoUI = document.getElementById(INFO_UI_ID);
const timerDisplay = infoUI.querySelector(`#${TIMER_DISPLAY_ID}`);
const questionDisplay = infoUI.querySelector(`#${CURRENT_QUESTION_DISPLAY_ID}`);
const scoreDisplay = infoUI.querySelector(`#${HIGH_SCORE_DISPLAY_ID}`);
//Counter that take our timer's setInterval() method.
let timerCounter;

//Navbar data which feed one-side to elements
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
 * Gets score from navbar data.
 * @returns {number}
 */
export const navFinalScore = () => {
	return navData.score;
};

/**
 * Sets score on navbar data.
 * @returns {undefined}
 */
export const setNavFinalScore = (amount) => {
	navData.score = amount;
}

/**
 * Initialize the top bar info elements.
 * @returns {undefined}
 */
export const starterNavUI = () => {
	timerDisplay.textContent = "00:00";
	scoreDisplay.textContent = "";
	questionDisplay.textContent = "";
};
/**
 * Show navbar setup of last page.
 * @returns {undefined}
 */
export const lastPageNav = () => {
	scoreDisplay.textContent = "";
	questionDisplay.textContent = "";
	localStorage.setItem("currentIndex", quizData.questionsToShow);
}
/**
 * Initialize navbar and start timer
 * @returns {undefined}
 */
export const initInfoUI = () => {
	//Make the initial content with forEach loop
	const initContent = [
		"", 
		`${navData.qCurrent}/${navData.qMax}`, 
		getTimeFormatted()
	];
	initContent.forEach((item, idx) => {
		infoUI.children[idx].textContent = item;
	})

	timerCounter = setInterval(() => {
		//Add seconds or minutes according to clock standard
		navData.secs < 59 ? navData.secs++: (navData.mins++, navData.secs = 0);
		timerDisplay.textContent = getTimeFormatted();
	}, 1000);
}


/**
 * Register the current question's index on the UI display
 * @returns {undefined}
 */
export const nextQuestionRegister = () => {
	navData.qCurrent++;
	localStorage.setItem('currentIndex', navData.qCurrent - 1);
	questionDisplay.textContent = `${navData.qCurrent}/${navData.qMax}`;
}

/**
 * Add to the user's score
 * @param {number} amount - Amount to add by.
 * @returns {undefined}
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
 * @returns {undefined}
 */
export const removeUIInfos = () => {
	timerDisplay.textContent = '';
	questionDisplay.textContent = '';
	clearIntervals();
}

/**
 * Clear the set intervals for the navbar component.
 * @returns {undefined}
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
/**
 * Will only set the provided keys to navData object
 * @param {object} data - Data object to take similar props from.
 * @returns {undefined}
 */
export const setDataNavbar = (data) => {
	Object.keys(data).forEach(key => {
		navData[key] = data[key];
	});
}

//Unload the navdata to localStorage
window.addEventListener('beforeunload', () => {
	if (localStorage.getItem('currentIndex') != null) {
		localStorage.setItem('navData', JSON.stringify(navData));
	} 
});

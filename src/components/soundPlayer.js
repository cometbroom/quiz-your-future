import { SOUND_ICON_ID, NAVBAR_QUERY } from "../constants.js";

const sounds = {
	correct: new Audio('https://cometbroom.github.io/quiz-your-future/public/assets/sounds/Negative_Bell_Bling_Game_Sound.wav'),
	bgMusic: new Audio('https://cometbroom.github.io/quiz-your-future/public/assets/sounds/background-music.mp3')
}

const SOUND_ICON_ON = 'https://cometbroom.github.io/quiz-your-future/public/assets/img/soundon.png';
const SOUND_ICON_MUTE = 'https://cometbroom.github.io/quiz-your-future/public/assets/img/mute.png';

sounds.bgMusic.volume = "0.2";

const soundIconElement = document.getElementById(SOUND_ICON_ID);
//const navbarElement = document.querySelector(NAVBAR_QUERY);

/*
const createSliderElement = () => {
	let slider = document.createElement("input");
	slider.classList.add("slider");
	slider.type = "range";
	slider.value = "0";
	slider.id = "sliderIcon";
	slider.style.top = `${navbarElement.offsetTop + navbarElement.offsetHeight}px`;
	slider.style.left = `${soundIconElement.offsetLeft}px`;
	slider.addEventListener("change", volumeHandler);
	return slider;
}
const sliderVolume = createSliderElement();

*/
/**
 * Will change the speaker icon according to argument
 * @param {string} what - String for switch statement e.g "on"/"off"
 * @returns {undefined}
 */
export const setSoundIcon = (what) => {
	switch (what) {
		case "on": soundIconElement.src = SOUND_ICON_ON; break;
		case "off": soundIconElement.src = SOUND_ICON_MUTE; break;
	}
}

/**
 * Reset background music from start
 */
export const resetBgMusic = () => {
	sounds.bgMusic.currentTime = 0;
}

/**
 * Will change the speaker icon according to argument
 * @param {number} vol - Number from 0 to 1
 * @returns {undefined}
 */
export const setBgVolume = (vol) => {
	Object.keys(sounds).forEach(key => {
		sounds[key].volume = `${vol}`;
	});
}

/**
 * Play the sound for the correct question
 */
export const playCorrectQ =  () => {
	sounds.correct.currentTime = 0;
	sounds.correct.play();
}

export let playBgMusic = () => {
	setBgVolume(0.2);
	setSoundIcon("on");
	//Listen for ended sound to loop.
	sounds.bgMusic.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	}, false);
	sounds.bgMusic.play();
}

export const pauseBgMusic = () => {
	sounds.bgMusic.pause();
	sounds.correct.volume = 0;
	setSoundIcon("off");
}
/*
//Called when vol slide changes
function volumeHandler() {
	//Change all sounds volume
	Object.keys(sounds).forEach(key => {
		sounds[key].volume = this.value / 100;
	})
	if (this.value == 0) {
		soundIconElement.src = SOUND_ICON_MUTE;
	} else {
		soundIconElement.src = SOUND_ICON_ON;
	}
}
*/
//Event listener for play and pause
soundIconElement.addEventListener("click", function() {
	if (sounds.bgMusic.paused) {
		playBgMusic();
	} else {
		pauseBgMusic();
	}
})

//Pause the music on refresh to avoid breaking autoplay rules
window.addEventListener("load", () => {
	pauseBgMusic();
});

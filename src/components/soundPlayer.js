import { SOUND_ICON_ID, NAVBAR_QUERY } from "../constants.js";

const sounds = {
	correct: new Audio('../../public/assets/sounds/Negative_Bell_Bling_Game_Sound.wav'),
	bgMusic: new Audio('../../public/assets/sounds/background-music.mp3')
}

const SOUND_ICON_ON = '../../public/assets/img/soundon.png';
const SOUND_ICON_MUTE = '../../public/assets/img/mute.png';

sounds.bgMusic.volume = "0.2";

let isSoundOn = true;

const soundIconElement = document.getElementById(SOUND_ICON_ID);
const navbarElement = document.querySelector(NAVBAR_QUERY);

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

export const setSoundIcon = (what) => {
	switch (what) {
		case "on": soundIconElement.src = SOUND_ICON_ON; break;
		case "off": soundIconElement.src = SOUND_ICON_MUTE; break;
	}
}

export const resetBgMusic = () => {
	sounds.bgMusic.currentTime = 0;
}

const sliderVolume = createSliderElement();

export const setBgVolume = (vol) => {
	Object.keys(sounds).forEach(key => {
		sounds[key].volume = `${vol}`;
	});
	sliderVolume.value = (vol * 100);
}



export const playCorrectQ =  () => {
	sounds.correct.currentTime = 0;
	sounds.correct.play();
}

export let playBgMusic = () => {
	sounds.correct.volume = 0.2;
	sounds.bgMusic.volume = 0.2;
	soundIconElement.src = SOUND_ICON_ON;
	sounds.bgMusic.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	}, false);
	sounds.bgMusic.play();
}

export const pauseBgMusic = () => {
	sounds.bgMusic.pause();
	sounds.correct.volume = 0;
	soundIconElement.src = SOUND_ICON_MUTE;
}

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

soundIconElement.addEventListener("click", function() {
	if (sounds.bgMusic.paused) {
		playBgMusic();
	} else {
		pauseBgMusic();
	}
})

window.addEventListener("load", () => {
	pauseBgMusic();
});

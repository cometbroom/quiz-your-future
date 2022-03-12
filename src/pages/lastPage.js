'use strict';

import { USER_INTERFACE_ID, RETURN_HOME_BUTTON_ID } from '../constants.js';
import { createLastElement, createScoreElement, createAccordionToggle, questionAndAnswerList, createFooter, addFortune } from '../views/lastView.js';
import { initWelcomePage } from './welcomePage.js';
import { setBgVolume, setSoundIcon } from '../components/soundPlayer.js';
import { fortune, quizData } from '../data.js';
import { clearIntervals, lastPageNav, setDataNavbar } from '../components/navbar.js';
import { createFortune } from '../components/scoreKeeper.js';
import { animateElements } from './pageAnimation.js';

const userInterface = document.getElementById(USER_INTERFACE_ID);

export const initLastPage = () => {

  clearIntervals();
  quizData.currentQuestionIndex = 0;
  lastPageNav();
  setBgVolume(0);
  setSoundIcon("off");

  userInterface.innerHTML = '';
  const scoreElement = createScoreElement();
  const fortune = addFortune();
  const yourFortune = createFortune();
  const lastElement = createLastElement();
  const accordionToggleDiv = createAccordionToggle();
  const qaList = questionAndAnswerList();
  const footer = createFooter();
  
  userInterface.appendChild(fortune);
  userInterface.appendChild(scoreElement);
  userInterface.appendChild(yourFortune);
  userInterface.appendChild(lastElement);
  accordionToggleDiv.appendChild(qaList);
  userInterface.appendChild(accordionToggleDiv);
  userInterface.appendChild(footer);

  animateElements([
    scoreElement,lastElement,qaList,accordionToggleDiv,footer
  ]);

  document
    .getElementById(RETURN_HOME_BUTTON_ID)
    .addEventListener('click', restartQuiz);
  accordionToggleDiv.addEventListener('click', accordionToggled(qaList))
};

const accordionToggled = (qaList) => {
  return () => {
    if (qaList.style.maxHeight) {
      qaList.style.maxHeight = null;
    } else {
      qaList.style.maxHeight = qaList.scrollHeight + "px";
    }
  }
}

const restartQuiz = () => {
  localStorage.clear();
   //Clear selection on reset.
  quizData.questions.map(q => {
    q.selected = null;
  });
  fortune.selected = null;
  setDataNavbar({
    mins: 0,
    secs: 0,
    qCurrent: 0,
    score: 0
  });
  initWelcomePage();
  };
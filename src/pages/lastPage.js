'use strict';

import { USER_INTERFACE_ID, RETURN_HOME_BUTTON_ID } from '../constants.js';
import { createLastElement, createScoreElement, createAccordionToggle, questionAndAnswerList, createFooter, addFortune } from '../views/lastView.js';
import { initWelcomePage } from './welcomePage.js';
import { fortune, quizData } from '../data.js';
import { clearIntervals, lastPageNav, setDataNavbar } from '../components/navbar.js';
import { createFortune } from '../components/scoreKeeper.js';
import { animateElements } from './pageAnimation.js';

const userInterface = document.getElementById(USER_INTERFACE_ID);

/**
 * Add our last page to userInterface
 * @returns {undefined}
 */
export const initLastPage = () => {
  //Stop timer
  clearIntervals();
  quizData.currentQuestionIndex = 0;
  lastPageNav();

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

  //Animate all elements' individual opacity
  animateElements([
    scoreElement,lastElement,qaList,accordionToggleDiv,footer
  ]);

  document
    .getElementById(RETURN_HOME_BUTTON_ID)
    .addEventListener('click', restartQuiz);
    //Event listener to toggle q&a list accordion
  accordionToggleDiv.addEventListener('click', accordionToggled(qaList))
};

//Will toggle between 0 maxHeight and fit-content maxHeight
//qaList can be any element
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
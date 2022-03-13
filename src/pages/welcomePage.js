'use strict';

import { initInfoUI, nextQuestionRegister, starterNavUI } from '../components/navbar.js';
import { USER_INTERFACE_ID, START_QUIZ_BUTTON_ID } from '../constants.js';
import { shuffleQuestions } from '../data.js';
import { createWelcomeElement } from '../views/welcomeView.js';
import { initQuestionPage } from './questionPage.js';
import { addFortune } from '../views/lastView.js';

/**
 * Initialize our welcome page
 * @returns {undefined}
 */
export const initWelcomePage = () => {
  starterNavUI();
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  //Make fortune img for welcome page
  const fortune = addFortune();
  const welcomeElement = createWelcomeElement();
  userInterface.appendChild(fortune);
  userInterface.appendChild(welcomeElement);

  document
    .getElementById(START_QUIZ_BUTTON_ID)
    .addEventListener('click', startQuiz);
};

const startQuiz = () => {

  shuffleQuestions();
  nextQuestionRegister();
  initQuestionPage();
  initInfoUI();
};

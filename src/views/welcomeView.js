'use strict';

import { START_QUIZ_BUTTON_ID } from '../constants.js';

/**
 * Create the welcome screen
 * @returns {Element}
 */
export const createWelcomeElement = () => {
  const element = document.createElement('div');
  element.innerHTML = String.raw`
    <h1 class="welcome-message">Welcome</h1>
    <button class="btn-primary" id="${START_QUIZ_BUTTON_ID}">start quiz</button>
    <br>
    <p class="welcome-phrase">Anyone can tell the past..<br>but we're here to show you your future!</p>
  `;
  return element;
};

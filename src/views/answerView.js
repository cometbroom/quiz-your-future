'use strict';
import { quizData } from '../data.js';
import { ANSWERS_LIST_ID } from '../constants.js';

/**
 * Create an Answer element
 * @returns {Element}
 */
export const createAnswerElement = (answerText) => {
  const element = document.createElement('li');
  element.classList.add('answer-options')
  element.innerHTML = String.raw`
    ${answerText}
  `;
  

  return element;
};
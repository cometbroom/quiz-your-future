'use strict';

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
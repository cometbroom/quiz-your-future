'use strict';

/**
 * Create an Answer element
 * @returns {Element}
 */
export const createResumeView = () => {
  const element = document.createElement('div');
  const title = document.createElement('h2');
  const resumeButton = document.createElement('button');
  resumeButton.classList.add('btn-primary');
  title.textContent = 'Resume from where you left:';
  resumeButton.textContent = 'Resume';

  element.appendChild(title);
  element.appendChild(resumeButton);

  return element;
};

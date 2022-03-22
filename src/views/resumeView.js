'use strict';

import { createButton } from './reusableViews.js';

/**
 * Create an Answer element
 * @returns {Element}
 */
export const RESUME_BUTTON_ID = 'resume-button';

export const createResumeView = () => {
  const element = document.createElement('div');
  const title = document.createElement('h2');
  const resumeButton = createButton(
    ['btn-primary'],
    'Resume',
    RESUME_BUTTON_ID
  );
  title.textContent = 'Resume from where you left:';

  element.appendChild(title);
  element.appendChild(resumeButton);

  return element;
};

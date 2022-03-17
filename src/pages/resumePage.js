import { USER_INTERFACE_ID } from '../constants.js';
import { createResumeView } from '../views/resumeView.js';

export const initResumePage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const resumeView = createResumeView();

  userInterface.appendChild(resumeView);
};

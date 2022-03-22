import { initInfoUI, setDataNavbar } from '../components/navbar.js';
import { USER_INTERFACE_ID } from '../constants.js';
import { quizData } from '../data.js';
import { createResumeView, RESUME_BUTTON_ID } from '../views/resumeView.js';
import { initLastPage } from './lastPage.js';
import { initQuestionPage } from './questionPage.js';

export const initResumePage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const resumeView = createResumeView();

  userInterface.appendChild(resumeView);

  resumeView
    .querySelector(`#${RESUME_BUTTON_ID}`)
    .addEventListener('click', resumeClicked);
};

function resumeClicked() {
  reloadData();
}

const reloadData = () => {
  quizData.questions = JSON.parse(localStorage.getItem('questionList'));
  quizData.currentQuestionIndex = parseInt(
    localStorage.getItem('currentIndex'),
    10
  );
  const storageNavData = JSON.parse(localStorage.getItem('navData'));
  setDataNavbar(storageNavData);

  initInfoUI();
  //Last page logic
  if (quizData.currentQuestionIndex >= quizData.questionsToShow) {
    initLastPage();
  } else {
    initQuestionPage();
  }
};

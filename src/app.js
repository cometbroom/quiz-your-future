'use strict';

import { quizData } from './data.js';
import { initWelcomePage } from './pages/welcomePage.js';
import { clearIntervals } from './components/navbar.js';
import { initResumePage } from './pages/resumePage.js';

//Window script to offload localStorage
window.offloadStorage = () => {
  clearIntervals();
  localStorage.clear();
};

//Window script to limit questions to ask
window.limitQuestionTo = (val) => {
  quizData.questionsToShow = val;
};

const loadApp = () => {
  if (localStorage.getItem('currentIndex') !== null) {
    initResumePage();
    //if currentIndex is null, that means we go to welcome page
  } else {
    quizData.currentQuestionIndex = 0;
    initWelcomePage();
  }
};

window.addEventListener('load', loadApp);

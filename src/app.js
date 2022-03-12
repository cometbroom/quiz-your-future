'use strict';

import { quizData } from './data.js';
import { initWelcomePage } from './pages/welcomePage.js';
import { initQuestionPage } from './pages/questionPage.js';
import { clearIntervals, initInfoUI, setDataNavbar } from './components/navbar.js';
import { initLastPage } from './pages/lastPage.js';

//Window script to offload localStorage
window.offloadStorage = () => {
  clearIntervals();
  localStorage.clear();
}

//Window script to limit questions to ask
window.limitQuestionTo = (val) => {
  quizData.questionsToShow = val;
}

const loadApp = () => {
  //Put memorized data to quizData at refresh.
  if(localStorage.getItem('currentIndex') !== null) {
    const list = JSON.parse(localStorage.getItem('questionList'));
    quizData.currentQuestionIndex = parseInt(localStorage.getItem('currentIndex'), 10);
    quizData.questions = list;
    
    const navDataStored = JSON.parse(localStorage.getItem('navData'));
    setDataNavbar(navDataStored);

    initInfoUI();
    if (quizData.currentQuestionIndex >= quizData.questionsToShow) {
      initLastPage();
    } else {
      initQuestionPage();
    }
  } else {
    quizData.currentQuestionIndex = 0;
    initWelcomePage();
  }
  
};

window.addEventListener('load', loadApp);
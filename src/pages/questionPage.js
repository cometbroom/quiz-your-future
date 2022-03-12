'use strict';

import {
  ANSWERS_LIST_ID,
  // NEXT_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  HINT_BUTTON_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
import { initLastPage } from './lastPage.js';
import {
  addToCurrentScore,
  nextQuestionRegister,
} from '../components/navbar.js';
import { score } from '../components/scoreKeeper.js';
import { playBgMusic, playCorrectQ } from '../components/soundPlayer.js';
import { animateElements } from './pageAnimation.js';

//Check if correct answer is selected
let isCorrectAnswerSelected = false;

export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';
  
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  const questionElement = createQuestionElement(currentQuestion.text);

  userInterface.appendChild(questionElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);
  animateElements([questionElement, answersListElement]);

  // put every wrong answers in the wrongAnswers array
  const wrongAnswers = [];

  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(answerText);
    answerElement.addEventListener('mouseover', (e) => e.target.classList.add('answer-options-hovering'));
    answerElement.addEventListener('mouseout', (e) => e.target.classList.remove('answer-options-hovering'));
    answersListElement.appendChild(answerElement);
    answerElement.addEventListener('click', (e) => {
      currentQuestion.selected = key;
      answerElementHandler(e);
      // remove the chosen options from wrongAnswers array
      wrongAnswers.splice(wrongAnswers.indexOf(answerElement), 1);
    });
    // pushing wrong answers to the wrongAnswers array
    if(key !== currentQuestion.correct) {
      wrongAnswers.push(answerElement);
    }   
  }


  const hintHandler = () => {
    // limit the function with wrongAnswers length to stop hint button working when no option to remove
    if (wrongAnswers.length > 0) {
      const randInd = Math.floor(Math.random() * wrongAnswers.length);
      // selecting an to item to remove from answerListElement
      const removedItem = answersListElement.children[[...answersListElement.children].indexOf(wrongAnswers[randInd])];
      // remove the item from wrongAnswers also
      wrongAnswers.splice(randInd, 1);
      // adding class wrong to the item
      removedItem.classList.add('answer-option-wrong');
      // decrease 1 point for each time clicking to hint button
      score.total -= 1;
    }
  }

  document
  .getElementById(HINT_BUTTON_ID)
  .addEventListener('click', hintHandler);
}; 

  //Go through each answer and add events
const answerElementHandler = (e) => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  //If correct answer selected prevent event from firing.
  if(isCorrectAnswerSelected) return;
  e.target.classList.remove('answer-options-hovering');
  if (currentQuestion.selected === currentQuestion.correct) {
    playCorrectQ();
    e.target.classList.add('answer-option-correct');
    addToCurrentScore(score.total)
    score.total = 3;
    nextQuestion();
  } else {
   e.target.classList.add('answer-option-wrong');
    score.total -= 1;
  }
  if (score.total < 1) {
        score.total = 0;
      };
}

//Will call next function on callback
const delayNext = (callback) => {
  isCorrectAnswerSelected = true;
  setTimeout(() => {
    callback();
    isCorrectAnswerSelected = false;
  }, 800);
}

const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;

  if (quizData.currentQuestionIndex >= quizData.questionsToShow) {
    delayNext(initLastPage);
  } else {
    //Function only comes here when correct answer is selected.
    delayNext(initQuestionPage);
    nextQuestionRegister();
  }
};

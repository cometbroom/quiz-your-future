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
import { playCorrectQ } from '../components/soundPlayer.js';
import { animateElements } from './pageAnimation.js';
import { sideAnimation } from '../components/animations.js';

//Check if correct answer is selected
let isCorrectAnswerSelected = false;

/**
 * Initialize our question page with current data
 * @returns {undefined}
 */
export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  sideAnimation('70%', '0');

  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  //Create our question element with our text
  const questionElement = createQuestionElement(currentQuestion.text);

  userInterface.appendChild(questionElement);

  //Get our answerlist container which was created on questionView with ID
  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  //Animate our question and answerlist element
  animateElements([questionElement, answersListElement]);

  //Put every wrong answers in the wrongAnswers array
  const wrongAnswers = [];

  //Go through each answer element, append and add the relevant events
  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(answerText);
    answerElement.addEventListener('mouseover', (e) =>
      e.target.classList.add('answer-options-hovering')
    );
    answerElement.addEventListener('mouseout', (e) =>
      e.target.classList.remove('answer-options-hovering')
    );
    answersListElement.appendChild(answerElement);
    answerElement.addEventListener(
      'click',
      answerClickHandler(key, answerElement)
    );
    // pushing wrong answers to the wrongAnswers array
    if (key !== currentQuestion.correct) {
      wrongAnswers.push(answerElement);
    }
  }

  function answerClickHandler(key, answerEl) {
    return (e) => {
      currentQuestion.selected = key;
      answerLogicHandler(e);
      // remove the chosen options from wrongAnswers array
      wrongAnswers.splice(wrongAnswers.indexOf(answerEl), 1);
    };
  }
  //Add our hint handler to hint button click event
  document
    .getElementById(HINT_BUTTON_ID)
    .addEventListener('click', hintHandler);

  function hintHandler() {
    // limit the function with wrongAnswers length to stop hint button working when no option to remove
    if (wrongAnswers.length > 0) {
      const randInd = Math.floor(Math.random() * wrongAnswers.length);
      // selecting an to item to remove from answerListElement
      const removedItem =
        answersListElement.children[
          [...answersListElement.children].indexOf(wrongAnswers[randInd])
        ];
      // remove the item from wrongAnswers also
      wrongAnswers.splice(randInd, 1);
      // adding class wrong to the item
      removedItem.classList.add('answer-option-wrong');
      // decrease 1 point for each time clicking to hint button
      score.total -= 1;
    }
  }
};

//Check question for correct/wrong and do the relevant logic
const answerLogicHandler = (e) => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  //If correct answer is already selected prevent from continuing.
  if (isCorrectAnswerSelected) return;
  e.target.classList.remove('answer-options-hovering');
  if (currentQuestion.selected === currentQuestion.correct) {
    playCorrectQ();
    e.target.classList.add('answer-option-correct');
    addToCurrentScore(score.total);
    //Reset our total score for next question
    score.total = 3;
    nextQuestion();
  } else {
    e.target.classList.add('answer-option-wrong');
    //Subtract score at each wrong answer
    score.total -= 1;
  }
  //Negative scores shouldn't be possible
  if (score.total < 1) {
    score.total = 0;
  }
};

//Will call after delay 800ms
const delayNext = (callback) => {
  sideAnimation('0', '-70%', 0.4);
  //Global bool to help prevention of selections during the timeout
  isCorrectAnswerSelected = true;
  setTimeout(() => {
    callback();
    isCorrectAnswerSelected = false;
  }, 800);
};

const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;

  //If reached 10 question, go to last page
  if (quizData.currentQuestionIndex >= quizData.questionsToShow) {
    delayNext(initLastPage);
  } else {
    //Function only comes here when correct answer is selected.
    delayNext(initQuestionPage);
    //Register next question in navbar
    nextQuestionRegister();
  }
};

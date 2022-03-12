'use strict';

import { navFinalScore } from '../components/navbar.js';
import { scoreMultiplier } from '../components/scoreKeeper.js';
import { RETURN_HOME_BUTTON_ID } from '../constants.js';
import { quizData } from "../data.js";

// creates the try again button
export const createLastElement = () => {
  const element = document.createElement('div');
  element.innerHTML = String.raw`
    <button class="btn-primary" id="${RETURN_HOME_BUTTON_ID}">try again</button>
    `;
  return element;
};

// this will make the High Score provider
export const createScoreElement = () => {
  const element = document.createElement('div');
  element.innerHTML = String.raw`
    <h4>Your Final Score is: ${scoreMultiplier(navFinalScore())}</h4>
  `;
  return element;
};

/**
 * Create an accordion element
 * @returns {Element}
 */
export const createAccordionToggle = () => {
  const parent = document.createElement('div');
  const element = document.createElement('h3');

  parent.classList.add("qalist-wrapper");
  element.textContent = `Show the summary of questions`;
  parent.appendChild(element);
  return parent;
}

/**
 * Create an Answer element
 * @returns {Element}
 */
export const questionAndAnswerList = () => {
  
    const element = document.createElement('div');

    quizData.questions.forEach(question => {
        const liElement = document.createElement('p');
        
        if(question.selected !== null) {
           liElement.innerHTML = String.raw`
        <p class="qa-question">Q: ${question.text}<span class="q-list-ending qa-answer">A: ${question.answers[question.correct]}</span><p>
        `;
        element.appendChild(liElement);           
      }     
    })
    return element;
}

// create the footer with the links for the team 
export const createFooter = () => {
  const element = document.createElement('div');
  element.innerHTML = String.raw`
    <footer>
      <p>
      This project was actualized by the 'Quiz Your Future' team<br>
      <a target="_blank" href="https://github.com/cometbroom">Ali</a>, <a target="_blank" href="https://github.com/slymny">Suleyman</a> and <a target="_blank" href="https://github.com/EdwardAbboud">Edward</a>.
      </p>
      <a target="_blank" href="https://icons8.com/icon/49838/mute">Mute</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
      <a target="_blank" href="https://icons8.com/icon/K0l4dwcsMaJa/plus">Plus</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    </footer>
  `;
  return element;
};

// add the background to the final page
export const addFortune = () => {
  const element = document.createElement('div');
  element.innerHTML = String.raw`
    <img class="fortune-img" src="./public/assets/background-img/QYF-background.png">
  `;
  return element;
};


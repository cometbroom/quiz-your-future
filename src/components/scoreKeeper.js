import { getTimerFromNavbar } from "./navbar.js";
import { quizData,fortune } from "../data.js";
import { navFinalScore } from "./navbar.js";

export const score = {
  question: 0,
  total: 3,
  finalScore: 0
}

/**
 * Calculates the score based on how quickly the user completes the quiz
 * @param {number} endScore - Number from 0 to inf
 * @returns {number}
 */
export const scoreMultiplier = (endScore) => {
  let timeGiven = (quizData.questionsToShow * 30);
  let multiplierCalculator = Math.floor((timeGiven - getTimerFromNavbar()) / 20);
  let finalScore = endScore * multiplierCalculator;
  if (finalScore<0) {
    return 0;
  } else {
  return finalScore;
  }
};

/**
 * Return user's fortune based on score
 * @returns {string}
 */
 export const returnFortune = () => {
   //Logic to handle refreshing
  if (fortune.selected !== null) return fortune.selected;

  const rndInt = Math.floor(Math.random() * 3);
  if (scoreMultiplier(navFinalScore()) < 100){
    fortune.selected = fortune.bad[rndInt];
  } else if (scoreMultiplier(navFinalScore()) < 200) {
    fortune.selected = fortune.medium[rndInt];
  } else {
    fortune.selected = fortune.good[rndInt];
  }
  return fortune.selected;
};

/**
 * Create fortune html element
 * @returns {element}
 */
export const createFortune = () => {
  const element = document.createElement('div');
  element.innerHTML = String.raw`
    <p class="fortune">
      Fortune-teller says: "${returnFortune()}"
    </p>
  `;
  return element;
};
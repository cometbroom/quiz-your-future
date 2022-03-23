'use strict';

/* Program Data

  in this file you can declare variables to store important data for your program
  the data can only be primitives, objects or arrays
  do not store dom elements in these variables!!!!

  these variables will be imported by your handlers when necessary
    not by your logic
    not by your listeners
*/

export const quizData = {
  currentQuestionIndex: 0,
  questionsToShow: 10,
  // the questions in the quiz
  questions: [],
};

/**
 * Shuffle our quizData questions in the memory
 * @returns {undefined}
 */
export const shuffleQuestions = () => {
  //Find random index for temp array and pop the found question.
  let questionsTemp = [...quizData.questions];

  //For every question, get one from rand array and remove it
  quizData.questions.forEach((q, idx) => {
    let randIndex = Math.floor(Math.random() * questionsTemp.length);

    quizData.questions[idx] = questionsTemp[randIndex];
    questionsTemp.splice(randIndex, 1);
  });
};

//Collection of fortunes
//Selected gets assigned on last page to prevent further randomization
export const fortune = {
  bad: [
    '5 years from now you will likely be found collecting garbage!',
    'If you do not turn your life around you will regret it!',
    "There's still time to learn what you don't know!",
  ],
  medium: [
    'You are not the luckiest or the unluckiest...',
    'You will be married and have 2 slightly unsuccessful children',
    'You might end up as a pre-school teacher..somewhere',
  ],
  good: [
    'Congratulations! You may succeed to the next step of your life!',
    'You will be married to your soul-mate and will have many lovely successful children',
    'You will become the poorest rich person in the world',
  ],
  selected: null,
};

//Unload our data to localStorage
window.addEventListener('beforeunload', () => {
  localStorage.setItem('questionList', JSON.stringify(quizData.questions));
  localStorage.setItem('fortuneSelected', fortune.selected);
});

//On load, if fortune selected, re-assign to prevent further randomization.
window.addEventListener('load', () => {
  const selectedFort = localStorage.getItem('fortuneSelected');
  if (selectedFort != 'null') {
    fortune.selected = selectedFort;
  }
});

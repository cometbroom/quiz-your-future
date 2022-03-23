import {
  firebaseConfig,
  FIREBASE_CDN,
  FIREBASE_RTDB_CDN,
} from '../separate.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js';
import {
  getDatabase,
  ref,
  set,
  onValue,
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js';
import { quizData } from '../src/data.js';

const config = firebaseConfig;
// Initialize Firebase

export async function apiCommunication() {
  try {
    const app = await initializeApp(config);
    const data = await getDatabase(app);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const createUserQuestions = async (userId, questionsIn) => {
  try {
    const _db = await apiCommunication();
    set(ref(_db, 'defaultQuestions/'), {
      userId: userId,
      questions: questionsIn,
    });
  } catch (error) {
    console.log('failed to grab data', error);
  }
};

window.createDefaultQuestions = async () => {
  try {
    const _db = await apiCommunication();
    set(ref(_db, 'defaultQuestions/'), {
      questions: quizData.questions,
    });
  } catch (error) {
    console.log('failed to grab data', error);
  }
};

export const addDataListener = async () => {
  try {
    const db = await apiCommunication();
    const questionsRef = ref(db, 'defaultQuestions/questions');
    onValue(questionsRef, (snapshot) => {
      const data = snapshot.val();
      quizData.questions = data;
    });
  } catch (error) {}
};

import { db, firebase } from "../../firebase";

class Services {
  constructor() {
    this.myDocID = localStorage.getItem("docID");
  }

  async getHasPlayedToday() {
    const resolvedQuestions = await this.getResolvedQuestions();
    const date = new Date();
    const currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const lastItem = resolvedQuestions[resolvedQuestions.length - 1];
    if (lastItem.date === currentDate) {
      return true;
    } else {
      return false;
    }
  }

  async getResolvedQuestions() {
    const RESOLVED_QUESTIONS = await db
      .doc(`userData/${this.myDocID}/triviaQuestions/resolved`)
      .get("questions");
    const RESOLVED_DATA = RESOLVED_QUESTIONS.data();
    const RESOLVED_ARR = RESOLVED_DATA.questions;

    return RESOLVED_ARR;
  }

  async getQuestion() {
    let question = {};
    // First, we get the resolved questions
    const RESOLVED_QUESTIONS = await db
      .doc(`userData/${this.myDocID}/triviaQuestions/resolved`)
      .get("questions");
    const RESOLVED_DATA = RESOLVED_QUESTIONS.data();
    const RESOLVED_ARR = RESOLVED_DATA.questions;

    // Then, we get all the questions (Resolved and Unresolved)
    const ALL_QUESTIONS = await db.collection(`TriviaV2`).get();
    const ALL_ARR = ALL_QUESTIONS.docs.map((doc) => doc.data());

    // Random numbers to get a random question and randomize the answers order
    const randomPosition = Math.floor(Math.random() * ALL_ARR.length);
    const randomOrder = Math.floor(Math.random() * 4);

    let questionData = null;
    let position = `triviadoc-${randomPosition}`;
    let questionRef = await db.collection("TriviaV2").doc(position).get();
    questionData = questionRef.data();

    for (let resolved of RESOLVED_ARR) {
      question = ALL_ARR.find((question) => question.id !== resolved.id);
    }
    question.answers = questionData.incorrect_answers;
    question.id = questionData.id;
    question.correct_answer = questionData.correct_answer;
    question.ask = questionData.question;
    question.answers.splice(randomOrder, 0, questionData.correct_answer);

    if (RESOLVED_ARR.length === 364) {
      question = {
        ask: "¡Congratulations! You have played all the questions.",
        answers: [],
        correct_answer: "",
        id: "",
      };
    }

    return question;
  }

  async saveQuestion(question) {
    const date = new Date();
    const currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    question.date = currentDate;
    const myDocRef = await db.doc(
      `userData/${this.myDocID}/triviaQuestions/resolved`
    );
    myDocRef.update({
      questions: firebase.firestore.FieldValue.arrayUnion(question),
    });
  }
}

export default new Services();

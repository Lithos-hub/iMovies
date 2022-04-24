import { db, firebase } from "../../firebase";
import i18n from "@/plugins/i18n";
import axios from "axios";
class Services {
  constructor() {
    this.myDocID = localStorage.getItem("docID");
  }

  async hasVisitedTheSection(section) {
    const myDocRef = await db.doc(
      `userData/${this.myDocID}/iMovies-Sections/sections`
    );
    myDocRef.update({
      visited: firebase.firestore.FieldValue.arrayUnion(section),
    });
  }

  async getHasPlayedToday() {
    let resolvedQuestions = await this.getResolvedQuestions();

    let date = new Date();
    const currentDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    const lastItem = resolvedQuestions.at(-1);
    if (lastItem.date && lastItem.date === currentDate) {
      return true;
    } else {
      return false;
    }
  }

  async getResolvedQuestions() {
    let RESOLVED_ARR = []
    const RESOLVED_QUESTIONS = await db
      .doc(`userData/${this.myDocID}/triviaQuestions/resolved`)
      .get("questions");
    const RESOLVED_DATA = RESOLVED_QUESTIONS.data();
    RESOLVED_ARR = RESOLVED_DATA.questions;
    let points = 0;

    for (let resolved of RESOLVED_ARR) {
      if (resolved.passed) {
        points += 10;
      }
    }

    await db.doc(`userData/${this.myDocID}/triviaQuestions/points`).set({
      total: points,
    });

    console.log("Total points: ", points);

    return RESOLVED_ARR;
  }

  async translate(text, lang) {
    const URL = `https://api-free.deepl.com/v2/translate?auth_key=21b7fb11-3bac-da40-6e50-02e7f2eb7bf6:fx&text=${text}&target_lang=${lang.substring(3, 6)}`;
    let result = ''
    await axios
      .get(URL)
      .then((response) => {
        const {
          data: { translations },
        } = response;
        if (translations.length) {
        result = translations[0].text;
        }
      })
      .catch((error) => {
        if (error) reject(error);
      });
      return result;
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

    let incorrect_answers = []

    questionData.incorrect_answers.forEach(async (item) => {
      let translation = await this.translate(item, i18n.locale)
      incorrect_answers.push(translation)
    })

    for (let resolved of RESOLVED_ARR) {
      question = ALL_ARR.find((question) => question.id !== resolved.id);
    }
    question.answers = incorrect_answers
    console.log('Question answers ==> ', question.answers)
    question.id = questionData.id;
    question.correct_answer = await this.translate(questionData.correct_answer, i18n.locale);
    question.ask = await this.translate(questionData.question, i18n.locale);
    question.image = questionData.image;
    question.answers.splice(randomOrder, 0, await this.translate(questionData.correct_answer, i18n.locale));

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
    console.log('Saving question ==> ', question)
    const date = new Date();
    const currentDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    question.date = currentDate;
    const myDocRef = await db.doc(
      `userData/${this.myDocID}/triviaQuestions/resolved`
    );
    myDocRef.update({
      questions: firebase.firestore.FieldValue.arrayUnion(question),
    });
  }

  async getAchievements() {}
}

export default new Services();

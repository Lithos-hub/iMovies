<template>
  <div>
    <v-container fluid>
      <div class="d-flex justify-space-between">
        <h4 id="triviaGame-title" class="text-h4">iMovies Trivia Game</h4>
        <v-btn tile class="white--text gradient-background-1" @click="goToStart"
          >Regresar al inicio</v-btn
        >
      </div>
      <div id="trivia-divider"></div>
      <v-progress-circular
        class="centered"
        indeterminate
        width="2"
        color="cyan"
        size="100"
        v-if="loadingTrivia"
      ></v-progress-circular>
      <TriviaQuestions
        v-if="!loadingTrivia"
        :loading="loadingTrivia"
        id="triviaQuestions-comp"
        :question="question"
      />
    </v-container>
  </div>
</template>

<script>
import TriviaQuestions from "../components/TriviaQuestions";
import { db } from "../../firebase";
export default {
  components: {
    TriviaQuestions,
  },
  data() {
    return {
      question: {},
      loadingTrivia: false,
    };
  },
  mounted() {
    this.getTriviaQuestion();
  },
  methods: {
    goToStart() {
      this.$router.push({ path: "/trivia" });
    },
    async getTriviaQuestion() {
      this.loadingTrivia = true;

      // First, we have to know the questions resolved by the user

      const myDocID = this.$store.getters.myDocumentID;
      let resolvedQuestionsRef = await db
        .doc(`userData/${myDocID}/triviaQuestions/resolved`)
        .get();
      const questionsData = resolvedQuestionsRef.data();
      console.log(questionsData.questions);

      // Then, we get the collection from Firebase and get all the docs
      const triviaRef = await db.collection("Trivia").get();
      const triviaDocs = triviaRef.docs;

      // If there is no length, it's the first time the user plays the game
      // So, we'll get a random question between 0 and 364
      // Else, we have to get the resolved questions and get a random question with a different id
      if (!questionsData.questions.length) {
        const randomNumber = Math.floor(Math.random() * 364);
        const randomQuestion = triviaDocs[randomNumber].data();
        this.question.answers = randomQuestion.incorrect_answers;
        this.question.answers.splice(
          randomNumber,
          0,
          randomQuestion.correct_answer
        );
        this.question.ask = randomQuestion.question;
        this.loadingTrivia = false;
      } else {
        const resolvedQuestions = [];
      }

      // Then, we get a random number between 1 and the total number of questions

      // const triviaData = triviaDocs[randomNumber].data()
      // const randomOrder = Math.floor(Math.random() * 4);
      // this.question.answers = triviaData.incorrect_answers
      // this.question.answers.splice(randomOrder, 0, triviaData.correct_answer)
      // this.question.ask = triviaData.question
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

#triviaGame-title {
  background: $gradient_1;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

#triviaQuestions-comp {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#trivia-divider {
  border-radius: 10px;
  height: 2px;
  width: 100%;
  margin: 0 auto;
  background: $gradient_1;
}
</style>

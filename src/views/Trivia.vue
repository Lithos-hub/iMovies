<template>
  <div>
    <div class="centered">
      <v-btn
        v-if="hasSavedGame"
        tile
        class="d-block my-5 gradient-background-2 white--text"
        width="150"
        @click="loadGame"
        >Continuar</v-btn
      >
      <v-btn
        tile
        class="d-block my-5 gradient-background-1 white--text"
        width="150"
        @click="launchFirstGame"
        >Jugar</v-btn
      >
    </div>
  </div>
</template>

<script>
// import Utils from "../utils/genQuestions";
import Services from "../services/services";
import { db } from "../../firebase";

export default {
  data() {
    return {
      hasSavedGame: false,
    };
  },
  mounted() {
    this.getSavedGame();
    // this.genQuestions();
  },
  methods: {
    async genQuestions () { // ! To generate the questions in firebase
      const questions = await Utils.genQuestions()
      questions.forEach((question, index) => {
          db
          .collection('TriviaV2')
          .doc(`triviadoc-${index}`)
          .set({
            id: index,
            incorrect_answers: question.incorrect_answers,
            correct_answer: question.correct_answer,
            question: question.question,
          })
          .then(() => {
            console.log('Document successfully written!')
          })
          .catch(error => {
            console.error('Error writing document: ', error)
          })
      })
    },
    getSavedGame() {
      // First, we get all the questions and we'll filter the resolved questions
      Services
      .getQuestion()
      .then(res => {
        console.log(res)
      })
    },
    loadGame() {
      // TODO: get de ID of the last game saved
      const id = null;
      this.$router.push(`/trivia/game/${id}`);
    },
    launchFirstGame() {
      this.$router.push("/trivia/game/instructions");
    },
  },
};
</script>

<style></style>

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
import Services from "../services/services";
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
    this.getQuestion()
  },
  methods: {
    goToStart() {
      this.$router.push({ path: "/trivia" });
    },
    async getQuestion () {
      await Services
      .getQuestion()
      .then(res => {
        this.question = res
      })
      .catch(err => {
        console.log(err)
      })
    }
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

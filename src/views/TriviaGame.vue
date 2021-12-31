<template>
  <div>
    <v-container fluid v-if="!hasPlayedToday">
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
    <v-container v-else>
      <div class="centered">
        <h3 class="text-h3 text-center my-5 primary--text">Ya has jugado por hoy.</h3>
        <h3 class="text-h3 text-center my-5 primary--text">¡Vuelve mañana para resolver el siguiente reto!</h3>
        <v-btn class="error" tile block large @click="comeback">Regresar</v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import TriviaQuestions from "../components/TriviaQuestions";
import Services from "../services/services";
import { mapState } from "vuex";
export default {
  components: {
    TriviaQuestions,
  },
  data() {
    return {
      question: {},
      loadingTrivia: false,
      hasPlayedToday: false,
    };
  },
  computed: {
    ...mapState(['currentDate'])
  },
  mounted() {
    this.getHasPlayedToday();
    if (!this.hasPlayedToday) {
      this.getQuestion();
    }
  },
  methods: {
    comeback () {
      this.$router.push({ path: '/home' })
    },
    getHasPlayedToday() {
      this.loadingTrivia = true;
      Services
      .getHasPlayedToday()
      .then(res => {
        this.loadingTrivia = false
        this.hasPlayedToday = res
      })
      .catch(err => {
        this.loadingTrivia = false
        console.log(err)
      })
    },
    goToStart() {
      this.$router.push({ path: "/trivia" });
    },
    async getQuestion () {
      this.loadingTrivia = true
      await Services
      .getQuestion()
      .then(res => {
        this.question = res
        this.loadingTrivia = false
      })
      .catch(err => {
        console.log(err)
        this.loadingTrivia = false
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

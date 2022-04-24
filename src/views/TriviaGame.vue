<template>
  <div>
    <v-container fluid v-if="!hasPlayedToday">
      <div class="d-flex justify-space-between mt-5">
        <h5 id="triviaGame-title" class="text-h5">
          {{ $t("view-trivia.triviaGame") }}
        </h5>
        <v-btn
          tile
          class="white--text gradient-background-1"
          @click="goToStart"
          >{{ $t("view-trivia.comeback") }}</v-btn
        >
      </div>
      <div id="trivia-divider"></div>
      <!-- COUNTER -->
      <div id="counter" class="text-center mt-5" v-if="!hideCounter">
        <h1 :class="computeCounter(counter)">{{ counter }}</h1>
      </div>
      <TriviaQuestions
        v-if="!loadingTrivia && !isGameOver"
        :loading="loadingTrivia"
        id="triviaQuestions-comp"
        :question="question"
        @hide-counter="isHiddingCounter"
      />
      <v-progress-circular
        class="centered"
        indeterminate
        width="2"
        color="cyan"
        size="100"
        v-if="loadingTrivia"
      ></v-progress-circular>
      <!-- GAME OVER MESSAGE -->
      <div v-if="isGameOver" class="centered text-justify">
        <h4 class="text-center text-h6 red--text">
          {{ $t("view-trivia.gameOver1") }}
        </h4>
        <br />
        <h4 class="text-center text-h6 red--text">
          {{ $t("view-trivia.gameOver2") }}
        </h4>
        <br />
        <v-btn class="error" tile block large @click="comeback">Regresar</v-btn>
      </div>
    </v-container>
    <v-container v-else>
      <div class="centered">
        <h3 class="text-h6 text-center my-5 primary--text">
          {{ $t("view-trivia.justPlayed1") }}
        </h3>
        <h3 class="text-h6 text-center my-5 primary--text">
          {{ $t("view-trivia.justPlayed2") }}
        </h3>
        <v-btn class="error" tile block large @click="comeback">{{
          $t("view-trivia.comeback")
        }}</v-btn>
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
      hideCounter: false,
      loadingTrivia: false,
      hasPlayedToday: false,
      isGameOver: false,
      counter: 20,
    };
  },
  computed: {
    ...mapState(["currentDate"]),
  },
  mounted() {
    this.getHasPlayedToday();
    if (!this.hasPlayedToday) {
      this.getQuestion();
    }
  },
  methods: {
    comeback() {
      this.$router.push({ path: "/home" });
    },
    isHiddingCounter() {
      this.counter = 20;
      this.hideCounter = true;
      this.startCounter(false);
    },
    computeCounter(val) {
      if (val > 15) return "green--text";
      if (val > 10) return "yellow--text";
      if (val > 5) return "orange--text";
      if (val >= 0) return "red--text";
    },
    startCounter(toggle) {
      if (toggle) {
        let i = 20;
        const countdown = () => {
          if (i > 0) {
            i--;
            this.counter--;
            setTimeout(countdown, 1000);
          }
          if (this.counter === 0) {
            this.gameOver();
          }
        };
        countdown();
      }
    },
    gameOver() {
      this.isGameOver = true;
      Services.saveQuestion(this.question).then(() => {});
    },
    getHasPlayedToday() {
      this.loadingTrivia = true;
      Services.getHasPlayedToday()
        .then((res) => {
          this.loadingTrivia = false;
          this.hasPlayedToday = res;
        })
        .catch((err) => {
          this.loadingTrivia = false;
          console.log(err);
        });
    },
    goToStart() {
      this.$router.push({ path: "/trivia" });
    },
    async getQuestion() {
      this.loadingTrivia = true;
      await Services.getQuestion()
        .then((res) => {
          this.question = res;
          this.loadingTrivia = false;
          this.startCounter(true);
        })
        .catch((err) => {
          console.log(err);
          this.loadingTrivia = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

#counter {
  background: #303030;
  width: 100%;
  margin: 0 auto;
  padding: 0 auto;
}

#triviaGame-title {
  background: $gradient_1;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

#triviaQuestions-comp {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#trivia-divider {
  border-radius: 10px;
  height: 2px;
  width: 100%;
  margin-block: 2em;
  background: $gradient_1;
}
</style>

<template>
  <div id="triviaGame-view">
    <!-- Instructions -->
    <div v-if="showInstruction" class="d-flex justify-center mt-10">
      <v-row class="d-flex justify-center">
        <v-col cols="12" lg="4" sm="12">
          <v-card color="primary" width="100%" height="100%" class="pa-5 mx-auto">
            <v-card-title class="justify-center white--text d-flex"
              ><h2 class="text-h5">iMovies Trivial</h2>
              <span class="ml-2"><small>(Beta)</small></span>
            </v-card-title>
            <v-divider class="white"></v-divider>
            <v-card-subtitle class="text-h5 text-center white--text"
              >{{ $t('view-trivia.instructions0') }}</v-card-subtitle
            >
            <v-card-text class="text-justify white--text">
              <div class="instructions" v-if="cardCounter === 1">
              {{ $t('view-trivia.instructions1') }}
              </div>
              <div class="instructions" v-if="cardCounter === 2">
              {{ $t('view-trivia.instructions2') }}
                <span class="font-weight-bold"
                  >{{ $t('view-trivia.instructions3') }}</span
                >{{ $t('view-trivia.instructions4') }}
              </div>
              <div class="instructions" v-if="cardCounter === 3">
              {{ $t('view-trivia.instructions5') }}
              </div>
              <div class="instructions text-center" v-if="cardCounter === 4">
                {{ $t('view-trivia.instructions6') }} <br /><br />
                {{ $t('view-trivia.instructions7') }}
              </div>
            </v-card-text>
            <v-card-actions
              class="d-flex justify-space-between"
            >
              <v-btn @click="comeback" v-if="card1" color="secondary" tile
                >{{ $t('view-trivia.goback') }}</v-btn
              >
              <v-btn @click="backwardCard" v-else icon
                ><v-icon color="white" size="30"
                  >mdi-arrow-left-box</v-icon
                ></v-btn
              >
              <v-btn @click="forwardCard" v-if="cardCounter !== 4" icon
                ><v-icon color="white" size="30"
                  >mdi-arrow-right-box</v-icon
                ></v-btn
              >
              <v-btn
                class="gradient-background-1 white--text"
                width="150"
                v-if="playGameBtn"
                @click="playGame"
                >{{ $t('view-trivia.play') }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import TriviaQuestions from "../components/TriviaQuestions";
export default {
  data() {
    return {
      card1: true,
      cardCounter: 1,
      showInstruction: true,
      playGameBtn: false,
    };
  },
  components: {
    TriviaQuestions,
  },
  computed: {
    questionID() {
      return this.$store.getters.questionID;
    },
  },
  mounted() {
    // this.$store.dispatch("getAndProcessQuestions");
  },
  watch: {
    cardCounter(val) {
      if (val === 1) {
        this.card1 = true;
      } else {
        this.card1 = false;
      }
      if (val === 4) {
        this.playGameBtn = true;
      } else {
        this.playGameBtn = false;
      }
    },
  },
  methods: {
    backwardCard() {
      this.cardCounter--;
    },
    forwardCard() {
      this.cardCounter++;
    },
    comeback() {
      this.$router.push({ path: "/trivia" });
    },
    playGame() {
      this.showInstruction = false;
      setTimeout(() => {
        this.$router.push({ path: `/trivia/game/playGame` });
      }, 200);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.instructions {
  animation: fadeIn 0.5s ease-in-out;
}

#card-actions {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
}
</style>

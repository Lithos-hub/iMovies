<template>
  <div id="triviaGame-view">
    <!-- Instructions -->
    <div v-if="showInstruction" class="d-flex justify-center mt-10">
      <v-card color="primary" min-width="500" width="500" class="pa-5">
        <v-card-title class="text-h2 justify-center white--text"
          >iMovies Trivial</v-card-title
        >
        <v-divider class="white"></v-divider>
        <v-card-subtitle class="text-h5 text-center white--text"
          >Instrucciones</v-card-subtitle
        >
        <v-card-text class="text-justify white--text">
          <div class="instructions" v-if="cardCounter === 1">
            iMovies Trivial es un juego de preguntas sobre películas. Cada día
            se planteará una pregunta relacionada con alguna película, actor,
            personaje, lugar... y se te pedirá que contestes la pregunta. En
            caso de acertar, obtendrás una puntuación. En caso de fallar, la
            pregunta quedará bloqueada y no podrás jugar hasta que haya pasado
            un día, así que ¡piensa bien antes la respuesta!
          </div>
          <div class="instructions" v-if="cardCounter === 2">
            Habrá diferentes tipos de preguntas y de respuestas. En algunos
            casos serán de tipo test, en otras tendrás que escribir o rellenar,
            en algunas se mostrará una imagen y en otras deberás arrastrar
            elementos al lugar correcto
          </div>
          <div class="instructions" v-if="cardCounter === 3">
            Cada cierto número de puntos, obtendrás una recompensa, ya sea en
            forma de avatares o en forma de insignias coleccionables.
          </div>
          <div class="instructions text-center" v-if="cardCounter === 4">
            ¡Pulsa el botón de "Jugar" para empezar!
          </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between">
          <v-btn @click="comeback" v-if="card1" color="secondary" tile
            >Volver atrás</v-btn
          >
          <v-btn @click="backwardCard" v-else icon
            ><v-icon color="white" size="30">mdi-arrow-left-box</v-icon></v-btn
          >
          <v-btn @click="forwardCard" v-if="cardCounter !== 4" icon
            ><v-icon color="white" size="30">mdi-arrow-right-box</v-icon></v-btn
          >
          <v-btn
            class="gradient-background-1 white--text"
            width="150"
            v-if="playGameBtn"
            @click="playGame"
            >Jugar</v-btn
          >
        </v-card-actions>
      </v-card>
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
        const firstQuestion = 1;
        this.$router.push({ path: `/trivia/game/${firstQuestion}` });
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
</style>

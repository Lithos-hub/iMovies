<template>
  <div>
    <div class="secondary-background"></div>
    <div class="trivia-background">
      <v-row no-gutters>
        <v-col
          v-for="(item, i) in triviaMoviesBackground"
          :key="i"
          class="fadeIn"
        >
          <div :class="`trivia-img trivia-background-img-${i}`" />
        </v-col>
      </v-row>
    </div>
    <div class="centered" id="start-button-wrapper">
      <v-btn
        id="start-button"
        tile
        class="d-block my-5 gradient-background-1 white--text"
        width="200"
        height="70"
        @click="playGame"
        >Jugar</v-btn
      >
    </div>
  </div>
</template>

<script>
// import Utils from "../utils/genQuestions";
import Services from "../services/services";
import { mapState } from "vuex";

export default {
  data() {
    return {
      hasPlayedBefore: false,
    };
  },
  computed: {
    ...mapState(["triviaMoviesBackground", "imageURL", "no_image"]),
  },
  created() {
    this.getResolvedQuestions();
    this.$store.dispatch("getRandomMovies");
    setTimeout(() => {
      this.paintImages();
    }, 1000);
  },
  mounted() {
    setTimeout(() => {
      this.randomizeImages();
    }, 2000);
  },
  methods: {
    // ! ******** To generate the questions in firebase ******** ! //
    // async genQuestions() {
    //   const questions = await Utils.genQuestions();
    //   questions.forEach((question, index) => {
    //     db.collection("TriviaV2")
    //       .doc(`triviadoc-${index}`)
    //       .set({
    //         id: index,
    //         incorrect_answers: question.incorrect_answers,
    //         correct_answer: question.correct_answer,
    //         question: question.question,
    //       })
    //       .then(() => {
    //         console.log("Document successfully written!");
    //       })
    //       .catch((error) => {
    //         console.error("Error writing document: ", error);
    //       });
    //   });
    // },
    paintImages() {
      let triviaImages = this.triviaMoviesBackground;

      triviaImages.forEach((movie, index) => {
        let imageHTML = document.querySelector(
          ".trivia-background-img-" + index
        );
        imageHTML.style.margin = '0';
        imageHTML.style.padding = '0';
        imageHTML.style.backgroundImage = `url(${
          this.imageURL + movie.poster_path
        })`;
      });
    },
    getRandomPosition(length) {
      return Math.floor(Math.random() * length);
    },
    randomizeImages() {
      let triviaImages = this.triviaMoviesBackground;
      let i = 0;
      const SPEED = 2000;
      const exchangeImages = () => {
        if (i <= triviaImages.length) {
          let randomPosition1 = this.getRandomPosition(triviaImages.length);
          let randomPosition2 = this.getRandomPosition(triviaImages.length);
          let imageHTML1 = document.querySelector(
            ".trivia-background-img-" + randomPosition1
          );
          let imageHTML2 = document.querySelector(
            ".trivia-background-img-" + randomPosition2
          );
          // ? IMAGE 1
          imageHTML1.style.transition = "all 1s ease";
          setTimeout(() => {
            imageHTML1.style.backgroundImage = `url(${
              this.imageURL + triviaImages[randomPosition2].poster_path
            })`;
          }, 1000);

          // ? IMAGE 2
          imageHTML2.style.transition = "all 1s ease";
          setTimeout(() => {
            imageHTML2.style.backgroundImage = `url(${
              this.imageURL + triviaImages[randomPosition1].poster_path
            })`;
          }, 1000);
          // imageHTML2.style.animation = "fadeIn 1s ease-out";
          i++;
          setTimeout(exchangeImages, SPEED);
        }
      };
      exchangeImages();
    },
    getResolvedQuestions() {
      Services.getResolvedQuestions()
        .then((res) => {
          this.hasPlayedBefore = res.length > 0;
          if (this.hasPlayedBefore) console.log("Has played before");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    playGame() {
      this.hasPlayedBefore
        ? this.$router.push("/trivia/game/playGame")
        : this.$router.push("/trivia/game/instructions");
    },
  },
};
</script>

<style lang="scss" scoped>
.trivia-background {
  position: fixed;
  top: 47px;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  animation: highFadeIn 5s ease-in;
  div, .col {
    margin: 0;
    padding: 0;
  }
}

.secondary-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1515158a;
  /* opacity: 0.5; */
  backdrop-filter: blur(1.5px);
  z-index: 1;
}

#start-button-wrapper {
  z-index: 3;
}

#start-button {
  box-shadow: 0px 0px 15px black, 0px 0px 25px #151515, 0px 0px 40px #303030;

  &:hover {
    background: #151515;
    color: cyan !important;
    box-shadow: 0px 0px 5px white, 0px 0px 15px cyan, 0px 0px 30px blue;
  }
}

.trivia-img, .col {
  width: 100%;
  min-width: 250px;
  height: 100%;
  min-height: 350px;
  padding: 0 auto;
  margin: 0 auto;
  z-index: 9999;
  background-size: cover;
  background-repeat: no-repeat;
}

@keyframes highFadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  70% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>

<template>
  <v-app class="app">
    <RewardNotification
      :class="rewardObject.notification ? 'to-bottom' : 'd-none'"
      id="reward-notification"
    />
    <Navbar
      id="navbar"
      v-if="
        !isLoading &&
        this.$route.path !== '/404' &&
        this.$route.path !== '/' &&
        this.$route.path !== '/register'
      "
    />
    <Chat
      v-if="chatIsActivated && correctPath"
      id="chat"
      :class="minimized ? 'minimized-card' : 'maximized-card'"
      @minimize-chat="minimizeChat"
    />
    <v-progress-circular
      v-if="loadingUserAuthStatus"
      class="centered"
      :size="100"
      color="#303030"
      indeterminate
    ></v-progress-circular>
    <v-main class="main-content" v-else>
      <router-view @refresh="getUserData" class="routerview"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Navbar from "./components/Navbar";
import Chat from "./components/Chat";
import RewardNotification from "./components/RewardNotification";
import LoadingData from "./components/LoadingData";
import router from "./router/index";
import { auth, db } from "./../firebase.js";

export default {
  components: {
    Navbar,
    RewardNotification,
    LoadingData,
    Chat,
  },
  data() {
    return {
      isLoading: true,
      minimized: false,
    };
  },
  watch: {
    $route(to) {
      if (to.path !== "/" && to.path !== "/register") {
        this.getUserData();
        const MY_FS_DOC = localStorage.getItem("docID");
        if (MY_FS_DOC) {
          this.$store.commit("setDocID", MY_FS_DOC);
        } else {
          this.getMyDocID();
        }
        let userData = this.$store.getters.userData;
        if (to.path !== "/" && !userData) {
          router.push("/");
        }
      }
      window.scrollTo(0, 0);
    },
    showingFriends(val) {
      if (val) this.$store.dispatch("getMessages");
    },
  },
  computed: {
    ...mapState([
      "loadingUserAuthStatus",
      "moviesCounter",
      "userPoints",
      "rewardObject",
      "moviesCounter",
      "chatIsActivated",
      "notifications",
    ]),
    correctPath() {
      return (
        this.$route.path !== "/" &&
        this.$route.path !== "/404" &&
        this.$route.path !== "/register"
      );
    },
  },
  created() {
    this.getUserData();
    this.$nextTick().then(() => {
      const MY_FS_DOC = localStorage.getItem("docID");
      if (MY_FS_DOC) {
        this.$store.commit("setDocID", MY_FS_DOC);
        console.log("My Firestore Doc ID: ", this.$store.getters.myDocID);
      } else {
        this.getMyDocID();
      }
    });
  },
  async mounted() {
    // this.pushRewardsToFirebase()
    this.getCurrentDate();
    await this.$store.dispatch("getUserPoints");
    await this.$store.dispatch("getStoragedMovies");
    await this.$store.dispatch("getVisitedSections");
    await this.$store.dispatch("getGettedAchievements", lang);
    const lang = localStorage.getItem("storageLanguage").substring(4, 6);
    console.log(lang);
  },
  watch: {
    rewardObject(val) {
      if (val.notification) {
        const notification = document.querySelector("#reward-notification");
        notification.style.opacity = 0;
        notification.style.transition = "opacity 1s ease-out";
        notification.style.opacity = 1;

        setTimeout(() => {
          notification.style.transition = "all 1s ease-out";
          notification.style.opacity = 0;
        }, 5000);
        setTimeout(() => {
          notification.classList.add("d-none");
          notification.classList.remove("to-bottom");
        }, 6000);
      }
    },
  },
  methods: {
    ...mapActions(["changeLanguage", "getUserID", "showingFriends"]),
    minimizeChat(bool) {
      this.minimized = bool;
    },
    // async pushRewardsToFirebase() {
    //   await db.doc(`Achievements/EN`).set({
    //     list: [
    //       {
    //         title: "Cinemaniac",
    //         code: 1,
    //         description:
    //           "You got 50 trivia questions in a row right without failing.",
    //         className: "epic",
    //         image: "achieve-epic.png",
    //       },
    //       {
    //         title: "Kubrickian",
    //         code: 2,
    //         description:
    //           "You got 100 trivia questions in a row right without failing.",
    //         className: "epic",
    //         image: "achieve-epic.png",
    //       },
    //       {
    //         title: "director",
    //         code: 3,
    //         description:
    //           "You got 200 trivia questions in a row right without failing.",
    //         className: "epic",
    //         image: "achieve-epic.png",
    //       },
    //       {
    //         title: "The Fourth Wall",
    //         code: 4,
    //         description:
    //           "You got 300 trivia questions in a row right without failing.",
    //         className: "epic",
    //         image: "achieve-epic.png",
    //       },
    //       {
    //         title: "Number 1",
    //         code: 5,
    //         description:
    //           "You got all the trivia questions right without failing.",
    //         className: "epic",
    //         image: "achieve-epic.png",
    //       },
    //       {
    //         title: "Jedi Master",
    //         code: 6,
    //         description:
    //           "You have marked all the movies in the Star Wars saga as favorites.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "Montaraz",
    //         code: 7,
    //         description:
    //           "You have marked all the Lord of the Rings and The Hobbit movies as favorites.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "The Boy Who Survived",
    //         code: 8,
    //         description:
    //           "You have marked all the movies in the Harry Potter saga as favorites.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "Like tears in the rain",
    //         code: 9,
    //         description:
    //           "You have bookmarked the movie Blade Runner (1982) as a favorite.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "The Cruel Tutelage of Pai Mei",
    //         code: 10,
    //         description:
    //           "You have marked the movies Kill Bill Vol. 1 and 2 as favorites.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "Not personal Tom, just business",
    //         code: 11,
    //         description: "You have marked The Godfather movie as a favorite.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "'Guns. Lots of guns.'",
    //         code: 12,
    //         description: "You have saved 50 action movies.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "The Black Pearl",
    //         code: 13,
    //         description: "You have saved 50 adventure movies.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "There's a friend in me",
    //         code: 14,
    //         description: "You have saved 50 animation movies.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "Land as hard as you can",
    //         code: 15,
    //         description: "You have saved 50 comedy movies.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "hound",
    //         code: 16,
    //         description: "You have saved 50 crime movies.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "Little pale blue dot",
    //         code: 17,
    //         description: "You have saved 50 documentary films.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "A marvelous mind",
    //         code: 18,
    //         description: "You have saved 50 drama movies.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "Lumos!",
    //         code: 19,
    //         description: "You have saved 50 fantasy movies.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "On my signal, wrath and fire",
    //         code: 20,
    //         description: "You have saved 50 story movies.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //        {
    //         title: "They're here",
    //         code: 21,
    //         description: "You have saved 50 horror movies.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "The Show Must Go On",
    //         code: 22,
    //         description: "You have saved 50 musical movies.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "I'm the king of the world!",
    //         code: 23,
    //         description: "You have saved 50 romance movies.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "Skynet",
    //         code: 24,
    //         description: "You have saved 50 sci-fi movies.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "The Game",
    //         code: 25,
    //         description: "You have saved 50 thrillers.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "Black Hawk Down",
    //         code: 26,
    //         description: "You have saved 50 war movies.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "For a fistful of dollars",
    //         code: 27,
    //         description: "You have saved 50 western movies.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "welcome",
    //         code: 28,
    //         description: "You have saved a movie.",
    //         className: "common",
    //         image: "achieve-common.png",
    //       },
    //       {
    //         title: "Good beginnings",
    //         code: 29,
    //         description: "You got a trivia question right.",
    //         className: "common",
    //         image: "achieve-common.png",
    //       },
    //       {
    //         title: "A little change",
    //         code: 30,
    //         description: "You have changed your avatar.",
    //         className: "common",
    //         image: "achieve-common.png",
    //       },
    //       {
    //         title: "explorer",
    //         code: 31,
    //         description: "You have visited all sections of iMovies.",
    //         className: "common",
    //         image: "achieve-common.png",
    //       },
    //       {
    //         title: "Deborapalomitas",
    //         code: 32,
    //         description: "You have seen more than 50 movies",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "Light, camera and action!",
    //         code: 33,
    //         description: "You got 20 right on Trivia!",
    //         className: "common",
    //         image: "achieve-common.png",
    //       },
    //       {
    //         title: "Hooked",
    //         code: 34,
    //         description: "You have used iMovies for one month.",
    //         className: "common",
    //         image: "achieve-common.png",
    //       },
    //       {
    //         title: "moviegoer",
    //         code: 35,
    //         description: "You got 100 questions right on Trivia.",
    //         className: "common",
    //         image: "achieve-common.png",
    //       },
    //       {
    //         title: "8mm",
    //         code: 36,
    //         description: "You got 200 questions right in Trivia.",
    //         className: "common",
    //         image: "achieve-common.png",
    //       },
    //       {
    //         title: "404",
    //         code: 37,
    //         description: "You have encountered error 404.",
    //         className: "common",
    //         image: "achieve-common.png",
    //       },
    //       {
    //         title: "In love with movies",
    //         code: 38,
    //         description: "You have marked 50 movies as favorites.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "You have saved 50 movies to your wish list",
    //         code: 39,
    //         description: "You have saved to your wish list 50 movies.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "The prompter.",
    //         code: 40,
    //         description: "You have scored 50 movies.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //     ]
    //   })
    //   await db.doc(`Achievements/ES`).set({
    //     list: [
    //       {
    //         title: "Cinemaníaco",
    //         code: 1,
    //         description:
    //           "Has acertado 50 preguntas seguidas del Trivial sin fallar.",
    //         className: "epic",
    //         image: "achieve-epic.png",
    //       },
    //       {
    //         title: "Kubrickiano",
    //         code: 2,
    //         description:
    //           "Has acertado 100 preguntas seguidas del Trivial sin fallar.",
    //         className: "epic",
    //         image: "achieve-epic.png",
    //       },
    //       {
    //         title: "Director",
    //         code: 3,
    //         description:
    //           "Has acertado 200 preguntas seguidas del Trivial sin fallar.",
    //         className: "epic",
    //         image: "achieve-epic.png",
    //       },
    //       {
    //         title: "La Cuarta Pared",
    //         code: 4,
    //         description:
    //           "Has acertado 300 preguntas seguidas del Trivial sin fallar.",
    //         className: "epic",
    //         image: "achieve-epic.png",
    //       },
    //       {
    //         title: "Número 1",
    //         code: 5,
    //         description:
    //           "Has acertado todas las preguntas del Trivial sin fallar.",
    //         className: "epic",
    //         image: "achieve-epic.png",
    //       },
    //       {
    //         title: "Maestro Jedi",
    //         code: 6,
    //         description:
    //           "Has marcado como favoritas todas las películas de la saga Star Wars.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "Montaraz",
    //         code: 7,
    //         description:
    //           "Has marcado como favoritas todas las películas de El Señor de los Anillos y El Hobbit.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "El niño que sobrevivió",
    //         code: 8,
    //         description:
    //           "Has marcado como favoritas todas las películas de la saga Harry Potter.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "Como lágrimas en la lluvia",
    //         code: 9,
    //         description:
    //           "Has marcado como favorita la pelicula Blade Runner (1982).",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "La Cruel Tutela de Pai Mei",
    //         code: 10,
    //         description:
    //           "Has marcado como favoritas las peliculas Kill Bill Vol. 1 y 2.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "No es personal Tom, solo negocios",
    //         code: 11,
    //         description: "Has marcado como favorita la película El Padrino.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "'Armas. Muchas armas.'",
    //         code: 12,
    //         description: "Has guardado 50 películas de acción.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "La Perla Negra",
    //         code: 13,
    //         description: "Has guardado 50 películas de aventuras.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "Hay un amigo en mí",
    //         code: 14,
    //         description: "Has guardado 50 películas de animación.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "Aterriza como puedas",
    //         code: 15,
    //         description: "Has guardado 50 películas de comedia.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "Sabueso",
    //         code: 16,
    //         description: "Has guardado 50 películas de crimen.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "Pequeño punto azul pálido",
    //         code: 17,
    //         description: "Has guardado 50 películas de documental.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "Una mente maravillosa",
    //         code: 18,
    //         description: "Has guardado 50 películas de drama.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "¡Lumos!",
    //         code: 19,
    //         description: "Has guardado 50 películas de fantasía.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "A mi señal, ira y fuego",
    //         code: 20,
    //         description: "Has guardado 50 películas de historia.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "Ya están aquí",
    //         code: 21,
    //         description: "Has guardado 50 películas de terror.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "The Show Must Go On",
    //         code: 22,
    //         description: "Has guardado 50 películas de musical.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "¡Soy el rey del mundo!",
    //         code: 23,
    //         description: "Has guardado 50 películas de romance.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "Skynet",
    //         code: 24,
    //         description: "Has guardado 50 películas de ciencia ficción.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "The Game",
    //         code: 25,
    //         description: "Has guardado 50 películas de suspense.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "Black Hawk Derribado",
    //         code: 26,
    //         description: "Has guardado 50 películas de bélico.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "Por un puñado de dolares",
    //         code: 27,
    //         description: "Has guardado 50 películas de western.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "Bienvenido",
    //         code: 28,
    //         description: "Has guardado una película.",
    //         className: "common",
    //         image: "achieve-common.png",
    //       },
    //       {
    //         title: "Buenos inicios",
    //         code: 29,
    //         description: "Has acertado una pregunta en el Trivial.",
    //         className: "common",
    //         image: "achieve-common.png",
    //       },
    //       {
    //         title: "Un pequeño cambio",
    //         code: 30,
    //         description: "Has cambiado de avatar.",
    //         className: "common",
    //         image: "achieve-common.png",
    //       },
    //       {
    //         title: "Explorador",
    //         code: 31,
    //         description: "Has visitado todas las secciones de iMovies.",
    //         className: "common",
    //         image: "achieve-common.png",
    //       },
    //       {
    //         title: "Deborapalomitas",
    //         code: 32,
    //         description: "Has visto más de 50 películas",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "Luz, cámara y ¡acción!",
    //         code: 33,
    //         description: "Has acertado 20 en el Trivial.",
    //         className: "common",
    //         image: "achieve-common.png",
    //       },
    //       {
    //         title: "Enganchado",
    //         code: 34,
    //         description: "Has usado iMovies durante un mes.",
    //         className: "common",
    //         image: "achieve-common.png",
    //       },
    //       {
    //         title: "Cinéfilo",
    //         code: 35,
    //         description: "Has acertado 100 preguntas en el Trivial.",
    //         className: "common",
    //         image: "achieve-common.png",
    //       },
    //       {
    //         title: "8mm",
    //         code: 36,
    //         description: "Has acertado 200 preguntas en el Trivial.",
    //         className: "common",
    //         image: "achieve-common.png",
    //       },
    //       {
    //         title: "404",
    //         code: 37,
    //         description: "Has dado con el error 404.",
    //         className: "common",
    //         image: "achieve-common.png",
    //       },
    //       {
    //         title: "Enamorado del cine",
    //         code: 38,
    //         description: "Has marcado como favoritas 50 películas.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "Has guardado en tu lista de deseos 50 películas",
    //         code: 39,
    //         description: "Has guardado en tu lista de deseos 50 películas.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //       {
    //         title: "El apuntador.",
    //         code: 40,
    //         description: "Has puntuado 50 películas.",
    //         className: "rare",
    //         image: "achieve-rare.png",
    //       },
    //     ],
    //   });
    // },
    getCurrentDate() {
      let date = new Date();
      let currentDate = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;
      this.$store.commit("setCurrentDate", currentDate);
    },
    async getUserData() {
      await auth.onAuthStateChanged((user) => {
        if (user) {
          this.$store.commit("setUser", user);
          this.$store.dispatch("getMyDocID");
          this.getCurrentDate();
          this.$nextTick().then(() => {
            this.$store.dispatch("getFriendshipNotification");
            this.$store.dispatch("getMySocialData");
            this.isLoading = false;
          });
        }
      });
    },
    async getMyDocID() {
      const COLLECTION = await db.collection("userData").get();
      const USERDATA = this.$store.getters.userData;
      COLLECTION.forEach((doc) => {
        if (doc.data().userID === USERDATA.uid) {
          this.$store.commit("setDocID", doc.data().docID);
          localStorage.setItem("docID", doc.data().docID);
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "src/scss/variables";
@import "src/scss/app";

body {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.main-content {
  background: $dark2 !important;
  color: white;
  font-family: $style1 !important;
  height: 100%;
  padding-bottom: 5em;
  min-height: 100%;
  width: auto;
  margin-bottom: 2em;
}

.v-snack__wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 0 auto;
  min-width: 100% !important;
  border-radius: 0 !important;
}

// Scroll Bar

/* width */
#chat {
  ::-webkit-scrollbar {
    width: 0px;
  }
}
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: $dark2;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: $primary;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(255, 255, 255);
}

#chat {
  position: fixed;
  bottom: 0.5em;
  right: 0.5em;
  min-height: 500px;
  width: auto;
  z-index: 99999999;
  justify-content: flex-end;
  transition: all 0.2s ease-out;
}

.minimized-card {
  min-height: 40px !important;
  max-height: 40px !important;
}

.maximized-card {
  height: 400px;
}
// // ******* MOBILE RESPONSIVE ******* //
// @media only screen and (min-width: 360px) {
//   .main-content {
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: $dark2 !important;
//   color: white;
//   font-family: $style1 !important;
// }

//   .routerview {
//     position: relative;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     margin: 0 auto;
//   }
// }

// // ******* LAPTOP RESPONSIVE ******* //
// @media only screen and (min-width: 1366px) {
//   .main-content {
//   overflow-y: scroll;
//   overflow-x: hidden;
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: $dark2 !important;
//   color: white;
//   font-family: $style1 !important;
// }

//   .routerview {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     margin: 0 auto;
//   }
// }

// // ******* DESKTOP RESPONSIVE ******* //
// @media only screen and (min-width: 1920px) {
//   .main-content {
//   overflow-y: scroll;
//   overflow-x: hidden;
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: $dark2 !important;
//   color: white;
//   font-family: $style1 !important;
// }

//   .routerview {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     margin: 0 auto;
//   }
// }
</style>

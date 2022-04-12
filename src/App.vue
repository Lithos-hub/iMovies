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
import RewardNotification from "./components/RewardNotification";
import LoadingData from "./components/LoadingData";
import router from "./router/index";
import { auth, db } from "./../firebase.js";

export default {
  components: {
    Navbar,
    RewardNotification,
    LoadingData,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  watch: {
    $route(to) {
      if (to.path !== "/") {
        const MY_FS_DOC = localStorage.getItem("docID");
        if (MY_FS_DOC) {
          this.$store.commit("setDocID", MY_FS_DOC);
        } else {
          this.getMyDocID();
        }
        let userData = this.$store.getters.userData;
        this.$store.dispatch("checkAuth");
        if (to.path !== "/" && !userData) {
          router.push("/");
        }
      }
      window.scrollTo(0, 0);
    },
  },
  computed: {
    ...mapState([
      "loadingUserAuthStatus",
      "moviesCounter",
      "userPoints",
      "rewardObject",
    ]),
  },
  created() {
    this.getUserData();
    const MY_FS_DOC = localStorage.getItem("docID");
    if (MY_FS_DOC) {
      this.$store.commit("setDocID", MY_FS_DOC);
    } else {
      this.getMyDocID();
    }
    console.log("My Firestore Doc ID: ", this.$store.getters.myDocumentID);
  },
  mounted() {
    // this.pushRewardsToFirebase()
    this.getCurrentDate();
    this.$store.dispatch("getUserPoints");
    this.$store.dispatch("getGettedAchievements");
    this.$store.dispatch("getStoragedMovies");
    this.$store.dispatch("getVisitedSections");
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
    ...mapActions(["changeLanguage", "getUserID"]),
    // async pushRewardsToFirebase() {
    //   await db.doc(`Achievements/AllAchievements`).set({
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
      // });
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
          this.isLoading = false;
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
</style>

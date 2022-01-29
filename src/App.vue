<template>
  <v-app class="app">
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
import LoadingData from "./components/LoadingData";
import router from "./router/index";
import { auth, db } from "./../firebase.js";

export default {
  components: {
    Navbar,
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
        this.$store.dispatch("checkAuth");
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
  },
  methods: {
    ...mapActions(["changeLanguage", "getUserID", "showingFriends"]),
    minimizeChat(bool) {
      this.minimized = bool;
    },
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
            console.log(
              "My Firestore Doc ID: ",
              this.$store.getters.myDocID
            );
            this.isLoading = false;
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "src/scss/variables";

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
  min-width: 550px;
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

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
import LoadingData from "./components/LoadingData";
import router from "./router/index";
import { auth } from "./../firebase.js";

export default {
  components: {
    Navbar,
    LoadingData
  },
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    if (router.path !== "/") {
      this.getUserData();
    }
  },
  watch: {
    $route(to) {
      if (to.path !== "/") {
        this.getUserData();
        this.$store.dispatch("checkAuth");
      }
      let userData = JSON.parse(localStorage.getItem("user"));
      userData.userName === "defaultUser"
        ? this.$store.commit("setDefault", true)
        : this.$store.commit("setDefault", false);
      if (to.path !== "/" && !userData) {
        router.push("/");
      }
      window.scrollTo(0, 0);
    },
  },
  computed: {
    ...mapState(['loadingUserAuthStatus'])
  },
  methods: {
    ...mapActions(["changeLanguage", "getUserID"]),
    getUserData() {
      auth
      .onAuthStateChanged(user => {
        if (user) {
          this.$store.commit("setUser", user);
        }
      })
      // let userData = JSON.parse(localStorage.getItem("user"));
      // if (userData.userName === "defaultUser") {
      //   this.user = userData
      // } else {
      //   const user = auth.currentUser;
      //   db.collection("userData")
      //     .get((snapshot) => {
      //       const MATCH = snapshot.find((doc) => doc.data().uid === user.uid);
      //       console.log(MATCH);
      //     })
      //     .catch((e) => console.log(e));
      // }
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
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
  margin: 0;
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

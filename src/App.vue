<template>
  <v-app class="app">
    <RewardNotification id="reward-notification" class="d-none" />
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
    LoadingData
  },
  data() {
    return {
      isLoading: true,
      hasNotification: false,
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
    userPoints(points) {
      console.log("My user points", points);
    },
    moviesCounter(count) {
      console.log("My movies counter: ", count);
      // ! Stages to get avatars and badges
      // ? const FIRST_STAGE = 1
      // ? const SECOND_STAGE = 25
      // ? const THIRD_STAGE = 50
      // ? const FOURTH_STAGE = 100
      // ? const FIFTH_STAGE = 200
      // ? const SIXTH_STAGE = 300
      // ? const SEVENTH_STAGE = 500
      // ? const EIGHTH_STAGE = 750
      // ? const NINTH_STAGE = 1000
      // TODO: Continue
      const addRewardByStage = (stage) => {};

      const STAGES_AND_ACTIONS = {
        1: addRewardByStage("first"),
        25: addRewardByStage("second"),
        50: addRewardByStage("third"),
        100: addRewardByStage("fourth"),
        200: addRewardByStage("fifth"),
        300: addRewardByStage("sixth"),
        500: addRewardByStage("seventh"),
        750: addRewardByStage("eighth"),
        1000: addRewardByStage("ninth"),
      };
      STAGES_AND_ACTIONS[count];
    },
  },
  computed: {
    ...mapState(["loadingUserAuthStatus", "moviesCounter", "userPoints"]),
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
    this.getCurrentDate();
    this.$store.dispatch("getUserPoints");
  },
  methods: {
    ...mapActions(["changeLanguage", "getUserID"]),
    triggerNotification () {
      const notification = document.querySelector('#reward-notification');
      notification.style.opacity = 0;
      notification.classList.remove('d-none');
      notification.classList.add('to-bottom');
      notification.style.transition = 'opacity 1s ease-out';
      notification.style.opacity = 1;

      setTimeout(() => {
        notification.style.transition = 'all 1s ease-out';
        notification.style.opacity = 0;
      }, 5000)
      setTimeout(() => {
        notification.classList.add('d-none');
        notification.classList.remove('to-bottom');
      }, 6000)
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

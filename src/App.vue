<template>
  <v-app class="app">
    <Navbar
    :user-data="user"
      id="navbar"
      v-if="
        this.$route.path !== '/404' &&
        this.$route.path !== '/' &&
        this.$route.path !== '/register'
      "
    />

    <v-main class="main-content">
      <router-view @refresh="refreshData" class="routerview"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import Navbar from "./components/Navbar";

export default {
  components: {
    Navbar,
  },
  data () {
    return {
      user: {}
    }
  },
  created() {
    window.scrollTo(0, 0);
    this.getData();
    this.getUserID();
  },
  methods: {
    ...mapActions(['changeLanguage', 'getUserID']),
    getData() {
      const userData = JSON.parse(localStorage.getItem("storageUserDATA")) || [];
      const userID = JSON.parse(localStorage.getItem("USERID"));
      this.user = userData[userID.id]
      userData ? this.$store.commit("setUser", userData[userID.id]) : this.$store.commit("setDefault", true);
      this.$store.commit("saveUserData", userData[userID.id])
    },
    refreshData() {
      this.getData();
    }
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

// .app {
//   background: $dark2;
//   animation: fadeIn 2s ease-in-out;
// }

// @keyframes fadeIn {
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// }
</style>

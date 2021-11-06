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
import { mapActions, mapState } from "vuex";
import Navbar from "./components/Navbar";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.getData();
    this.getUserID();
  },
  mounted() {
    if (this.$router.path === '/home') {
      this.getData()
    }
  },
  watch: {
    $route (to) {
      if (to.path === '/home') {
        this.getData()
      }
      window.scrollTo(0, 0);
    }
  },
  computed: {
    ...mapState(['isDefault'])
  },
  methods: {
    ...mapActions(["changeLanguage", "getUserID"]),
    getData() {
      const isDefault = JSON.parse(localStorage.getItem("isDefault")) || {};
      this.$store.commit("setDefault", isDefault.isDefault);
      if (!this.isDefault) {
        const userData =
          JSON.parse(localStorage.getItem("storageUserDATA")) || [];
        const userID = JSON.parse(localStorage.getItem("USERID"));
        this.user = userData[userID.id];
        this.$store.commit("setUser", userData[userID.id])
        this.$store.commit("saveUserData", userData[userID.id]);
      } else {
        const userData = {
        userName: 'defaultUser',
        userEmail: 'example@example.com',
        userAvatar: require('@/assets/img/background0.jpg'),
        userPassword: 'defaultUser',
        wishListMovies: null,
        watchedMovies: null,
        favouriteMovies: null,
        ratedMovies: null,
      };
      this.user = userData;
      this.$store.commit("setUser", userData);
      this.$store.commit("setDefault", true);
      }
    },
    refreshData() {
      this.getData();
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

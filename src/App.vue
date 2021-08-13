<template>
  <v-app class="app">
    <Navbar id="navbar" v-if="this.$route.path != '/404' && this.$route.path != '/' && this.$route.path != '/register'" />

    <v-main class="main-content">
      <router-view class="routerview"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",

  components: {
    Navbar,
  },
  data() {
    return {};
  },
  mounted() {
      this.getData();
  },
  methods: {
    getData() {
      const userData = JSON.parse(localStorage.getItem("storageUserDATA")) || [];
      const userID = JSON.parse(localStorage.getItem("USERID"));

      if(userData) {
        for (let user of userData) {
          if(user.id === userID.id) {
            this.$store.commit("setUser", user);
          }
        }
      }

    },
  },
};
</script>

<style lang="scss">
@import "src/scss/variables";

body {
  background: $dark2;
}

.main-content {
  background: $dark2 !important;
  color: white;
  font-family: $style1 !important;
  height: auto;
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

.app {
  animation: fadeIn 2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

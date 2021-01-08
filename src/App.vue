<template>
  <v-app class="app">
    <Navbar id="navbar" />

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
  methods: {
    getData() {
      localStorage.getItem("storageToWatchMovies");
      localStorage.getItem("storageWatchedMovies");
      localStorage.getItem("storageFavoriteMovies");
      localStorage.getItem("storageRatedMovies");
      localStorage.getItem("storageRating");
    },
  },
  mounted() {
    this.getData();
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

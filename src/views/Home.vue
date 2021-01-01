<template>
  <div class="container-fluid">
    <div class="container mt-15">
      <h1 id="title">
        Latest<br />
        releases<br />
      </h1>
    </div>
    <div class="horizontal-scroll-wrapper squares">
      <div v-for="(item, i) in currently" :key="i">
        <v-sheet height="200%" width="100%" class="sheet">
          <router-link :to="`/movie/${item.id}`">
            <img
              id="movie-img"
              :src="url + item.poster_path"
              class="hover-img rounded"
              max-width="100%"
              height="80%"
            />
          </router-link>
        </v-sheet>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Ranking",
  components: {},
  data() {
    return {
      url: "https://image.tmdb.org/t/p/original",    };
  },
  computed: {
    ...mapState(["currently"]),
  },
  methods: {
    ...mapActions(["getCurrentlyMovies"]),
  },
  created() {
    this.getCurrentlyMovies();
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  $finalHeight: 100%;
  $finalWidth: $finalHeight;
  $scrollBarHeight: 0px;

  ::-webkit-scrollbar {
    display: none !important;
  }

  ::-webkit-scrollbar-button {
    display: none !important;
  }

  html,
  body {
    overflow: hidden;
  }

  #title {
    margin: 0 auto;
    text-align: center;
    color: white;
    font-size: 5em;
    display: block;
    background-image: url("../assets/img/background1.jpg");
    filter: brightness(2);
    background-repeat: repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: 9;
  }

  .container {
    position: relative;
    left: 0px;
    top: -20px;
    width: 100%;
  }

  .sheet {
    padding:50px;
    background: $dark2 !important;
    z-index: 999;
  }

  #movie-img {
    width: 300px !important;
    height: 500px;
    margin: 0px;
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  $finalHeight: 100%;
  $finalWidth: $finalHeight;
  $scrollBarHeight: 0px;

  ::-webkit-scrollbar {
    display: none !important;
  }

  ::-webkit-scrollbar-button {
    display: none !important;
  }

  html,
  body {
    overflow: hidden;
  }

  #title {
    position: absolute;
    top: 25%;
    margin: 0 auto;
    color: white;
    font-size: 8em;
    text-align: left;
    background-image: url("../assets/img/background1.jpg");
    filter: brightness(2);
    background-repeat: repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: 0;
  }

  .container {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
  }

  .horizontal-scroll-wrapper {
    position: absolute;
    display: block;
    top: 0px;
    left: 40%;
    width: 800px;
    max-height: 0%;
    margin: 0;
    padding-top: $scrollBarHeight;
    overflow-y: scroll;
    overflow-x: hidden;
    transform: rotate(-90deg) translateY(-$finalHeight);
    transform-origin: right top;
    & > div {
      transform: rotate(90deg);
      transform-origin: right top;
    }
  }

  .squares {
    padding: $finalHeight 0 0 0;
    & > div {
      width: 100%;
      height: 400px;
      margin: 0 auto;
    }
  }

  .sheet {
    padding: 50px;
    background: $dark2 !important;
    z-index: 999;
  }

  #movie-img {
    width: 300px !important;
    height: 500px;
    margin: 0px;
  }

  .hover-img {
    transition: 0.5s;
  }

  .hover-img:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  $finalHeight: 100%;
  $finalWidth: $finalHeight;
  $scrollBarHeight: 0px;

  ::-webkit-scrollbar {
    display: none !important;
  }

  ::-webkit-scrollbar-button {
    display: none !important;
  }

  html,
  body {
    overflow: hidden;
  }

  #title {
    margin: 0 auto;
    color: white;
    font-size: 13em;
    text-align: left;
    display: block;
    background-image: url("../assets/img/background1.jpg");
    filter: brightness(2);
    background-repeat: repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
  }

  .container {
    position: absolute;
    left: 0px;
    top: -20px;
    width: 100%;
  }

  .horizontal-scroll-wrapper {
    position: absolute;
    display: block;
    top: 0px;
    left: 50%;
    width: 900px;
    max-height: 0%;
    margin: 0;
    padding-top: $scrollBarHeight;
    overflow-y: scroll;
    overflow-x: hidden;
    transform: rotate(-90deg) translateY(-$finalHeight);
    transform-origin: right top;
    & > div {
      transform: rotate(90deg);
      transform-origin: right top;
    }
  }

  .squares {
    padding: $finalHeight 0 0 0;
    & > div {
      width: 100%;
      height: 680px;
      margin: 0 auto;
    }
  }

  .sheet {
    padding: 50px;
    background: $dark2 !important;
    z-index: 999;
  }

  #movie-img {
    width: 550px !important;
    height: 850px;
    margin: 20px;
  }

  .hover-img {
    transition: 0.5s;
  }

  .hover-img:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
}
</style>

<template>
  <div class="container-fluid">
    <div class="container mt-15">
      <h1 id="title">
        {{ $t('view-home.latest')}} <br />
        {{ $t('view-home.releases')}}<br />
      </h1>
    </div>
    <div class="arrow-right">
      <v-icon color="cyan" size="80px">mdi-arrow-right</v-icon>
    </div>
    <div class="horizontal-scroll-wrapper squares" @scroll="hideArrowOnRight">
      <div v-for="(item, i) in current" :key="i">
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
      url: "https://image.tmdb.org/t/p/original",
    };
  },
  created() {
    this.getCurrentMovies(this.apikey);
  },
  mounted () {
    this.hideArrowOnRight();
  },
  computed: {
    ...mapState(["current", "apikey"]),
  },
  methods: {
    ...mapActions(["getCurrentMovies"]),
    hideArrowOnRight () {
      let arrow = document.querySelector('.arrow-right');
      let scroll = document.querySelector('.horizontal-scroll-wrapper');
      let scrollWidth = scroll.scrollHeight;
      let scrollY = scroll.scrollTop
      let clientWidth = scroll.clientHeight;
      arrow.style.transition = 'opacity 0.5s';
      if (scrollY + clientWidth >= scrollWidth) {
        arrow.style.opacity = '0';
      } else {
        arrow.style.opacity = '1';
      }
    }
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

  html,
  body {
    overflow: hidden;
  }

  .arrow-right {
    display: none;
  }

  #title {
    margin: 0 auto;
    text-align: center;
    color: white;
    font-size: 3em;
    display: block;
    background-image: url("../assets/img/background1.jpg");
    filter: brightness(2);
    background-repeat: repeat;
    background-clip: text;
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
    margin: 0 auto;
    text-align: center;
    background: $dark2 !important;
    z-index: 999;
  }

  #movie-img {
    width: 300px !important;
    height: 500px;
    margin-top: 20px;
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  ::-webkit-scrollbar {
    display: none !important;
  }

  ::-webkit-scrollbar-button {
    display: none !important;
  }

  $finalHeight: 100%;
  $finalWidth: $finalHeight;
  $scrollBarHeight: 0px;

  html,
  body {
    overflow: hidden;
  }

  .arrow-right {
    display: block;
    position: fixed;
    right: 2em;
    top: 50%;
    transform: translateY(-50%);
    animation: motionToRight 0.5s ease-in-out infinite alternate-reverse;
  }

  #title {
    text-align: left;
    position: fixed;
    top: 50%;
    left: 0;
    transform: translate(0%, -50%);
    font-size: 5em;
    background-image: url("../assets/img/background1.jpg");
    filter: brightness(2);
    background-repeat: repeat;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: 0;
  }

  .container {
    position: absolute;
    left: 0px;
    top: -20px;
  }

  .horizontal-scroll-wrapper {
    position: absolute;
    display: block;
    top: 20px;
    left: 40%;
    width: 680px;
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
      height: 100%;
      margin: 0 auto;
    }
  }

  .sheet {
    padding: 0px;
    background: $dark2 !important;
    z-index: 999;
  }

  #movie-img {
    width: 50% !important;
    height: 50%;
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
@media only screen and (min-width: 1200px) {
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

  .arrow-right {
    display: block;
    position: fixed;
    right: 2em;
    top: 50%;
    transform: translateY(-50%);
    animation: motionToRight 0.5s ease-in-out infinite alternate-reverse;
  }

  #title {
    text-align: left;
    position: fixed;
    top: 50%;
    left: 0;
    transform: translate(0%, -50%);
    font-size: 10em;
    background-image: url("../assets/img/background1.jpg");
    filter: brightness(2);
    background-repeat: repeat;
    background-clip: text;
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
    width: 850px;
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
      width: 900px;
      height: 800px;
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

@keyframes motionToRight {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(2em);
  }
}
</style>

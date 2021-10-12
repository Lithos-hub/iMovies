<template>
  <div id="home-view">

        <!-- TRAILER DIALOG -->
    <TrailerDialog
      v-if="trailerDialog"
      :video="trailerVideo"
      @close-dialog="dialog = false"
    />


      <v-row id="scroll-x" no-gutters class="d-flex" @scroll="enableScrollX">
        <div v-for="(item, i) in latestReleases" :key="i" :class="`movie-wrapper-${i}`">
          <router-link :to="`/movie/${item.id}`">
            <v-img
              class="movie-img"
              :src="imageURL + item.backdrop_path"
              @click="getMovieDetails(item.id)">
              </v-img>
              <h3 class="movie-title">
                {{ item.title }}
              </h3>
          </router-link>
        </div>
      </v-row>
      <v-row>
        <v-col>
      <h5 class="info--text ml-13">Trailer of the week</h5>
        </v-col>
        <v-col>
      <h5 class="info--text">Movie of the week</h5>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-right">
          <iframe
            id="trailer-of-the-week"
            class="movie-video"
            :src="trailerOfTheWeekVideo"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </v-col>
        <v-col id="movie-of-the-week-section">
          <v-row>
            <v-col cols="4">
              <!-- MOVIE IMG -->
              <v-img
                width="auto"
                max-width="400px"
                height="100%"
                :src="movieOfTheWeek.poster_path !== null ? imageURL + movieOfTheWeek.poster_path : no_image"
                class="movieOfTheWeek-img rounded">
                <p class="movieOfTheWeek-date pa-2">{{
                  movieOfTheWeek.release_date !== undefined
                    ? formatDate(movieOfTheWeek.release_date)
                    : "Release date no availble"
                }}</p>
            </v-img>
            </v-col>
            <v-col>
              <v-row>
                <v-col>
              <!-- MOVIE TITLE -->
              <h3 class="red--text">{{ movieOfTheWeek.title }}</h3>
              <!-- MOVIE GENRES -->
              <small class="d-block mt-2">
                <span
                  v-for="(genre, z) in movieOfTheWeek.genre_ids"
                  :key="'A' + z"
                  class="movieOfTheWeek-genres"
                >
                  {{ genre === 28 ? "Action" : "" }}
                  {{ genre === 12 ? "Adventure" : "" }}
                  {{ genre === 16 ? "Animation" : "" }}
                  {{ genre === 35 ? "Comedy" : "" }}
                  {{ genre === 80 ? "Crime" : "" }}
                  {{ genre === 99 ? "Documentary" : "" }}
                  {{ genre === 18 ? "Drama" : "" }}
                  {{ genre === 10751 ? "Family" : "" }}
                  {{ genre === 14 ? "Fantasy" : "" }}
                  {{ genre === 36 ? "History" : "" }}
                  {{ genre === 27 ? "Horror" : "" }}
                  {{ genre === 10402 ? "Music" : "" }}
                  {{ genre === 9648 ? "Mystery" : "" }}
                  {{ genre === 10749 ? "Romance" : "" }}
                  {{ genre === 878 ? "Science Fiction" : "" }}
                  {{ genre === 10770 ? "TV Movie" : "" }}
                  {{ genre === 53 ? "Thriller" : "" }}
                  {{ genre === 10752 ? "War" : "" }}
                  {{ genre === 37 ? "Western" : "" }}
                </span>
              </small>

                  <!-- VOTE AVERAGE -->
                  <div class="mt-5">
                    <h4 :class="`${computedRateColor} d-inline px-5`">
                      {{ movieOfTheWeek.vote_average }}
                    </h4>
                    <h5
                      class="font-weight-bold d-inline primary--text ml-2"
                    >
                      {{ movieOfTheWeek.vote_count }}
                    </h5>
                    <span class="font-weight-light d-inline">ratings</span>
                  </div>
                  <!-- MOVIE OVERVIEW -->
                  <p :class="!movieOfTheWeek.overview.length ? 'error--text mt-5 text-justify' : 'mt-5 text-justify'">
                    {{ !movieOfTheWeek.overview.length ? 'Sorry. This overview is not available in your language.' : movieOfTheWeek.overview }}
                  </p>
                </v-col>
                <v-col>
                </v-col>
              </v-row>
              <v-btn
                class="d-block"
                width="350px"
                outlined
                color="red"
                large
                tile
                @click="getTrailer(movieOfTheWeek)"
                dark
                id="trailer-btn">
                <span class="white--text">View trailer</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import TrailerDialog from "@/components/TrailerDialog.vue";

export default {
  name: 'Ranking',
  components: {
    TrailerDialog
  },
  data() {
    return {
      trailerDialog: false
    };
  },
  created () {
    this.getTrending(true);
    this.getLatestReleases(false);
    this.getMovieOfTheWeek()
  },
  mounted () {
    setTimeout(() => {
      this.getMovieTrailer({type: 'ofTheWeek', id: this.trendingMovies[0].id })
      this.enableScrollX();
      this.animateScroll();
    }, 1000)

  },
  computed: {
    ...mapState(['latestReleases', 'trendingMovies', 'trailerOfTheWeekVideo', 'trailerVideo', 'movieOfTheWeek', 'no_image', 'imageURL']),
    computedRateColor () {
      let movieRate = this.movieOfTheWeek.vote_average
      let color = ''
      if (movieRate < 10) {
        color = 'green'
      }
      if (movieRate < 8) {
        color = 'info'
      }
      if (movieRate < 5) {
        color = 'red'
      }
      return color
    }
  },
  methods: {
    ...mapActions(['getLatestReleases', 'getMovieTrailer', 'getTrending', 'getMovieOfTheWeek', 'getMovieDetails']),
    formatDate(date) {
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    enableScrollX () {
      let homeView = document.querySelector('#home-view')
      let scroll = homeView.querySelector('#scroll-x');
      
      scroll.addEventListener('wheel', function(e) {
        scroll.scrollLeft += e.deltaY / 50;
      });
    },
    animateScroll() {
      let homeView = document.querySelector('#home-view')
      let scroll = homeView.querySelector('#scroll-x');
      const SCROLL_MAX = 58080
      let i = 0
      setInterval(() => { 
        if (i < SCROLL_MAX) {
          scroll = homeView.querySelector('#scroll-x');
          scroll.style.transition = "0.5s ease-out";
          scroll.style.opacity = "1";
          scroll.scrollLeft += 1
          i++
        }
        if (scroll.scrollLeft === SCROLL_MAX) {
          scroll = homeView.querySelector('#scroll-x');
          scroll.style.transition = "0.5s ease-out";
          scroll.style.opacity = "0";
          setTimeout(() => {
            scroll.scrollLeft = 0
            i = 0;
          }, 500)
        }
      }, 30)
    },
    getTrailer(item) {
      this.trailerDialog = true
      this.getMovieTrailer({ type: 'other', id: item.id })
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

// ******* MOBILE RESPONSIVE ******* //
// @media only screen and (min-width: 360px) {
//   $finalHeight: 100%;
//   $finalWidth: $finalHeight;
//   $scrollBarHeight: 0px;

//   html,
//   body {
//     overflow: hidden;
//   }

//   .arrow-right {
//     display: none;
//   }

//   #title {
//     margin: 0 auto;
//     text-align: center;
//     color: white;
//     font-size: 3em;
//     display: block;
//     background-image: url("../assets/img/background1.jpg");
//     filter: brightness(2);
//     background-repeat: repeat;
//     background-clip: text;
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     z-index: 9;
//   }

//   .container {
//     position: relative;
//     left: 0px;
//     top: -20px;
//     width: 100%;
//   }

//   .sheet {
//     margin: 0 auto;
//     text-align: center;
//     background: $dark2 !important;
//     z-index: 999;
//   }

//   #movie-img {
//     width: 300px !important;
//     height: 500px;
//     margin-top: 20px;
//   }
// }
// ******* LAPTOP RESPONSIVE ******* //
// @media only screen and (min-width: 767px) {
//   ::-webkit-scrollbar {
//     display: none !important;
//   }

//   ::-webkit-scrollbar-button {
//     display: none !important;
//   }

//   $finalHeight: 100%;
//   $finalWidth: $finalHeight;
//   $scrollBarHeight: 0px;

//   html,
//   body {
//     overflow: hidden;
//   }

//   .arrow-right {
//     display: block;
//     position: fixed;
//     right: 2em;
//     top: 50%;
//     transform: translateY(-50%);
//     animation: motionToRight 0.5s ease-in-out infinite alternate-reverse;
//   }

//   #title {
//     text-align: left;
//     position: fixed;
//     top: 25%;
//     left: 0;
//     transform: translate(0%, -25%);
//     font-size: 2em;
//     background-image: url("../assets/img/background1.jpg");
//     filter: brightness(2);
//     background-repeat: repeat;
//     background-clip: text;
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     z-index: 0;
//   }

//   .container {
//     position: absolute;
//     left: 0px;
//     top: -20px;
//   }

//   #scroll-x {
//     position: absolute;
//     display: block;
//     top: 20px;
//     left: 40%;
//     width: 680px;
//     max-height: 0%;
//     margin: 0;
//     padding-top: $scrollBarHeight;
//     overflow-y: scroll;
//     overflow-x: hidden;
//     transform: rotate(-90deg) translateY(-$finalHeight);
//     transform-origin: right top;
//     & > div {
//       transform: rotate(90deg);
//       transform-origin: right top;
//     }
//   }

//   .squares {
//     padding: $finalHeight 0 0 0;
//     & > div {
//       width: 100%;
//       height: 100%;
//       margin: 0 auto;
//     }
//   }

//   .sheet {
//     padding: 0px;
//     background: $dark2 !important;
//     z-index: 999;
//   }

//   #movie-img {
//     width: 50% !important;
//     height: 50%;
//     margin: 0px;
//   }

//   .hover-img {
//     transition: 0.5s;
//   }

//   .hover-img:hover {
//     cursor: pointer;
//     transform: scale(1.1);
//   }
// }

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1200px) {

  ::-webkit-scrollbar {
    display: none !important;
  }

  ::-webkit-scrollbar-button {
    display: none !important;
  }

  #home-view {
    overflow-y: hidden;
  }

  #title {
    position: absolute;
    top: 0;
    left: 2em;
    font-size: 3em;
    background-image: url("../assets/img/background1.jpg");
    filter: brightness(2);
    background-repeat: repeat;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  #scroll-x {
    box-shadow: 0px 5px 10px black;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    max-height: 280px;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    justify-items: flex-start;
  }

  #scroll-x > div {
    margin: 0;
    padding: 0;
    text-align: center;
    width: auto;
    max-width: 600px;
    background: #ffffff;
  }

  .movie-img {
    cursor: pointer;
    width: 100%;
    max-height: 100%;
    margin: 0;
    padding: 0;
    display: inline-block;
    transition: all 0.3s ease-out;
    &:hover {
      filter: sepia(0.5);
      opacity: 0.8;
    }
  }

  .movie-title {
    position: absolute;
    bottom: -1em;
    padding-block: 0.5em;
    padding-inline: 2em;
    background: #151515ce;
    height: 3em;
    width: 600px;
    color: white;
    text-align: left;
    font-size: 16px;
    backdrop-filter: blur(5px);
  }

  #trailer-of-the-week {
    width: calc(1920px / 2.15);
    height: calc(1080px / 2.15);
    max-height: 430px;
    box-shadow: 0px 10px 10px 2px black;
  }

  .movie-video {
    position: relative;
    width: 100%;
    max-height: 430px;
    height: 100%;
  }

  #movie-of-the-week-section {
    display: block;
    width: calc(1920px / 2);
    height: calc(1080px / 2);
    background: transparent;
    margin: 0;
  }

  .movieOfTheWeek-date {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    backdrop-filter: blur(5px);
    background: #15151569;
    color: white;
  }

  .movieOfTheWeek-img {
    box-shadow: 0px 5px 10px black;
  }

  .movieOfTheWeek-genres {
    border-radius: 25px;
    padding-inline: 10px;
    padding-block: 5px;
    text-align: center;
    background: $primary;
    margin-right: 10px;
    font-family: $style1;
    text-transform: uppercase;
    font-size: 12px;
    display: inline-block;
    margin-bottom: 10px;
  }
}
</style>

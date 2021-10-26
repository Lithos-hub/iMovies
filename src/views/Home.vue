<template>
  <div id="home-view">

        <!-- TRAILER DIALOG -->
    <TrailerDialog
      v-if="trailerDialog"
      :video="trailerVideo"
      @close-dialog="trailerDialog = false"
    />

        <!-- ADD TO MY MOVIES DIALOG -->
    <AddToDialog
      v-if="addToDialog"
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
      <h5 class="info--text ml-13">{{ $t('view-home.text1') }}</h5>
        </v-col>
        <v-col>
      <h5 class="info--text">{{ $t('view-home.text2') }}</h5>
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
          <v-row no-gutters>
            <v-col cols="4">
              <!-- MOVIE IMG -->
              <v-img
                width="auto"
                max-width="400px"
                height="100%"
                max-height="430px"
                :src="movieOfTheWeek.poster_path !== null ? imageURL + movieOfTheWeek.poster_path : no_image"
                class="movieOfTheWeek-img rounded">
                <p class="movieOfTheWeek-date pa-2">{{
                  movieOfTheWeek.release_date !== undefined
                    ? formatDate(movieOfTheWeek.release_date)
                    : $t('generic-messages.no-release')
                }}</p>
            </v-img>
            </v-col>
            <v-col>
                <v-row no-gutters class="mx-5">
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
                    {{ formatGenre(genre) }}
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
                    <span class="font-weight-light d-inline">{{ $t('view-home.ratings') }}</span>
                  </div>
                  </v-col>
                  <v-col>
                    <v-row>
                      <v-col>
                        <v-btn
                          block
                          outlined
                          color="red"
                          large
                          tile
                          @click="getTrailer(movieOfTheWeek)"
                          dark
                          id="trailer-btn">
                          <span class="white--text">{{ $t('app-buttons.view') }}</span>
                        </v-btn>
                      </v-col>
                      <v-col>
                        <v-btn
                          block
                          outlined
                          color="purple"
                          large
                          tile
                          @click="showAddToDialog(true); setAddMovie(item)"
                          dark
                          id="add-to-btn"
                          >
                          <span class="white--text">{{ $t('app-buttons.add') }}</span>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-container>
                  <!-- MOVIE OVERVIEW -->
                  <p :class="!movieOfTheWeek.overview.length ? 'error--text mt-5 text-justify' : 'mt-5 text-justify'">
                    {{ !movieOfTheWeek.overview.length ? 'Sorry. This overview is not available in your language.' : movieOfTheWeek.overview }}
                  </p>
                </v-container>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import TrailerDialog from "@/components/TrailerDialog.vue";
import AddToDialog from "../components/AddToDialog";

export default {
  name: 'Ranking',
  components: {
    TrailerDialog,
    AddToDialog,
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
    ...mapState(['latestReleases', 'trendingMovies', 'trailerOfTheWeekVideo', 'trailerVideo', 'movieOfTheWeek', 'no_image', 'imageURL', 'addToDialog']),
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
    ...mapActions(['getLatestReleases', 'getMovieTrailer', 'getTrending', 'getMovieOfTheWeek', 'getMovieDetails', 'showAddToDialog']),
    formatDate(date) {
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    formatGenre (genre) {
      let genres = {
        ['28']: this.$t('genres.action'), 
        ['12']: this.$t('genres.adventure'), 
        ['16']: this.$t('genres.animation'), 
        ['35']: this.$t('genres.comedy'), 
        ['80']: this.$t('genres.crime'), 
        ['99']: this.$t('genres.documentary'), 
        ['18']: this.$t('genres.drama'), 
        ['10751']: this.$t('genres.family'), 
        ['14']: this.$t('genres.fantasy'), 
        ['36']: this.$t('genres.history'), 
        ['27']: this.$t('genres.horror'), 
        ['10402']: this.$t('genres.music'), 
        ['9648']: this.$t('genres.mystery'), 
        ['10749']: this.$t('genres.romance'), 
        ['878']: this.$t('genres.sci-fi'), 
        ['10770']: this.$t('genres.tv'), 
        ['53']: this.$t('genres.thriller'), 
        ['10752']: this.$t('genres.war'), 
        ['37']: this.$t('genres.western'), 
      }
      return genres[genre]
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
    background: $gradient_blur2;
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
    background: $gradient_blur2;
    color: white;
    text-shadow: 2px 2px 3px black;
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

<template>
  <div id="home-view">
    <!-- TRAILER DIALOG -->
    <TrailerDialog
      v-if="trailerDialog"
      :video="trailerVideo"
      @close-dialog="trailerDialog = false"
    />

    <!-- ADD TO MY MOVIES DIALOG -->
    <AddToDialog v-if="addToDialog" />

    <div id="scroll-x" class="d-flex" @scroll="enableScrollX">
      <div
        v-for="(item, i) in latestReleases"
        :key="i"
        :class="`movie-wrapper-${i}`"
      >
        <router-link :to="`/movie/${item.id}`">
          <v-img
            class="movie-img"
            :src="
              item.backdrop_path !== undefined
                ? imageURL + item.backdrop_path
                : ''
            "
            @click="item.id ? getMovieDetails(item.id) : null"
          >
          </v-img>
          <h3 class="movie-title shadow-text">
            {{ item.title }}
          </h3>
        </router-link>
      </div>
    </div>
    <v-row no-gutters class="mt-2 pa-0 gradient-text" v-if="!isUsingMobile">
      <v-col cols="4" class="text-center">
        <h5 class="ml-5">{{ $t("view-home.text1") }}</h5>
      </v-col>
      <v-col cols="5" class="text-center">
        <h5 class="ml-5">{{ $t("view-home.text2") }}</h5>
      </v-col>
      <v-col cols="3" class="justify-center d-flex">
        <h5>{{ $t("view-home.text3") }}</h5><small>(Beta)</small>
      </v-col>
    </v-row>
    <div id="home-divider"></div>
    <v-row class="ma-0 pa-0">
      <!-- TRAILER COLUMN -->
      <v-col :cols="isUsingMobile ? '12' : '4'" class="text-left">
        <h2 v-if="isUsingMobile" class="text-h5 info--text text-center">
          {{ $t("view-home.text1") }}
        </h2>
        <iframe
          id="trailer-of-the-week"
          class="movie-video"
          :src="trailerOfTheWeekVideo"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </v-col>
      <!-- MOVIE COLUMN -->
      <v-col :cols="isUsingMobile ? '12' : '5'" id="movie-of-the-week-section">
        <v-row no-gutters>
          <v-col :cols="isUsingMobile ? '12' : '3'">
            <h2 v-if="isUsingMobile" class="text-h5 info--text text-center">
              {{ $t("view-home.text2") }}
            </h2>
            <!-- MOVIE IMG -->
            <v-img
              :src="
                movieOfTheWeek.poster_path !== null
                  ? imageURL + movieOfTheWeek.poster_path
                  : no_image
              "
              class="movieOfTheWeek-img rounded"
            >
              <p class="movieOfTheWeek-date pa-2 shadow-text">
                {{
                  movieOfTheWeek.release_date !== undefined
                    ? formatDate(movieOfTheWeek.release_date)
                    : $t("generic-messages.no-release")
                }}
              </p>
            </v-img>
          </v-col>
          <v-col
            :cols="isUsingMobile ? '12' : '9'"
            :class="isUsingMobile ? 'pt-5' : ''"
          >
            <v-row no-gutters class="mx-5">
              <v-col :cols="isUsingMobile ? '12' : '12'">
                <!-- MOVIE TITLE -->
                <v-row no-gutters>
                  <v-col>
                    <p class="red--text movieOfTheWeek-title">
                      {{ movieOfTheWeek.title }}
                    </p>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col class="text-center">
                    <!-- MOVIE GENRES -->
                      <span
                        v-for="(genre, z) in movieOfTheWeek.genre_ids"
                        :key="'A' + z"
                        class="movieOfTheWeek-genres ma-0 mx-1"
                      >
                        <small>{{ formatGenre(genre) }}</small>
                      </span>
                  </v-col>
                </v-row>

                <!-- VOTE AVERAGE -->
                <v-row no-gutters>
                  <v-col cols="10" class="d-flex justify-start align-center">
                    <v-sheet
                      elevation="5"
                      height="auto"
                      max-height="30px"
                      width="auto"
                      :class="`${computedRateColor} pa-1`"
                    >
                      <h6 class="white--text align-center text-center">
                        {{ movieOfTheWeek.vote_average }}
                      </h6>
                    </v-sheet>
                    <p class="white--text mx-2 mt-2">
                      {{ movieOfTheWeek.vote_count }}
                      <span
                        :class="`font-weight-light ${computedRateColor}--text`"
                        >{{ $t("view-home.ratings") }}</span
                      >
                    </p>
                  </v-col>
                  <v-col
                    cols="2"
                    class="d-flex justify-end ma-0 pa-0 text-right"
                  >
                    <v-col>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            outlined
                            v-bind="attrs"
                            v-on="on"
                            color="red"
                            small
                            icon
                            fab
                            @click="getTrailer(movieOfTheWeek)"
                            dark
                          >
                            <v-icon color="white">mdi-youtube</v-icon>
                          </v-btn>
                        </template>
                        <small class="white--text">{{
                          $t("app-buttons.view")
                        }}</small>
                      </v-tooltip>
                    </v-col>
                    <v-col>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            outlined
                            v-bind="attrs"
                            v-on="on"
                            color="purple"
                            small
                            icon
                            fab
                            @click="
                              showAddToDialog(true);
                              setAddMovie(movieOfTheWeek);
                            "
                            dark
                          >
                            <v-icon color="white">mdi-plus</v-icon>
                          </v-btn>
                        </template>
                        <small class="white--text">{{
                          $t("app-buttons.add")
                        }}</small>
                      </v-tooltip>
                    </v-col>
                    <v-col>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            outlined
                            v-bind="attrs"
                            v-on="on"
                            color="primary"
                            small
                            icon
                            fab
                            @click="showInfo(movieOfTheWeek)"
                            dark
                          >
                            <v-icon color="white">mdi-information</v-icon>
                          </v-btn>
                        </template>
                        <small class="white--text">{{
                          $t("app-buttons.info")
                        }}</small>
                      </v-tooltip>
                    </v-col>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-container>
              <!-- MOVIE OVERVIEW -->
              <p
                :class="
                  movieOfTheWeek.overview === ''
                    ? 'error--text mt-5 text-justify'
                    : 'text-justify'
                "
              >
                {{
                  movieOfTheWeek.overview === ""
                    ? $t("view-home.noOverview")
                    : formatOverview(movieOfTheWeek.overview)
                }}
              </p>
            </v-container>
          </v-col>
        </v-row>
      </v-col>
      <!-- TRIVIA COLUMN -->
      <v-col
        :cols="isUsingMobile ? '12' : '3'"
        id="trivia-section"
        class="text-center mx-auto"
      >
        <v-progress-circular v-if="loadingTrivia" indeterminate color="cyan" size="80" class="centered"  width="2" />
        <div v-else>
          <div class="trivia-message" v-if="!loadingTrivia && !hasPlayedToday">
            <v-icon class="pulse star-icon" color="cyan">mdi-star</v-icon>
            <p class="cyan--text">
             {{ $t("view-home.hasNotPlayed") }}
            </p>
            <v-btn small class="gradient-background-1 white--text" tile @click="playGame"
              >{{ $t("view-home.play") }}</v-btn
            >
          </div>
          <div v-if="!loadingTrivia && hasPlayedToday" class="trivia-message">
            <p class="error--text">{{ $t("view-home.hasPlayed") }}</p>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TrailerDialog from "@/components/TrailerDialog.vue";
import AddToDialog from "../components/AddToDialog";
import { db } from "../../firebase";
import Services from "../services/services";

export default {
  name: "Ranking",
  components: {
    TrailerDialog,
    AddToDialog,
  },
  data() {
    return {
      trailerDialog: false,
      hasPlayedToday: false,
      loadingTrivia: false,
    };
  },
  created() {
    this.getHasPlayedToday();
    this.getTrending(true);
    this.getLatestReleases(false);
    this.getMovieOfTheWeek();
  },
  mounted() {
    this.enableScrollX();
    this.animateScroll();
    this.$store.dispatch('getFriendshipNotification');
    setTimeout(() => {
      this.getMovieTrailer({
        type: "ofTheWeek",
        id: this.trendingMovies[0].id,
      });
    }, 1000);
  },
  computed: {
    ...mapState([
      "latestReleases",
      "trendingMovies",
      "trailerOfTheWeekVideo",
      "trailerVideo",
      "movieOfTheWeek",
      "no_image",
      "imageURL",
      "addToDialog",
    ]),
    computedRateColor() {
      let movieRate = this.movieOfTheWeek.vote_average;
      let color = "";
      if (movieRate <= 10) {
        color = "purple";
      }
      if (movieRate < 9) {
        color = "info";
      }
      if (movieRate < 7) {
        color = "green";
      }
      if (movieRate < 5) {
        color = "orange";
      }
      if (movieRate < 3) {
        color = "red";
      }
      return color;
    },
    isUsingMobile() {
      return this.$vuetify.breakpoint.xs;
    },
  },
  methods: {
    ...mapActions([
      "getLatestReleases",
      "getMovieTrailer",
      "getTrending",
      "setAddMovie",
      "getMovieOfTheWeek",
      "getMovieDetails",
      "showAddToDialog",
      "showInfo",
    ]),
    getHasPlayedToday() {
      this.loadingTrivia = true;
      Services
      .getHasPlayedToday()
      .then(res => {
        this.hasPlayedToday = res;
        this.loadingTrivia = false;
      })
      .catch(err => {
        console.log(err)
        this.loadingTrivia = false;
      })
    },
    playGame () {
      this.$router.push({ path: '/trivia/game/playGame' });
    },
    formatDate(date) {
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    formatGenre(genre) {
      let genres = {
        ["28"]: this.$t("genres.action"),
        ["12"]: this.$t("genres.adventure"),
        ["16"]: this.$t("genres.animation"),
        ["35"]: this.$t("genres.comedy"),
        ["80"]: this.$t("genres.crime"),
        ["99"]: this.$t("genres.documentary"),
        ["18"]: this.$t("genres.drama"),
        ["10751"]: this.$t("genres.family"),
        ["14"]: this.$t("genres.fantasy"),
        ["36"]: this.$t("genres.history"),
        ["27"]: this.$t("genres.horror"),
        ["10402"]: this.$t("genres.music"),
        ["9648"]: this.$t("genres.mystery"),
        ["10749"]: this.$t("genres.romance"),
        ["878"]: this.$t("genres.sci-fi"),
        ["10770"]: this.$t("genres.tv"),
        ["53"]: this.$t("genres.thriller"),
        ["10752"]: this.$t("genres.war"),
        ["37"]: this.$t("genres.western"),
      };
      return genres[genre];
    },
    formatOverview(text) {
      if (!text) return null;
      return text.slice(0, 700) + "...";
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
      this.trailerDialog = true;
      this.getMovieTrailer({ type: "other", id: item.id });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";
@import "src/scss/app";


#home-divider {
  border-radius: 10px;
  height: 2px;
  width: 100%;
  margin: 0 auto;
  background: $gradient_1;
}

::-webkit-scrollbar {
  display: none !important;
}

::-webkit-scrollbar-button {
  display: none !important;
}

#trivia-section {
  position: relative;

  .trivia-message {
    padding: 20px;
    border-radius: 5px;
    height: auto;
    width: 80%;
    border: 1px solid #151515;
    box-shadow: 0px 0px 10px black, 0px 0px 20px #151515, 0px 0px 30px #202020;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .star-icon {
    position: absolute;
    top: 0;
    right: 0;
  }
}

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  #home-view {
    overflow-y: hidden;
  }

  #scroll-x {
    box-shadow: 0px 5px 10px black;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    max-height: 250px;
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
    max-width: 500px;
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
    font-size: 14px;
    backdrop-filter: blur(5px);
  }

  #trailer-of-the-week {
    width: 100%;
    height: 350px;
    max-height: auto;
    box-shadow: 0px 5px 10px black;
  }

  .movie-video {
    position: relative;
  }

  #movie-of-the-week-section {
    display: block;
    width: 100%;
    height: auto;
    text-align: center;
    background: transparent;
    margin: 0;

    p {
      font-size: 12px;
    }
  }

  .movieOfTheWeek-title {
    font-size: 20px;
  }

  .movieOfTheWeek-date {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    backdrop-filter: blur(5px);
    background: $gradient_blur2;
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
    font-size: 10px;
    display: inline-block;
    margin-bottom: 10px;
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 1366px) {
  #home-view {
    overflow-y: hidden;
  }

  #scroll-x {
    box-shadow: 0px 5px 10px black;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    max-height: 200px;
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
    max-width: 500px;
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
    width: 100%;
    max-height: calc(768px / 2.75);
    box-shadow: 0px 5px 10px black;
  }

  .movie-video {
    position: relative;
    margin-left: 15px;
    width: 100%;
    height: 300px;
  }

  #movie-of-the-week-section {
    display: block;
    background: transparent;

    p {
      font-size: 12px;
    }
  }

  .movieOfTheWeek-title {
    font-size: 15px;
    text-align: left;
  }

  .movieOfTheWeek-date {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    backdrop-filter: blur(5px);
    background: $gradient_blur2;
    color: white;
  }

  .movieOfTheWeek-img {
    box-shadow: 0px 5px 10px black;
    width: 100%;
    height: 100%;
    max-height: calc(768px / 2.5);
  }

  .movieOfTheWeek-genres {
    border-radius: 10px;
    padding-inline: 5px;
    padding-block: 2.5px;
    text-align: center;
    background: transparent;
    border: 1px solid $primary;
    font-family: $style1;
    text-transform: uppercase;
    font-size: 10px;
    display: inline-block;
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1920px) {
  #home-view {
    overflow-y: hidden;
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
    width: 100%;
    height: 100%;
    max-height: 430px;
    box-shadow: 0px 5px 10px black;
  }

  .movie-video {
    position: relative;
    width: auto;
    max-height: 430px;
    height: 100%;
  }

  #movie-of-the-week-section {
    display: block;
    width: 100%;
    height: 100%;
    background: transparent;
    margin: 0;

    p {
      font-size: 17px;
    }
  }

  .movieOfTheWeek-title {
    font-size: 30px;
  }

  .movieOfTheWeek-date {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    backdrop-filter: blur(5px);
    background: $gradient_blur2;
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

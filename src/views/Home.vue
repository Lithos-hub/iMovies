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
    <v-row no-gutters class="mt-5 pa-0 gradient-text" v-if="!isUsingMobile">
      <v-col cols="5" class="text-center">
        <h5 class="ml-5">{{ $t("view-home.text1") }}</h5>
      </v-col>
      <v-col cols="5" class="text-center">
        <h5 class="ml-5">{{ $t("view-home.text2") }}</h5>
      </v-col>
      <v-col cols="2" class="justify-center d-flex">
        <h5>{{ $t("view-home.text3") }}</h5>
        <small>(Beta)</small>
      </v-col>
    </v-row>
    <div id="home-divider"></div>
    <v-row class="mt-3" id="contain-row">
      <!-- TRAILER COLUMN -->
      <v-col :cols="isUsingMobile ? '12' : '5'" class="text-left">
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
        <v-row>
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
            <!-- MOVIE TITLE -->
            <p class="cyan--text movieOfTheWeek-title text-center">
              {{ movieOfTheWeek.title }}
            </p>
            <!-- MOVIE OVERVIEW -->
            <p
              :class="
                movieOfTheWeek.overview === ''
                  ? 'error--text mt-5 text-justify'
                  : 'text-justify mx-2'
              "
            >
              {{
                movieOfTheWeek.overview === ""
                  ? $t("view-home.noOverview")
                  : formatOverview(movieOfTheWeek.overview)
              }}
            </p>
            <v-row class="mx-2">
              <v-col>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      outlined
                      v-bind="attrs"
                      v-on="on"
                      color="red"
                      icon
                      tile
                      block
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
                      icon
                      tile
                      block
                      @click="
                        showAddToDialog(true);
                        setAddMovie(movieOfTheWeek);
                      "
                      dark
                    >
                      <v-icon color="white">mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <small class="white--text">{{ $t("app-buttons.add") }}</small>
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
                      icon
                      tile
                      block
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
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <!-- TRIVIA COLUMN -->
      <v-col
        :cols="isUsingMobile ? '12' : '2'"
        id="trivia-section"
        :class="isUsingMobile ? 'text-center' : 'text-center mx-auto'"
      >
        <h2 v-if="isUsingMobile" class="text-h5 mt-12 info--text text-center">
          {{ $t("view-home.text3") }}
        </h2>
        <div :class="isUsingMobile ? 'trivia-wrapper' : ''">
          <v-progress-circular
            v-if="loadingTrivia"
            indeterminate
            color="cyan"
            size="80"
            class="centered"
            width="2"
          />
          <div v-else>
            <div
              class="trivia-message"
              v-if="!loadingTrivia && !hasPlayedToday"
            >
              <v-icon class="pulse star-icon" color="cyan">mdi-star</v-icon>
              <p class="cyan--text">
                {{ $t("view-home.hasNotPlayed") }}
              </p>
              <v-btn
                small
                class="gradient-background-1 white--text"
                tile
                @click="playGame"
                >{{ $t("view-home.play") }}</v-btn
              >
            </div>
            <div v-if="!loadingTrivia && hasPlayedToday" class="trivia-message">
              <p class="error--text">{{ $t("view-home.hasPlayed") }}</p>
            </div>
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
import { db, auth } from "../../firebase";
import Services from "../services/services";
import { LANGUAGE } from '../constants/constants';

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
    this.getTrending(true);
    this.getLatestReleases(false);
    this.getMovieOfTheWeek();
  },
  mounted() {
    Services.hasVisitedTheSection("home");
    this.getHasPlayedToday();
    this.enableScrollX();
    this.animateScroll();
    this.$store.dispatch("getFriendshipNotification");
    this.$store.dispatch("getGettedAchievements", LANGUAGE.substring(3, 5));
    setTimeout(() => {
      this.getMovieTrailer({
        type: "ofTheWeek",
        id: this.trendingMovies[0].id,
      });
      this.getUserData();
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
    async getUserData() {
      await auth.onAuthStateChanged((user) => {
        if (user) {
          this.$store.commit("setUser", user);
          this.$store.dispatch("getMyDocID");
          setTimeout(() => {
            this.$store.dispatch("getFriendshipNotification");
            this.$store.dispatch("getMySocialData");
            console.log("My Firestore Doc ID: ", localStorage.getItem("docID"));
            this.isLoading = false;
          }, 250)
        }
      });
    },
    async getHasPlayedToday() {
      this.loadingTrivia = true;
      await Services.getHasPlayedToday()
        .then((res) => {
          console.log("RES => ", res);
          this.hasPlayedToday = res;
          this.loadingTrivia = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingTrivia = false;
        });
    },
    playGame() {
      this.$router.push({ path: "/trivia/game/playGame" });
    },
    formatDate(date) {
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    formatOverview(text) {
      if (!text) return null;
      return text.slice(0, 700) + "...";
    },
    enableScrollX() {
      let homeView = document.querySelector("#home-view");
      let scroll = homeView.querySelector("#scroll-x");

      scroll.addEventListener("wheel", function (e) {
        scroll.scrollLeft += e.deltaY / 50;
      });
    },
    animateScroll() {
      let homeView = document.querySelector("#home-view");
      let scroll = homeView.querySelector("#scroll-x");
      const SCROLL_MAX = 58080;
      let i = 0;
      setInterval(() => {
        if (i < SCROLL_MAX) {
          scroll = homeView.querySelector("#scroll-x");
          scroll.style.transition = "0.5s ease-out";
          scroll.style.opacity = "1";
          scroll.scrollLeft += 1;
          i++;
        }
        if (scroll.scrollLeft === SCROLL_MAX) {
          scroll = homeView.querySelector("#scroll-x");
          scroll.style.transition = "0.5s ease-out";
          scroll.style.opacity = "0";
          setTimeout(() => {
            scroll.scrollLeft = 0;
            i = 0;
          }, 500);
        }
      }, 30);
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

.trivia-wrapper {
  margin-top: 4em;
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
    height: 250px;
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

  #trivia-section {
    position: relative;

    .trivia-message {
      padding: 20px;
      border-radius: 5px;
      height: auto;
      width: 80%;
      border: 1px solid #151515;
      box-shadow: 0px 0px 10px black, 0px 0px 20px #151515, 0px 0px 30px #202020;
      position: relative;
      top: 0%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .star-icon {
      position: absolute;
      top: 0;
      right: 0;
    }
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
    box-shadow: 0px 5px 10px black;
  }

  .movie-video {
    position: relative;
    margin-left: 15px;
    width: 100%;
    height: 100%;
  }

  #movie-of-the-week-section {
    display: block;
    background: transparent;
    height: 300px;

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
    box-shadow: 0px 5px 10px black;
  }

  .movie-video {
    position: relative;
    width: 100%;
    height: 100%;
  }

  #movie-of-the-week-section {
    display: block;
    width: 100%;
    height: 400px;
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

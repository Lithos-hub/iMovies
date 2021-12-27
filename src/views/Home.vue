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

    <v-row id="scroll-x" no-gutters class="d-flex" @scroll="enableScrollX">
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
    </v-row>
    <v-row v-if="!isUsingMobile">
      <v-col>
        <h5 class="info--text ml-13">{{ $t("view-home.text1") }}</h5>
      </v-col>
      <v-col>
        <h5 class="info--text">{{ $t("view-home.text2") }}</h5>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="isUsingMobile ? '12' : '6'" class="text-right">
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
      <v-col :cols="isUsingMobile ? '12' : '6'" id="movie-of-the-week-section">
        <v-row no-gutters>
          <v-col :cols="isUsingMobile ? '12' : '4'">
            <h2 v-if="isUsingMobile" class="text-h5 info--text text-center">
              {{ $t("view-home.text2") }}
            </h2>
            <!-- MOVIE IMG -->
            <v-img
              width="auto"
              max-width="400px"
              height="auto"
              max-height="430px"
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
          <v-col :cols="isUsingMobile ? '12' : '8'" :class="isUsingMobile ? 'pt-5' : ''">
            <v-row no-gutters class="mx-5">
              <v-col :cols="isUsingMobile ? '12' : '12'">
                <!-- MOVIE TITLE -->
                <h3 class="red--text movieOfTheWeek-title">
                  {{ movieOfTheWeek.title }}
                </h3>
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
                <div
                  class="text-center d-flex justify-center align-center mt-3"
                >
                  <v-sheet
                    elevation="5"
                    height="50px"
                    width="100%"
                    max-width="50px"
                    :class="`${computedRateColor} pa-2`"
                  >
                    <h4 class="white--text align-center text-center">
                      {{ movieOfTheWeek.vote_average }}
                    </h4>
                  </v-sheet>
                  <h5 class="font-weight-bold primary--text mx-2">
                    {{ movieOfTheWeek.vote_count }}
                  </h5>
                  <span class="font-weight-light">{{
                    $t("view-home.ratings")
                  }}</span>
                </div>
              </v-col>
              <v-col>
                <v-row class="mt-5">
                  <v-col class="text-center">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          outlined
                          v-bind="attrs"
                          v-on="on"
                          block
                          color="red"
                          large
                          tile
                          @click="getTrailer(movieOfTheWeek)"
                          dark
                          id="trailer-btn"
                        >
                          <v-icon color="white">mdi-youtube</v-icon>
                        </v-btn>
                      </template>
                      <span class="white--text">{{
                        $t("app-buttons.view")
                      }}</span>
                    </v-tooltip>
                  </v-col>
                  <v-col class="text-center">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          outlined
                          v-bind="attrs"
                          v-on="on"
                          block
                          color="purple"
                          large
                          tile
                          @click="
                            showAddToDialog(true);
                            setAddMovie(movieOfTheWeek);
                          "
                          dark
                          id="add-to-btn"
                        >
                          <v-icon color="white">mdi-plus</v-icon>
                        </v-btn>
                      </template>
                      <span class="white--text">{{
                        $t("app-buttons.add")
                      }}</span>
                    </v-tooltip>
                  </v-col>
                  <v-col class="text-center">
                    <v-btn
                      outlined
                      block
                      color="primary"
                      large
                      tile
                      @click="showInfo(movieOfTheWeek)"
                      dark
                    >
                      <v-icon color="white">mdi-information</v-icon>
                    </v-btn>
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
                    : movieOfTheWeek.overview
                }}
              </p>
            </v-container>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TrailerDialog from "@/components/TrailerDialog.vue";
import AddToDialog from "../components/AddToDialog";
import { db } from "../../firebase";

export default {
  name: "Ranking",
  components: {
    TrailerDialog,
    AddToDialog,
  },
  data() {
    return {
      trailerDialog: false,
    };
  },
  created() {
    this.getTrending(true);
    this.getLatestReleases(false);
    this.getMovieOfTheWeek();
  },
  mounted() {
    this.getMyDocID();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setTimeout(() => {
      this.getMovieTrailer({
        type: "ofTheWeek",
        id: this.trendingMovies[0].id,
      });
      this.enableScrollX();
      this.animateScroll();
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
      "addToDialog"
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
    enableScrollX() {
      let homeView = document.querySelector("#home-view");
      let scroll = homeView.querySelector("#scroll-x");

      scroll.addEventListener("wheel", function (e) {
        scroll.scrollLeft += e.deltaY / 50;
      });
    },
    animateScroll() {
      let homeView = document.querySelector("#home-view");
      let scroll = document.querySelector("#scroll-x");
      const SCROLL_MAX = 58080;
      let i = 0;
      setInterval(() => {
        if (i < SCROLL_MAX) {
          scroll.style.transition = "0.5s ease-out";
          scroll.style.opacity = "1";
          scroll.scrollLeft += 1;
          i++;
        }
        if (scroll.scrollLeft === SCROLL_MAX) {
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
    async getMyDocID () {
      const COLLECTION = await db.collection("userData").get()
      const USERDATA = this.$store.getters.userData
      COLLECTION.forEach((doc) => {
        if (doc.data().userID === USERDATA.uid) {
          this.$store.commit('setDocID', doc.data().docID)
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";
@import "src/scss/app";

::-webkit-scrollbar {
  display: none !important;
}

::-webkit-scrollbar-button {
  display: none !important;
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
    font-size: 16px;
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
    width: 100%;
    max-height: auto;
    height: 100%;
  }

  #movie-of-the-week-section {
    display: block;
    width: 100%;
    height: 100%;
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
    width: calc(1366px / 2.15);
    height: calc(768px / 2);
    max-height: 330px;
    box-shadow: 0px 5px 10px black;
  }

  .movie-video {
    position: relative;
    width: 100%;
    max-height: 400px;
    height: 100%;
  }

  #movie-of-the-week-section {
    display: block;
    width: calc(1366px / 2);
    height: calc(768px / 2);
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
    max-height: 200px;
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
    width: calc(1920px / 2.15);
    height: calc(1080px / 2.15);
    max-height: 430px;
    box-shadow: 0px 5px 10px black;
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

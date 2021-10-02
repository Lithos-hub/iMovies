<template>
  <div>
    <SectionTitle :sectionSubtitle="subtitle" />

    <!-- TRAILER DIALOG -->
    <TrailerDialog
      v-if="dialog"
      :video="trailerVideo"
      :message-error="videoError"
      @close-dialog="dialog = false"
    />

    <v-container fluid id="trending-container">
      <!-- LIST OF MOVIES -->
      <v-row no-gutters>
        <div v-for="(item, i) in trending" :key="i">
          <v-col>
            <v-sheet width="80%" id="trending-sheet">
              <v-card-title id="trending-title"
                >{{ item.title }}
                <span id="trending-date">{{
                  item.release_date
                }}</span></v-card-title
              >
            </v-sheet>
          </v-col>
          <v-col class="d-flex">
            <img :src="url + item.poster_path" width="200" class="movie-img" />

            <p class="lead" id="trending-overview">
              <span class="small d-block mb-10"
                >Overview:
                <p
                  :class="
                    item.overview.length > 0
                      ? 'white--text mt-5'
                      : 'error--text mt-10'
                  "
                >
                  {{ item.overview.length > 0 ? item.overview : no_overview }}
                </p>
              </span>
              <br />

              <!-- SHOW INFO DIALOG BUTTON -->

              <v-btn
                class="large mt-5"
                @click="getMovieTrailer(item)"
                dark
                id="trailer-btn"
                >View trailer</v-btn
              >
              <v-btn
                color="red"
                class="large mt-5"
                @click="showInfo(item)"
                dark
                id="info-btn"
                >View info</v-btn
              >
            </p>
          </v-col>
          <hr class="error" />
        </div>
      </v-row>
    </v-container>

    <!-- SHOW DYNAMIC INFO WITH A DIALOG-->

    <div v-for="(item, i) in trending" :key="i">
      <v-dialog
        v-model="infoDialog"
        width="800"
        height="100%"
        v-if="infoDialog"
        overlay-opacity="2"
      >
        <v-card>
          <v-card-title class="white--text" id="dialog-title">
            {{ title }}
          </v-card-title>

          <v-card-text id="dialog-text" class="mt-5">
            <p id="dialog-date">Release date: {{ releaseDate }}</p>
            <p id="dialog-overview">Overview: {{ overview }}</p>

            <p id="dialog-average">Vote average: {{ average }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn block @click="infoDialog = false" class="close-info-btn">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import TrailerDialog from "../components/TrailerDialog";

import { mapActions, mapState } from "vuex";
import axios from "axios";

export default {
  components: {
    SectionTitle,
    TrailerDialog,
  },
  data() {
    return {
      subtitle: "Current popular movies",
      title: "",
      overview: "",
      releaseDate: "",
      average: "",
      infoDialog: false,
      dialog: false,
      trailerVideo: "",
      videoError: "",
      url: "https://image.tmdb.org/t/p/original",
      no_overview: "We are sorry. This movie have not available overview.",
    };
  },
  computed: {
    ...mapState(["trending", "apikey"]),
  },
  created() {
    this.getTrending(this.apikey);
  },
  methods: {
    ...mapActions(["getTrending"]),

    getMovieTrailer(item) {
      const video_url = `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${this.apikey}&language=en-US`;
      this.dialog = true;

      return new Promise((resolve) => {
        axios
          .get(video_url)
          .then((resp) => {
            this.videoError = "";

            const key = resp.data.results[0].key;

            const youtube_video = "https://www.youtube.com/embed/" + key;

            this.trailerVideo = youtube_video;
          })
          .catch((e) => {
            console.log("Trailer movie 1 " + e);
            this.videoError = "Sorry. This video is no available.";
          });
      });
    },
    // ********* //
    showInfo(item) {
      this.infoDialog = !this.infoDialog;
      this.title = item.title;
      this.overview = item.overview;
      this.releaseDate = item.release_date;
      this.average = item.vote_average;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  body {
    background: $dark2;
  }

  #trending-sheet {
    background: linear-gradient(to right, $secondary, $dark2);
  }
  #trending-container {
    position: relative;
    top: 20px;
    animation: fadeIn ease 2s;
  }
  #trending-overview {
    padding: 0px;
    font-size: 15px;
    text-align: justify;
    display: block;
  }
  #no-overview {
    padding: 0px;
    font-size: 15px;
    color: $secondary;
    text-align: justify;
  }

  #trending-title {
    font-size: 1em;
    line-height: 20px;
    padding: 20px;
    font-family: $style2;
    text-transform: uppercase;
  }

  #trending-date {
    font-size: 1em;
    position: absolute;
    right: 35px;
    color: $secondary;
  }

  .movie-img {
    display: block;
    height: 100%;
    width: 50%;
    margin-right: 20px;
    margin-top: 20%;
  }

  #info-btn {
    position: relative;
    right: 0px;
  }

  #dialog-title {
    background: linear-gradient(to right, rgb(33, 33, 33), rgb(0, 20, 56));
    font-size: 1.2em;
  }

  #dialog-date {
    font-size: 1em;
    text-align: right;
  }

  #dialog-overview {
    margin: 10px;
    text-align: justify;
    font-size: 16px;
    color: $dark;
    line-height: 30px;
  }

  #dialog-average {
    color: $primary;
    background: $dark2;
    padding: 10px;
    font-size: 1em;
    font-weight: bold;
    text-align: center;
  }

  .close-info-btn {
    background: linear-gradient(to left, rgb(33, 33, 33), rgb(121, 0, 81));
    color: white;
  }

  //****************************** TRAILER DIALOG ******************************//
  .videoDialog {
    margin: 0px;
    padding: 10px;
    width: 100%;
    height: 100%;
  }

  .closeDialog-btn {
    position: fixed;
    bottom: 20px;
    left: 0px;
    width: 100%;
    padding: 0px;
  }

  .video {
    height: 550px;
  }

  .trailerCardDialog {
    bottom: 0px;
    width: 100%;
    height: 100%;
    z-index: 999999;
    background: $dark2 !important;
  }

  .video-error {
    font-size: 1em;
    text-align: center;
  }

  .dialog {
    height: 100%;
    overflow: hidden;
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  body {
    background: $dark2;
  }

  #trending-sheet {
    background: linear-gradient(to right, $secondary, $dark2);
  }
  #trending-container {
    position: relative;
    top: 20px;
    animation: fadeIn ease 2s;
  }
  #trending-overview {
    padding: 50px;
    font-size: 20px;
    text-align: justify;
  }
  #no-overview {
    padding: 50px;
    font-size: 20px;
    color: $secondary;
    text-align: justify;
  }

  #trending-title {
    font-size: 3em;
    line-height: 60px;
    padding: 20px;
    font-family: $style2;
    text-transform: uppercase;
    text-align: justify;
  }

  #trending-date {
    font-size: 1em;
    position: absolute;
    right: 35px;
    color: $secondary;
  }

  #info-btn {
    position: absolute;
    right: 35px;
    background: linear-gradient(to right, $dark2, $primary);
  }

  #trailer-btn {
    position: absolute;
    right: 155px;
    color: white;
    background-image: linear-gradient(to right, $dark2, $secondary);
  }

  #dialog-title {
    font-size: 2em;
    background: linear-gradient(to right, rgb(33, 33, 33), rgb(0, 20, 56));
  }

  #dialog-date {
    font-size: 1.5em;
    text-align: right;
  }

  .movie-img {
    display: inline;
    height: auto;
    width: 200px;
    margin-right: 0px;
    margin-top: 0%;
  }

  #dialog-overview {
    margin: 55px;
    text-align: justify;
    font-size: 25px;
    color: $dark;
    line-height: 35px;
  }

  #dialog-average {
    color: $primary;
    background: $dark2;
    padding: 15px;
    font-size: 1.5em;
    font-weight: bold;
    text-align: center;
  }

  //****************************** TRAILER DIALOG ******************************//
  .videoDialog {
    margin: 0px;
    padding: 100px;
    width: 100%;
    height: 100%;
  }

  .closeDialog-btn {
    position: absolute;
    width: 100%;
    bottom: 20px;
    padding: 20px;
  }

  .video {
    height: 500px;
  }

  .trailerCardDialog {
    width: 100%;
    height: 100%;
    z-index: 999999;
    background: $dark2 !important;
  }

  .video-error {
    font-size: 1.5em;
    text-align: center;
  }

  .dialog {
    bottom: 0px;
    height: 100%;
    overflow: hidden;
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  body {
    background: $dark2;
  }

  #trending-sheet {
    background: linear-gradient(to right, $secondary, $dark2);
  }
  #trending-container {
    position: relative;
    top: 20px;
    animation: fadeIn ease 2s;
  }
  #trending-overview {
    padding: 50px;
    font-size: 30px;
    text-align: justify;
  }
  #no-overview {
    padding: 50px;
    text-align: justify;
    font-size: 40px;
    color: $secondary;
  }

  #trending-title {
    font-size: 3em;
    line-height: 60px;
    padding: 20px;
    font-family: $style2;
    text-transform: uppercase;
    text-align: justify;
  }

  #trending-date {
    font-size: 1em;
    position: absolute;
    right: 35px;
    color: $secondary;
  }

  #info-btn {
    position: absolute;
    right: 35px;
  }

  .movie-img {
    display: inline;
    height: auto;
    width: 300px;
    margin-right: 0px;
    margin-top: 0%;
  }

  #dialog-title {
    font-size: 2em;
    background: linear-gradient(to right, rgb(33, 33, 33), rgb(0, 20, 56));
  }

  #dialog-date {
    font-size: 2em;
    text-align: right;
  }

  #dialog-overview {
    margin: 55px;
    text-align: justify;
    font-size: 25px;
    color: $dark;
    line-height: 35px;
  }

  #dialog-average {
    color: $primary;
    background: $dark2;
    padding: 25px;
    font-size: 2em;
    font-weight: bold;
    text-align: center;
  }

  //****************************** TRAILER DIALOG ******************************//

  .videoDialog {
    margin: 0px;
    padding: 100px;
    width: 100%;
    height: 100%;
  }

  .closeDialog-btn {
    position: absolute;
    bottom: 20px;
    width: 100%;
    padding: 20px;
  }

  .video {
    height: 700px;
  }

  .trailerCardDialog {
    width: 100%;
    height: 100%;
    z-index: 999999;
    background: $dark2 !important;
  }

  .video-error {
    font-size: 2em;
    text-align: center;
  }

  .dialog {
    bottom: 0px;
    height: 100%;
  }
}
</style>

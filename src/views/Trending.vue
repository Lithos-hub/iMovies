<template>
  <div>
    <SectionTitle :sectionName="name" />

    <!-- ************** TRAILER DIALOG ************** -->
    <div>
      <v-dialog class="dialog" v-model="trailerDialog" v-if="trailerDialog" overlay-opacity="10">
        <v-card height="100%" class="trailerCardDialog">
          <div class="row videoDialog">
            <v-sheet
              color="error"
              width="80%"
              height="80%"
              dark
              class="pa-5"
              v-if="message_error.length != 0"
            >
              <h1 class="video-error">{{ message_error }}</h1>
            </v-sheet>

            <iframe
              class="video"
              :src="video_url"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>

          <div class="closeDialog-btn">
            <v-btn color="error" block @click="trailerDialog = false"> Close </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>

    <v-sheet class="section-subtitle" elevation="10">Current popular movies</v-sheet>

    <v-container fluid id="trending-container">
      
      <!-- LIST OF MOVIES -->
      <v-row no-gutters>
        <div v-for="(item, i) in trending" :key="i">
          <v-col>
            <v-sheet width="80%" id="trending-sheet">
              <v-card-title id="trending-title"
                >{{ item.original_title }}
                <span id="trending-date">{{ item.release_date }}</span></v-card-title
              >
            </v-sheet>
          </v-col>
          <v-col class="d-flex">
            <img :src="url + item.poster_path" width="200" class="movie-img" />

            <p class="lead" id="trending-overview">
              <span class="small d-block mb-10">Overview:</span>
              {{ item.overview }}
              <br />
              <span id="no-overview" v-if="item.overview.length == 0">{{
                no_overview
              }}</span>
              <!-- SHOW INFO DIALOG BUTTON -->

              <v-btn
                
                class="large mt-5"
                v-on:click="movieID = item.id"
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
        v-model="dialog"
        width="800"
        height="100%"
        v-if="dialog"
        overlay-opacity="2"
      >
        <v-card>
          <v-card-title class="red white--text" id="dialog-title">
            {{ title }}
          </v-card-title>

       
          <v-card-text id="dialog-text" class="mt-5">
            <p id="dialog-date">Release date: {{ releaseDate }}</p>
            <p id="dialog-overview">Overview: {{ overview }}</p>

            <p id="dialog-average">Vote average: {{ average }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="pink" dark block @click="dialog = false"> Close </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import { mapActions, mapState } from "vuex";
import axios from "axios";


export default {
  components: {
    SectionTitle,
  },
  data() {
    return {
      name: "Trending",
      title: "",
      overview: "",
      releaseDate: "",
      average: "",
      dialog: false,
      trailerDialog: false,
      video_url: "",
      message_error: "",
      movieID: "",
      url: "https://image.tmdb.org/t/p/original",
      no_overview: "We are sorry. This movie has not available overview.",
    };
  },
  computed: {
    ...mapState(["trending"]),
  },
  methods: {
    ...mapActions(["getTrending"]),
    getMovieTrailer() {
      const apikey = "c9a3e87b703c630c13d5ea61ef62c7b6";
      const id = this.movieID;
      const video_url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apikey}&language=en-US`;

      return new Promise((resolve) => {
      axios
        .get(video_url)
        .then((resp) => {
          this.trailerDialog = true;

          const key = resp.data.results[0].key;

          const youtube_video = "https://www.youtube.com/embed/" + key;

          this.video_url = youtube_video;
        })
        .catch((e) => {
          console.log("Trailer movie 1 " + e);
          this.message_error = "Sorry. This video is no available.";
          });
        })
      },
    // ********* //
    showInfo(item) {
      this.dialog = true;
      this.title = item.original_title;
      this.overview = item.overview;
      this.releaseDate = item.release_date;
      this.average = item.vote_average;
    }
  },
  created() {
    this.getTrending();
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
    position: absolute;
    top: 200px;
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
    font-size: 2em;
  }

  #dialog-date {
    font-size: 1.5em;
    text-align: right;
  }

  #dialog-overview {
    margin: 10px;
    text-align: justify;
    font-size: 20px;
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

  .section-subtitle {
    font-family: $style3;
    font-size: 2em;
    text-align: center;
    margin-bottom: 20px;
    letter-spacing: 4px;
    background: url("../assets/img/background7.jpg");
    text-shadow: 0px 0px 10px black;
    filter: contrast(0.9);
    background-repeat: repeat;
    color: $secondary !important;
    animation: move 2s ease-in-out;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  //****************************** TRAILER DIALOG ******************************//
  .videoDialog {
    margin: 0px;
    padding: 10px;
    width: 100%;
    overflow: hidden;
  }

  .closeDialog-btn {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    padding: 0px;
  }

  .video {
    height: 450px;
  }

  .trailerCardDialog {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 999999;
    background: $dark2 !important;
  }

  .video-error {
    font-size: 3em;
    text-align: center;
  }

  .dialog {
    bottom: 0px;
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
    position: absolute;
    top: 200px;
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
    font-size: 1.5em;
    background: linear-gradient(to right, $dark2, $primary);
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
    font-size: 15px;
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

  .section-subtitle {
    font-family: $style3;
    font-size: 2em;
    text-align: center;
    margin-bottom: 20px;
    letter-spacing: 4px;
    background: url("../assets/img/background7.jpg");
    text-shadow: 0px 0px 10px black;
    filter: contrast(0.9);
    background-repeat: repeat;
    color: $secondary !important;
    animation: move 2s ease-in-out;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  //****************************** TRAILER DIALOG ******************************//
  .videoDialog {
    margin: 0 auto;
    padding: 20px;
    width: 90%;
    overflow: hidden;
  }

  .closeDialog-btn {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    padding: 10px;
  }

  .video {
    height: 500px;
  }

  .trailerCardDialog {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 999999;
    background: $dark2 !important;
  }

  .video-error {
    font-size: 3em;
    text-align: center;
  }

  .dialog {
    bottom: 0px;
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
    position: absolute;
    top: 200px;
    animation: fadeIn ease 2s;
  }
  #trending-overview {
    padding: 50px;
    font-size: 40px;
    text-align: justify;
  }
  #no-overview {
    padding: 50px;
    text-align: justify;
    font-size: 40px;
    color: $secondary;
  }

  #trending-title {
    font-size: 4em;
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
    font-size: 3em;
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

  .section-subtitle {
    font-family: $style3;
    font-size: 2em;
    text-align: center;
    margin-bottom: 20px;
    letter-spacing: 4px;
    background: url("../assets/img/background7.jpg");
    text-shadow: 0px 0px 10px black;
    filter: contrast(0.9);
    background-repeat: repeat;
    color: $secondary !important;
    animation: move 2s ease-in-out;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

   //****************************** TRAILER DIALOG ******************************//

  .videoDialog {
    padding: 20px;
    width: 100%;
    overflow: hidden;
  }

 .closeDialog-btn {
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    padding: 10px;
  }

  .video {
    height: 700px;
  }

  .trailerCardDialog {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 999999;
    background: $dark2 !important;
  }

  .video-error {
    font-size: 3em;
    text-align: center;
  }

  .dialog {
    bottom: 0px;
    overflow: hidden;
  }
}
</style>

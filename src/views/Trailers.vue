<template>
  <div>
    <SectionTitle :sectionName="name" />

    <div>
      <v-dialog class="dialog" v-model="dialog" v-if="dialog" overlay-opacity="10">
        <v-card height="100%" class="cardDialog">
          <div class="row videoDialog">
            <v-sheet
              color="error darken-2"
              width="100%"
              height="100%"
              dark
              class="pa-5"
              v-show="videoError.length != 0"
            >
              <h1 class="video-error">{{ videoError }}</h1>
            </v-sheet>

            <iframe
              class="video"
              :src="trailerVideo"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              v-show="videoError.length != 0 ? false : true"
            ></iframe>
          </div>

          <div class="closeDialog-btn">
            <v-btn color="error" block @click="dialog = false"> Close </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>

    <!-- END OF DIALOGS -->

    <v-sheet class="section-subtitle" elevation="10"
      >Check out the latest trailers</v-sheet
    >

    <div id="trailers-container">
      <div class="row no-gutters">
        <div class="col-lg-3" v-for="(item, i) in moviesArray" :key="i">
          <v-card class="card">
            <img
              :src="url + item.poster_path"
              class="card-img"
              id="movie-img"
              v-on:click="getTrailerVideo(item)"
              @click="showDialog()"
            />

            <h4 class="card-title" id="movie-title">{{ item.original_title }}</h4>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import { mapActions, mapState } from "vuex";
import axios from "axios";

export default {
  name: "Trailers",
  components: {
    SectionTitle,
  },
  data() {
    return {
      name: "Trailers",
      url: "https://image.tmdb.org/t/p/original",
      video: "",
      movieTitle: "",
      videoDialog: "",
      dialog: false,
      moviesArray: [],
      moviesIDs: [],
      moviesVideos: [],
      trailerVideo: "",
      videoError: "",
    };
  },
  methods: {
    getLatestMovies() {
      const url = "https://api.themoviedb.org/3";

      const apikey = "c9a3e87b703c630c13d5ea61ef62c7b6";

      let date = new Date();

      const dateGreaterThan = `${date.getFullYear()}-${(
        "0" +
        (date.getMonth() + 1)
      ).slice(-2)}-${("0" + (date.getDate() - 10)).slice(-2)}`;

      const dateLessThan = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
        -2
      )}-${("0" + date.getDate()).slice(-2)}`;

      const latestMovies = `${url}/discover/movie?primary_release_date.gte=${dateGreaterThan}&primary_release_date.lte=${dateLessThan}&api_key=${apikey}&language=en-EN&include_video=true`;

      return new Promise((resolve) => {
        axios
          .get(latestMovies)
          .then((resp) => {
            const movies_array = [];
            const movies_IDs = [];

            for (let i = 0; i < 20; i++) {
              movies_array.push(resp.data.results[i]);
              movies_IDs.push(resp.data.results[i].id);
            }

            console.log(movies_array);
            console.log(movies_IDs);

            this.moviesArray = movies_array;
            this.moviesIDs = movies_IDs;
          })
          .catch((e) => {
            console.info("Global trailer errors: " + e);
          });
      });
    },
    showDialog() {
      this.dialog = true;
    },
    getTrailerVideo(item) {
      const apikey = "c9a3e87b703c630c13d5ea61ef62c7b6";
      const movieURL = `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${apikey}&language=en-US`;

      axios
        .get(movieURL)
        .then((resp) => {
          this.videoError = "";
          let videoKey = resp.data.results[0].key;
          let video = "https://www.youtube.com/embed/" + videoKey;
          this.trailerVideo = video;
        })
        .catch((e) => {
          console.log("Trailer movie 1 " + e);
          this.videoError = "Sorry. This video is no available.";
        });
    },
  },
  mounted() {
    this.getLatestMovies();
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  #trailers-container {
    position: relative;
    margin: 0px;
    width: 100%;
    margin-bottom: 50px;
    height: 100%;
    text-align: center;
  }

  .card-title {
    text-align: center;
    font-weight: bold;
    color: $secondary;
    padding: 0px;
    font-size: 2em;
    letter-spacing: 5px;
    transition: 0.5s;
    display: hidden;
    opacity: 0;
  }

  .card-img {
    height: 100%;
  }

  .card-title {
    margin-bottom: -150px;
  }

  .card {
    margin: 0px;
    margin-bottom: 100px;
    width: 100%;
    overflow: hidden;
  }

  //****************************** DIALOG ******************************//

  .videoDialog {
    margin: 0px;
    padding: 0px;
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

  .cardDialog {
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

  .section-subtitle {
    font-family: $style3;
    font-size: 2em;
    text-align: center;
    margin-bottom: 20px;
    letter-spacing: 4px;
    background: url("../assets/img/background4.jpg");
    background-repeat: repeat;
    color: $dark2 !important;
    text-shadow: 0px 0px 10px rgb(255, 255, 255);
    animation: move 2s ease-in-out;
  }

  @keyframes move {
    from {
      margin-left: -5000px;
      opacity: 0;
    }
    to {
      margin-left: 0px;
      opacity: 1;
    }
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  #trailers-container {
    position: relative;
    margin: 0 auto;
    width: 90%;
    margin-bottom: 50px;
    height: 100%;
    text-align: center;
  }

  .card-title {
    text-align: center;
    font-weight: bold;
    color: $secondary;
    padding: 0px;
    font-size: 1em;
    letter-spacing: 5px;
    transition: 0.5s;
    display: hidden;
    opacity: 0;
  }

  .card-img {
    width: 80%;
    min-height: 150px;
    transition: 2s;
    &:hover {
      width: 50%;
      height: 50%;
      cursor: pointer;
      transform: scale(1.1);

      margin-bottom: 20px;
    }
  }

  .card-title {
    margin-bottom: -150px;
  }

  .card {
    margin: 5px;
    margin-bottom: 20px;
    width: 100%;
    overflow: hidden;
    background: $dark2 !important;
    border: 2px solid $secondary !important;
    transition: 1s;
    &:hover {
      .card-title {
        display: block;
        opacity: 1;
        margin-bottom: 0px;
      }
    }
  }

  //****************************** DIALOG ******************************//

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

  .cardDialog {
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

  .section-subtitle {
    font-family: $style3;
    font-size: 2em;
    text-align: center;
    margin-bottom: 20px;
    letter-spacing: 4px;
    background: url("../assets/img/background4.jpg");
    background-repeat: repeat;
    color: $dark2 !important;
    text-shadow: 0px 0px 10px rgb(255, 255, 255);
    animation: move 2s ease-in-out;
  }

  @keyframes move {
    from {
      margin-left: -5000px;
      opacity: 0;
    }
    to {
      margin-left: 0px;
      opacity: 1;
    }
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  #trailers-container {
    position: relative;
    margin: 0 auto;
    width: 90%;
    margin-bottom: 50px;
    height: 100%;
    text-align: center;
  }

  .card-title {
    text-align: center;
    font-weight: bold;
    color: $secondary;
    padding: 0px;
    font-size: 2em;
    letter-spacing: 5px;
    transition: 2s;
    display: hidden;
    opacity: 0;
  }

  .card-img {
    width: 80%;
    min-height: 150px;
    transition: 2s;
    &:hover {
      width: 50%;
      height: 50%;
      cursor: pointer;
      transform: scale(1.1);

      margin-bottom: 20px;
    }
  }

  .card-title {
    margin-bottom: -150px;
  }

  .card {
    margin: 5px;
    margin-bottom: 20px;
    width: 100%;
    overflow: hidden;
    background: $dark2 !important;
    border: 2px solid $secondary !important;
    transition: 1s;
    &:hover {
      .card-title {
        display: block;
        opacity: 1;
        margin-bottom: 0px;
      }
    }
  }
  //****************************** DIALOG ******************************//

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

  .cardDialog {
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

  .section-subtitle {
    font-family: $style3;
    font-size: 2em;
    text-align: center;
    margin-bottom: 20px;
    letter-spacing: 4px;
    background: url("../assets/img/background4.jpg");
    background-repeat: repeat;
    color: $dark2 !important;
    text-shadow: 0px 0px 10px rgb(255, 255, 255);
    animation: move 2s ease-in-out;
  }

  @keyframes move {
    from {
      margin-left: -5000px;
      opacity: 0;
    }
    to {
      margin-left: 0px;
      opacity: 1;
    }
  }
}
</style>

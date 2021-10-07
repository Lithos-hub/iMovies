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

    <!-- END OF DIALOGS -->

    <div id="trailers-container">
      <div class="row no-gutters">
        <div class="col-lg-3" v-for="(item, i) in moviesArray" :key="i">
          <v-card class="card">
            <img
              :src="
                item.poster_path != null ? url + item.poster_path : no_image
              "
              class="card-img"
              id="movie-img"
              v-on:click="getTrailerVideo(item)"
              @click="dialog = true"
            />

            <h4 class="card-title" id="movie-title">
              {{ item.original_title }}
            </h4>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import TrailerDialog from "../components/TrailerDialog";

import axios from "axios";
import { mapActions } from 'vuex';

export default {
  name: "Trailers",
  components: {
    SectionTitle,
    TrailerDialog,
  },
  data() {
    return {
      subtitle: "Latest released trailers",
      url: "https://image.tmdb.org/t/p/original",
      no_image: require("../assets/img/no-image.jpg"),
      video: "",
      movieTitle: "",
      dialog: false,
      moviesArray: [],
      moviesIDs: [],
      moviesVideos: [],
      trailerVideo: "",
      videoError: "",
    };
  },
  mounted () {
    this.getLatestReleases()
  },
  methods: {
    ...mapActions(['getLatestReleases']),
    async getTrailerVideo(item) {
      const apikey = "c9a3e87b703c630c13d5ea61ef62c7b6";
      const movieURL = `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${apikey}&language=en-US`;

      await axios
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
    padding: 1rem;
    font-size: 2em;
    letter-spacing: 5px;
    transition: 0.5s;
    display: hidden;
    opacity: 1;
    color: $secondary;
    margin-bottom: auto;
  }

  .card-img {
    height: auto;
  }
  .card {
    margin: 1rem;
    margin-bottom: 100px;
    width: 90%;
    overflow: hidden;
    background: $dark;
    color: $secondary;
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
    padding: 1rem;
    font-size: 1em;
    letter-spacing: 5px;
    transition: 0.5s;
    display: hidden;
    opacity: 0;
    margin-bottom: -150px;
  }

  .card-img {
    width: 100%;
    height: auto;
    transition: 1s;
    &:hover {
      width: 50%;
      height: 50%;
      cursor: pointer;
      transform: scale(1.1);

      margin-bottom: 20px;
    }
  }

  .card {
    margin: 0 auto;
    margin-bottom: 20px;
    width: 18rem;
    max-height: 85%;
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
    padding: 1rem;
    font-size: 2em;
    letter-spacing: 5px;
    transition: 1s;
    display: hidden;
    opacity: 0;
    margin-bottom: -150px;
  }

  .card-img {
    width: 100%;
    height: auto;
    transition: 1s;
    &:hover {
      width: 50%;
      height: 50%;
      cursor: pointer;
      transform: scale(1.1);

      margin-bottom: 20px;
    }
  }

  .card {
    margin: 0 auto;
    margin-bottom: 20px;
    width: 25rem;
    max-height: 80%;
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
}
</style>

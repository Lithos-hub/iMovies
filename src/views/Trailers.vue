<template>
  <div>
    <SectionTitle :sectionSubtitle="subtitle" />

<!-- TRAILER DIALOG -->

    <TrailerDialog :dialog="dialog" :trailerVideo="trailerVideo" :videoError="videoError"/>

    <!-- END OF DIALOGS -->

    <div id="trailers-container">
      <div class="row no-gutters">
        <div class="col-lg-3" v-for="(item, i) in moviesArray" :key="i">
          <v-card class="card">
            <img
              :src="item.poster_path != null ? url + item.poster_path : no_image"
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
import TrailerDialog from "../components/TrailerDialog";

import { mapActions, mapState } from "vuex";
import axios from "axios";

export default {
  name: "Trailers",
  components: {
    SectionTitle,
    TrailerDialog
  },
  data() {
    return {
      subtitle: "Latest released trailers",
      url: "https://image.tmdb.org/t/p/original",
      no_image: require("../assets/img/no-image.jpg"),
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

      const dateGreaterThan = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + (date.getDate() - 10)).slice(-2)}`;

      const dateLessThan = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;

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

}
</style>

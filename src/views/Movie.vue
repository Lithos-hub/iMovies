<template>
  <div>
    <!-- TRAILER DIALOG -->
    <TrailerDialog
      :dialog="dialog"
      :trailerVideo="trailerVideo"
      :videoError="videoError"
    />

    <!-- ************** MOVIE CARD CONTENT ************** -->
    <v-container class="pa-5">
      <v-card class="pa-5 d-flex" height="100%" width="100%" id="card">
        <v-img :src="url + movieDetails.poster_path" id="movie-img"></v-img>

        <v-card-title id="movie-title"
          >{{ movieDetails.title }}
          <p id="movie-date">
            Release date:
            <span style="color: cyan">{{ movieDetails.release_date }}</span>
          </p></v-card-title
        >

        <v-container id="movie-text">
          <v-card-title class="error white--text rounded pa-2"
            >Overview</v-card-title
          >
          <p id="movie-overview">
            {{ movieDetails.overview }}
          </p>
          <v-card-title class="green white--text rounded pa-2"
            >Vote average</v-card-title
          >
          <p id="movie-note">{{ movieDetails.vote_average }}</p>
          <v-card-title class="blue white--text rounded pa-2"
            >Vote count</v-card-title
          >
          <p id="movie-count">{{ movieDetails.vote_count }}</p>
          <v-card-title class="orange white--text rounded pa-2"
            >Original language</v-card-title
          >
          <p id="movie-language">
            {{ movieDetails.spoken_languages[0].english_name }}
          </p>
          <div class="d-flex justify-content-around">
            <v-btn
              color="indigo"
              class="font-weight-bold mt-5"
              dark
              elevation="10"
              id="come-back-btn"
              @click="comeBack()"
              >Come back</v-btn
            >
            <v-btn
              color="deep-orange darken-4"
              class="font-weight-bold mt-5"
              elevation="10"
              dark
              id="trailer-btn"
              @click="getMovieTrailer()"
              >View trailer</v-btn
            >
          </div>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import TrailerDialog from "../components/TrailerDialog";

export default {
  name: "Movie",
  components: {
    TrailerDialog,
  },
  data() {
    return {
      movieDetails: {},
      url: "https://image.tmdb.org/t/p/original",
      trailerVideo: "",
      videoError: "",
      dialog: false,
    };
  },
  mounted() {
    this.getMovieDetails();
  },
  methods: {
    comeBack() {
      this.$router.go(-1);
    },
    getMovieDetails() {
      const apikey = "c9a3e87b703c630c13d5ea61ef62c7b6";
      const movie = `https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=${apikey}&language=en-US`;

      return new Promise((resolve) => {
        axios
          .get(movie)
          .then((resp) => {
            this.movieDetails = resp.data;
          })
          .catch((e) => {
            console.log(e);
          });
      });
    },
    getMovieTrailer() {
      const apikey = "c9a3e87b703c630c13d5ea61ef62c7b6";
      const video_url = `https://api.themoviedb.org/3/movie/${this.$route.params.id}/videos?api_key=${apikey}&language=en-US`;

      return new Promise((resolve) => {
        axios
          .get(video_url)
          .then((resp) => {
            this.dialog = true;

            const key = resp.data.results[0].key;

            const youtube_video = "https://www.youtube.com/embed/" + key;

            this.trailerVideo = youtube_video;
          })
          .catch((e) => {
            console.log(e);
            this.videoError = "Sorry. This video is no available.";
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  #movie-title {
    font-size: 2em;
    position: absolute;
    text-align: justify;
    width: 100%;
    background: $dark2;
    color: $secondary;
  }

  #movie-img {
    top: 50px;
    width: 500px;
    height: 700px;
    margin-bottom: 50px;
    position: absolute;
  }

  #movie-text {
    font-size: 15px;
    color: white;
    position: relative;
    text-align: justify;
    top: 800px;
    margin-left: 0px;
    margin-right: 0px;
  }

  #movie-date {
    position: absolute;
    right: 0px;
    font-size: 16px;
    color: white;
    bottom: 0px;
  }

  #movie-overview,
  #movie-note,
  #movie-count,
  #movie-language {
    margin: 5px;
  }

  #card {
    padding: 0px !important;
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  #movie-title {
    font-size: 2.5em;
    position: absolute;
    top: 15px;
    background: $dark2;
    padding: 20px;
    color: $secondary;
    width: 100%;
  }

  #movie-img {
    top: 50px;
    width: 250px;
    height: 450px;
    margin-bottom: 50px;
    position: relative;
  }

  #movie-text {
    top: 60px;
    padding-bottom: 100px;
    color: $dark2;
    position: relative;
    text-align: justify;
    margin-left: 20px;
    margin-right: 20px;
  }

  #movie-date {
    position: absolute;
    right: 55px;
    font-size: 20px;
    color: white;
    bottom: 10px;
  }

  #movie-overview,
  #movie-note,
  #movie-count,
  #movie-language {
    margin: 20px;
  }

  #card {
    padding: 30px !important;
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  #movie-title {
    font-size: 4em;
    position: absolute;
    top: 15px;
    background: $dark2;
    padding: 30px;
    color: $secondary;
    width: 100%;
  }

  #movie-img {
    top: 50px;
    width: 450px;
    height: 700px;
    margin-bottom: 50px;
    position: relative;
  }

  #movie-text {
    font-size: 1.5em;
    top: 70px;
    color: $dark2;
    position: relative;
    text-align: justify;
    margin-left: 50px;
    margin-right: 50px;
  }

  #movie-date {
    position: absolute;
    right: 55px;
    font-size: 40px;
    color: white;
    bottom: 10px;
  }

  #movie-overview,
  #movie-note,
  #movie-count,
  #movie-language {
    margin: 20px;
  }

  #card {
    padding: 50px !important;
  }
}
</style>

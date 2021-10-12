<template>
  <div>
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

    <!-- ************** MOVIE CARD CONTENT ************** -->
      <v-card tile class="pa-5 d-flex" height="75%" width="100%" id="card">
    <v-container class="d-flex">
        <v-img :src="imageURL + movieDetails.poster_path" id="movie-img"></v-img>

        <v-card-title id="movie-title" class="text-h2 blue--text"
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
            <v-row>
            <v-col class="text-center">
              <v-btn
                block
                class="d-block my-1 ml-auto"
                width="auto"
                color="secondary"
                large
                tile
                @click="comeBack()"
                dark
                id="trailer-btn"
                ><span class="white--text">Come back</span></v-btn>
            </v-col>
            <v-col class="text-center">
              <v-btn
                block
                class="d-block my-1 ml-auto"
                width="auto"
                color="red"
                large
                tile
                @click="getTrailer(movieDetails)"
                dark
                id="trailer-btn"
                ><span class="white--text">View trailer</span></v-btn>
            </v-col>
            <v-col class="text-center">
              <v-btn
                block
                class="d-block my-1 ml-auto"
                width="auto"
                color="purple"
                large
                tile
                @click="showAddToDialog(true); setAddMovie(movieDetails)"
                dark
                id="add-to-btn"
                ><span class="white--text">Add to My Movies</span></v-btn>
              </v-col>
           </v-row>
        </v-container>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import TrailerDialog from "../components/TrailerDialog";
import AddToDialog from "../components/AddToDialog";
import { mapActions, mapState } from 'vuex';

export default {
  name: "Movie",
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
    this.getMovieDetails(this.$route.params.id);
  },
  destroyed() {
    commit('setMovieDetails', {})
  },
  computed: {
    ...mapState(['movieDetails', 'trailerVideo', 'addToDialog', 'imageURL'])
  },
  methods: {
    ...mapActions(['getMovieDetails', 'getMovieTrailer', 'showAddToDialog', 'setAddMovie']),
    getTrailer(movieDetails) {
      this.trailerDialog = true
      this.getMovieTrailer({ type: 'other', id: movieDetails.id })
    },
    comeBack() {
      this.$router.go(-1);
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
    right: 10%;
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

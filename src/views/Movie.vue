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
  <v-sheet id="sheet" color="transparent" tile :class="isUsingMobile ? 'pa-0' : 'pa-5'">
    <v-container fluid :class="isUsingMobile ? 'ma-0' : 'd-flex ma-5 mb-10'">
        <v-img :src="imageURL + movieDetails.poster_path" id="movie-img"></v-img>

        <v-card-title id="movie-title" :class="isUsingMobile ? '' : 'text-h2 blue--text d-flex justify-space-between'"
          >
          <div>
            {{ movieDetails.title }}
          </div>
          <div>
            <p id="movie-date">
            {{ $t('view-movie-id.releaseDate') }}
              <span style="color: cyan">{{ movieDetails.release_date }}</span>
          </p>
          </div>
          </v-card-title>

        <v-container id="main-content">
          <v-card-title class="gradient-background-4 white--text rounded pa-2 my-5">{{ $t('view-movie-id.overview') }}</v-card-title>
          <p class="cyan--text" id="movie-overview">
            {{ movieDetails.overview }}
          </p>
          <v-card-title class="gradient-background-4 white--text rounded pa-2 my-5">{{ $t('view-movie-id.average') }}</v-card-title>
          <p class="cyan--text" id="movie-note">{{ movieDetails.vote_average }}</p>
          <v-card-title class="gradient-background-4 white--text rounded pa-2 my-5">{{ $t('view-movie-id.votes') }}</v-card-title>
          <p class="cyan--text" id="movie-count">{{ movieDetails.vote_count }}</p>
          <v-card-title class="gradient-background-4 white--text rounded pa-2 my-5">{{ $t('view-movie-id.language') }}</v-card-title>
          <p v-for="(lang, i) in movieDetails.spoken_languages" :key="i" class="cyan--text" id="movie-language">
            {{ computeLang(lang.english_name) }}
          </p>
          <v-row id="buttons-row" class="d-flex justify-space-between">
            <v-col class="text-center">
              <v-btn
                block
                class="d-block my-1 ml-auto"
                width="auto"
                color="secondary"
                large
                outlined
                tile
                @click="comeBack()"
                dark
                id="trailer-btn"
                ><span class="white--text">{{ $t('app-buttons.comeback') }}</span></v-btn>
            </v-col>
            <v-col class="text-center">
              <v-btn
                block
                class="d-block my-1 ml-auto"
                width="auto"
                color="red"
                large
                outlined
                tile
                @click="getTrailer(movieDetails)"
                dark
                id="trailer-btn"
                >
                <span v-if="!isUsingMobile" class="white--text">{{ $t('app-buttons.view') }}</span>
                <v-icon class="white--text" v-else>mdi-youtube</v-icon>
              </v-btn>
            </v-col>
            <v-col class="text-center">
              <v-btn
                block
                class="d-block my-1 ml-auto"
                width="auto"
                color="purple"
                large
                outlined
                tile
                @click="setAddMovie(movieDetails), showAddToDialog(true)"
                dark
                id="add-to-btn"
                >
                <span v-if="!isUsingMobile" class="white--text">{{ $t('app-buttons.add') }}</span>
                <v-icon class="white--text" v-else>mdi-plus</v-icon>
              </v-btn>
              </v-col>
            </v-row>
        </v-container>
      </v-container>
    </v-sheet>
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
    this.$store.commit('setMovieDetails', {})
  },
  computed: {
    ...mapState(['movieDetails', 'trailerVideo', 'addToDialog', 'imageURL']),
    isUsingMobile() {
      return this.$vuetify.breakpoint.xs;
    },
  },
  methods: {
    ...mapActions(['getMovieDetails', 'getMovieTrailer', 'showAddToDialog', 'setAddMovie']),
    getTrailer(movieDetails) {
      this.trailerDialog = true
      this.getMovieTrailer({ type: 'other', id: movieDetails.id })
    },
    comeBack() {
      this.$store.commit("setComesFromDetails", true);
      setTimeout(() => { 
        this.$router.go(-1);
      }, 500)
    },
    computeLang(lang) {
      let spoken_language = this.$t(`languages.${lang.toLowerCase()}`)
      return spoken_language.charAt(0).toUpperCase() + spoken_language.slice(1);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";
@import "src/scss/app";

#buttons-row { 
  margin-top: auto;
}

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  #movie-title {
    font-size: 1em;
    position: relative;
    text-align: center;
    width: auto;
    display: block;
    background: $dark2;
    color: $secondary;
    padding: 0;
  }

  #movie-img {
    top: auto;
    width: 100%;
    height: 100%;
    margin-bottom: 0px;
    position: relative;
  }

  #main-content {
    font-size: 15px;
    color: white;
    position: relative;
    text-align: justify;
    top: 0em;
    margin-left: 0px;
    margin-right: 0px;
  }

  #movie-date {
    position: relative;
    right: 0px;
    font-size: 12px;
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

  #main-content {
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
    padding-block: 30px;
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

  #main-content {
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
    margin: 5px;
  }

  #card {
    height: 1000px !important;
    max-height: 100%;
  }
}
</style>

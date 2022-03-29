<template>
  <div>
    <!-- TRAILER DIALOG -->
    <TrailerDialog
      v-if="trailerDialog"
      :video="trailerVideo"
      @close-dialog="trailerDialog = false"
    />

    <!-- ADD TO MY MOVIES DIALOG -->
    <AddToDialog v-if="addToDialog" />

    <!-- ************** MOVIE CARD CONTENT ************** -->
    <v-container fluid :class="isUsingMobile ? 'pa-0' : ''">
      <v-row
        id="movie-title"
        :class="isUsingMobile ? '' : 'text-h2 blue--text mt-5'"
      >
        <div>
          {{ movieDetails.title }}
        </div>
        <div class="mt-5">
          <p id="movie-date">
            {{ $t("view-movie-id.releaseDate") }}
            <span style="color: cyan">{{ movieDetails.release_date }}</span>
          </p>
        </div>
      </v-row>
      <v-row id="main-content" class="mx-5">
        <v-col xs="12" sm="12" md="3">
          <v-img
            :src="imageURL + movieDetails.poster_path"
            id="movie-img"
          ></v-img>
        </v-col>
        <v-col>
          <v-row>
            <v-col md="4" class="justify-center">
              <v-card-title
                class="
                  gradient-background-4
                  justify-center
                  white--text
                  rounded
                  pa-2
                  my-5
                "
                >{{ $t("view-movie-id.overview") }}</v-card-title
              >
              <p class="cyan--text" id="movie-overview">
                {{ movieDetails.overview }}
              </p>
            </v-col>
            <v-col xs="12" sm="12" md="4" cols="12" class="justify-center">
              <v-card-title
                class="
                  gradient-background-4
                  justify-center
                  white--text
                  rounded
                  pa-2
                  my-5
                "
                >{{ $t("view-movie-id.average") }}
              </v-card-title>
              <p class="text-h4 cyan--text text-center" id="movie-note">
                {{ movieDetails.vote_average }}
                <span id="vote-acount"
                  >({{ movieDetails.vote_count }} votes)</span
                >
              </p>
            </v-col>
            <v-col xs="12" sm="12" cols="12" md="4" class="justify-center">
              <v-card-title
                class="
                  gradient-background-4
                  justify-center
                  white--text
                  rounded
                  pa-2
                  my-5
                "
                >{{ $t("view-movie-id.language") }}
              </v-card-title>
              <v-row no-gutters>
                <v-col
                  v-for="(lang, i) in movieDetails.spoken_languages"
                  :key="i"
                  class="cyan--text text-center"
                  id="movie-language"
                >
                  {{ computeLang(lang.english_name) }}
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="4" class="justify-center">
              <v-card-title
                class="
                  gradient-background-4
                  justify-center
                  white--text
                  rounded
                  pa-2
                  my-5
                "
                >{{ $t("view-movie-id.casting") }}
              </v-card-title>
              <v-row>
                <v-col class="text-left">
                  <p
                    v-for="(cast, j) in movieDetails.cast.slice(0, 11)"
                    :key="'A' + j"
                    class="ma-0"
                  >
                    <v-icon color="primary" size="10" class="mr-2"
                      >mdi-circle</v-icon
                    >
                    <span class="font-weight-bold white--text mr-3">{{
                      cast.name
                    }}</span>
                    <span class="info--text mr-2" v-if="cast.character">{{
                      $t("view-trending.as")
                    }}</span>
                    <span class="white--text">{{ cast.character }}</span>
                  </p>
                </v-col>
              </v-row>
            </v-col>
            <v-col xs="12" sm="12" cols="12" md="4" class="justify-center">
              <v-card-title
                class="
                  gradient-background-4
                  justify-center
                  white--text
                  rounded
                  pa-2
                  my-5
                "
                >{{ $t("view-movie-id.genres") }}
              </v-card-title>
              <v-row class="my-auto justify-center">
                <v-col
                  v-for="(genre, z) in movieDetails.genres.map(
                    (item) => item.name
                  )"
                  :key="'A' + z"
                  id="movie-genres"
                >
                  {{ genre }}
                </v-col>
              </v-row>
            </v-col>
            <v-col xs="12" sm="12" cols="12" md="4" class="justify-center">
              <v-card-title
                class="
                  gradient-background-4
                  justify-center
                  white--text
                  rounded
                  pa-2
                  my-5
                "
                >{{ $t("view-movie-id.extraInfo") }}
              </v-card-title>
              <p>
                {{ $t("view-movie-id.budget") }}
                <span
                  :class="
                    movieDetails.budget !== 0 ? 'primary--text' : 'red--text'
                  "
                  >{{
                    movieDetails.budget !== 0 ? movieDetails.budget.toLocaleString("en-UK") :
                    "No info available"
                  }}
                </span>
                <span v-if="movieDetails.budget !== 0">$</span>
              </p>
              <p>
                {{ $t("view-movie-id.revenue") }}
                <span
                  :class="
                    movieDetails.revenue !== 0 ? 'primary--text' : 'red--text'
                  "
                  >{{
                    movieDetails.revenue !== 0 ? movieDetails.revenue.toLocaleString("en-UK") :
                    "No info available"
                  }}</span
                >
                <span v-if="movieDetails.revenue !== 0"> $</span>
                <v-icon size="20" :class="getPositiveRevenues(movieDetails.budget, movieDetails.revenue) ? 'ml-5 success--text triangle-up' : 'ml-5 mr-2 red--text triangle-down'">
                  mdi-triangle
                </v-icon>
                <span :class="getPositiveRevenues(movieDetails.budget, movieDetails.revenue) ? 'success--text' : 'red--text'">{{ getRevenueDif(movieDetails.budget, movieDetails.revenue).toLocaleString('es-UK') }}$</span>
              </p>
              <p>
                {{ $t("view-movie-id.homepage") }}
                <a
                  v-if="movieDetails.homepage"
                  :href="imageURL + movieDetails.homepage"
                  >{{
                    movieDetails.homepage
                      .replace("https://", "")
                      .replace("http://", "")
                  }}</a
                >
                <span v-else class="red--text">No website</span>
              </p>
              <p>{{ $t("view-movie-id.mainComp") }}</p>
              <v-row class="justify-center">
                <v-col cols="12" class="text-center">
                  <div
                    v-if="movieDetails.production_companies[0].logo_path"
                    class="productionCompanies__img-wrapper"
                  >
                    <v-img
                      :src="
                        imageURL +
                        movieDetails.production_companies[0].logo_path
                      "
                      width="200px"
                      height="auto"
                      class="mx-auto"
                    />
                  </div>
                  <div class="pt-2">
                    {{ movieDetails.production_companies[0].name }}
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row id="buttons-row" class="d-flex justify-space-between">
            <v-col md="4" class="justify-center">
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
                ><span class="white--text">{{
                  $t("app-buttons.comeback")
                }}</span></v-btn
              >
            </v-col>
            <v-col md="4" class="justify-center">
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
                <span v-if="!isUsingMobile" class="white--text">{{
                  $t("app-buttons.view")
                }}</span>
                <v-icon class="white--text" v-else>mdi-youtube</v-icon>
              </v-btn>
            </v-col>
            <v-col md="4" class="justify-center">
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
                <span v-if="!isUsingMobile" class="white--text">{{
                  $t("app-buttons.add")
                }}</span>
                <v-icon class="white--text" v-else>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TrailerDialog from "../components/TrailerDialog";
import AddToDialog from "../components/AddToDialog";
import { mapActions, mapState } from "vuex";

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
    this.$store.commit("setMovieDetails", {});
  },
  computed: {
    ...mapState(["movieDetails", "trailerVideo", "addToDialog", "imageURL"]),
    isUsingMobile() {
      return this.$vuetify.breakpoint.xs;
    },
  },
  methods: {
    ...mapActions([
      "getMovieDetails",
      "getMovieTrailer",
      "showAddToDialog",
      "setAddMovie",
    ]),
    getTrailer(movieDetails) {
      this.trailerDialog = true;
      this.getMovieTrailer({ type: "other", id: movieDetails.id });
    },
    comeBack() {
      this.$store.commit("setComesFromDetails", true);
      setTimeout(() => {
        this.$router.go(-1);
      }, 500);
    },
    computeLang(lang) {
      let spoken_language = this.$t(`languages.${lang.toLowerCase()}`);
      return spoken_language.charAt(0).toUpperCase() + spoken_language.slice(1);
    },
    getPositiveRevenues(budget, revenue) {
      if (revenue > budget) {
        return true;
      } else {
        return false;
      }
    },
    getRevenueDif(budget, revenue) {
      return (parseInt(revenue) - parseInt(budget));
    }
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";
@import "src/scss/app";

p {
  font-size: 16px;
}

#vote-acount {
  font-size: 13px;
  color: white;
}

.productionCompanies__img-wrapper {
  background: white;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
}

.triangle-down {
  transform: rotate(180deg);
}

#movie-genres {
  border-radius: 15px;
  padding-block: 5px;
  text-align: center;
  background: $primary;
  margin-right: 10px;
  max-width: 120px;
  font-family: $style1;
  text-transform: uppercase;
  font-size: 13px;
  display: inline-block;
  margin-bottom: 10px;
  color: white;
}

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
    margin-top: 2em;
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
    font-size: 1em;
    background: $dark2;
    color: $secondary;
    width: 100%;
  }

  #movie-img {
    width: auto;
    height: 100%;
    margin-bottom: 50px;
    position: relative;
  }

  #movie-date {
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
    font-size: 2em;
    background: $dark2;
    color: $secondary;
    width: 100%;
  }

  #movie-img {
    width: auto;
    height: 100%;
    margin-bottom: 50px;
    position: relative;
  }

  #movie-date {
    position: relative;
    font-size: 20px;
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

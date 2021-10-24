<template>
  <div>
    <SectionTitle :sectionSubtitle="subtitle" />

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

    <v-container id="trendingMovies-container">
      <!-- LIST OF MOVIES -->
        <div v-for="(item, i) in trendingMovies" :key="i" class="my-2">
          <v-row>
              <v-sheet width="80%" id="trendingMovies-sheet">
                <v-card-title id="trendingMovies-title"
                  >{{ item.title }}
                  <span id="trendingMovies-date">{{
                    formatDate(item.release_date)
                  }}</span></v-card-title
                >
              </v-sheet>
            </v-row>
          <v-row>
            <v-col cols="2">
              <v-img :src="imageURL + item.poster_path" width="100%" class="movie-img" />
            </v-col>
            <v-col cols="3">
              <h4>Overview</h4>
              <v-divider class="ma-0 mb-2"></v-divider>
                <p
                  :class="
                    item.overview.length > 0
                      ? 'text-justify white--text'
                      : 'text-justify error--text'
                  "
                >
                  {{ item.overview.length > 0 ? item.overview : no_overview }}
                </p>
            </v-col>
            <v-col cols="4">
              <h4 class="info--text">Casting</h4>
              <v-divider class="ma-0 mb-2"></v-divider>
              <p v-for="(cast, j) in item.cast.slice(0, 11)" :key="'A' + j">
                  <v-icon color="info" size="10" class="mr-2">mdi-circle</v-icon>
                  <span class="font-weight-bold mr-3">{{ cast.name }}</span>
                  <span class="info--text mr-2" v-if="cast.character">as</span>
                  <span class="white--text">{{ cast.character }}</span>
              </p>
            </v-col>
            <v-col cols="3" class="text-right">
              <v-btn
                class="d-block my-1 ml-auto"
                width="350px"
                outlined
                color="red"
                large
                tile
                @click="getTrailer(item)"
                dark
                >
                <span class="white--text">View trailer</span>
              </v-btn>
              <v-btn
                class="d-block my-1 ml-auto"
                width="350px"
                outlined
                color="purple"
                large
                tile
                @click="showAddToDialog(true); setAddMovie(item)"
                dark
                >
                  <span class="white--text">Add to My Movies</span>
                </v-btn>
              </v-col>
            </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import TrailerDialog from "../components/TrailerDialog";
import AddToDialog from "../components/AddToDialog";

import { mapActions, mapState } from "vuex";

export default {
  components: {
    SectionTitle,
    TrailerDialog,
    AddToDialog,
  },
  data() {
    return {
      subtitle: "Current popular movies",
      title: "",
      overview: "",
      releaseDate: "",
      average: "",
      trailerDialog: false,
      no_overview: "No overview available.",
    };
  },
  computed: {
    ...mapState(["trendingMovies", "trailerVideo", "addToDialog", "imageURL"]),
  },
  mounted() {
    this.getTrending(true);
  },
  methods: {
    ...mapActions(["getTrending", "getMovieTrailer", "showAddToDialog", "setAddMovie"]),
    getTrailer(item) {
      this.trailerDialog = true
      this.getMovieTrailer({ type: 'other', id: item.id })
    },
    formatDate(date) {
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
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

  #trendingMovies-sheet {
    background: linear-gradient(to right, $secondary, $dark2);
  }
  #trendingMovies-container {
    position: relative;
    top: 20px;
    animation: fadeIn ease 2s;
  }
  #trendingMovies-overview {
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

  #trendingMovies-title {
    font-size: 1em;
    line-height: 20px;
    padding: 20px;
    font-weight: bold;
    font-family: $style2;
    text-transform: uppercase;
  }

  #trendingMovies-date {
    font-size: 1em;
    position: absolute;
    right: 35px;
    color: $secondary;
  }

  .movie-img {
    display: block;
    height: 100%;
    width: 50%;
    margin-right: 10px;
    margin-top: 0;
  }

  #info-btn {
    position: relative;
    right: 0;
    background: linear-gradient(to right, $dark2, $primary);
  }

  #trailer-btn {
    position: relative;
    right: 0;
    color: white;
    background-image: linear-gradient(to right, $dark2, $secondary);
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
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  body {
    background: $dark2;
  }

  #trendingMovies-sheet {
    background: linear-gradient(to right, $secondary, $dark2);
  }
  #trendingMovies-container {
    position: relative;
    top: 20px;
    animation: fadeIn ease 2s;
  }
  #trendingMovies-overview {
    padding-inline: 50px;
    font-size: 20px;
    text-align: justify;
  }
  #no-overview {
    padding: 50px;
    font-size: 20px;
    color: $secondary;
    text-align: justify;
  }

  #trendingMovies-title {
    font-size: 3em;
    line-height: 60px;
    padding: 20px;
    font-family: $style2;
    text-transform: uppercase;
    text-align: justify;
  }

  #trendingMovies-date {
    font-size: 1em;
    position: absolute;
    right: 35px;
    color: $secondary;
  }

  #info-btn {
    position: relative;
    background: linear-gradient(to right, $dark2, $primary);
  }

  #trailer-btn {
    position: relative;
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
    height: auto;
    width: 350px;
    max-width: 100%;
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
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  body {
    background: $dark2;
  }

  #trendingMovies-sheet {
    background: linear-gradient(to right, $secondary, $dark2);
  }
  #trendingMovies-container {
    position: relative;
    top: 20px;
    animation: fadeIn ease 2s;
  }
  #trendingMovies-overview {
    padding-inline: 50px;
    font-size: 30px;
    text-align: justify;
  }
  #no-overview {
    padding: 50px;
    text-align: justify;
    font-size: 40px;
    color: $secondary;
  }

  #trendingMovies-title {
    font-size: 3em;
    line-height: 60px;
    padding: 20px;
    font-family: $style2;
    text-transform: uppercase;
    text-align: justify;
  }

  #trendingMovies-date {
    font-size: 1em;
    position: absolute;
    right: 35px;
    color: $secondary;
  }

  #info-btn {
    position: relative;
    background: linear-gradient(to right, $dark2, $primary);
  }

  #trailer-btn {
    position: relative;
    color: white;
    background-image: linear-gradient(to right, $dark2, $secondary);
  }
  .movie-img {
    height: auto;
    width: 350px;
    max-width: 100%;
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
}
</style>

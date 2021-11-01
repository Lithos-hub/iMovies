<template>
  <div>
    <SectionTitle :title="sectionTitle" />

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

    <!--********************************** DIALOG MOVIES ********************************** -->
          <v-dialog
            overlay-opacity="0.2"
            width="70%"
            height="auto"
            persistent
            translate="250px"
            v-model="genreDialog"
            elevation-4
          >
              <v-toolbar id="genre-dialog-toolbar" tile elevation="5" dark color="secondary">
                <v-btn
                  icon
                  dark
                  @click="closeDialog"
                  class="close-dialog-btn"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title class="card-genre-title">
                  {{ formatGenreTitle(selectedGenre) }}
                </v-toolbar-title>
              </v-toolbar>
           <div v-for="(item, i) in moviesByGenre" :key="i">
            <v-card color="#151515e7" tile id="genre-dialog-card" class="pb-10 white--text">
              <v-row no-gutters class="text-center">
                    <v-img
                      class="mx-auto"
                      max-width="75%"
                      position="top"
                      max-height="50%"
                      :src="imageURL + item.backdrop_path">
                      <div id="movie-img-text">
                        <div>
                          <h1 class="text-h5 white--text shadow-text">{{ item.title }}</h1>
                        </div>
                        <div>
                          <h1 class="text-h5 white--text shadow-text">{{ formatDate(item.release_date) }}</h1>
                        </div>
                      </div>
                    </v-img>
                  <v-row>
                    <v-col>
                    <p id="genre-overview">
                      {{ item.overview.length ? item.overview : $t('generic-messages.no-overview') }}
                    </p>
                    </v-col>
                  </v-row>
                  <v-row>
                      <v-col>
                        <v-btn
                          width="100%"
                          color="primary"
                          outlined
                          large
                          tile
                          @click="showInfo(item)"
                          dark
                          >
                          <v-icon color="white">mdi-information</v-icon>
                          </v-btn>
                      </v-col>
                    <v-col>
                      <v-btn
                        width="100%"
                        color="red"
                        outlined
                        large
                        tile
                        @click="getTrailer(item)"
                        dark
                        >
                        <span class="white--text">{{ $t('app-buttons.view') }}</span>
                      </v-btn>
                    </v-col>
                    <v-col>
                      <v-btn
                        width="100%"
                        color="purple"
                        outlined
                        large
                        tile
                        @click="showAddToDialog(true); setAddMovie(item)"
                        dark
                        >
                        <span class="white--text">{{ $t('app-buttons.add') }}</span>
                        </v-btn>
                      </v-col>
                  </v-row>
              </v-row>
            </v-card>
            <v-divider class="ma-0 pa-0 cyan"></v-divider>
           </div>
          </v-dialog>

    <div id="genres-container" class="mt-5">
      <v-row no-gutters>
        <v-col cols="12">
          <!-- ********************* ACTION BUTTON ********************* -->
          <v-btn
            id="actionBtn"
            class="genre-btn img1"
            @click="getMoviesByGenre({genre: '28', page: page})"
            dark
            block
            tile
          >
            {{ formatGenreTitle('28') }}
          </v-btn>
          <!-- ********************* ADVENTURE BUTTON ********************* -->

          <v-btn
            color="green"
            class="genre-btn img2"
            @click="getMoviesByGenre({genre: '12', page: page})"
            dark
            block
            tile
          >
            {{ formatGenreTitle('12') }}
          </v-btn>
          <!-- ********************* ANIMATION BUTTON ********************* -->
          <v-btn
            color="orange"
            class="genre-btn img3"
            @click="getMoviesByGenre({genre: '16', page: page})"
            dark
            block
            tile
          >
            {{ formatGenreTitle('16') }}
          </v-btn>
          <!-- ********************* COMEDY BUTTON ********************* -->
          <v-btn
            color="purple"
            class="genre-btn img4"
            @click="getMoviesByGenre({genre: '35', page: page})"
            dark
            block
            tile
          >
            {{ formatGenreTitle('35') }}
          </v-btn>
          <!-- ********************* CRIME BUTTON ********************* -->
          <v-btn
            color="secondary"
            class="genre-btn img5"
            @click="getMoviesByGenre({genre: '80', page: page})"
            dark
            block
            tile
          >
            {{ formatGenreTitle('80') }}
          </v-btn>
          <!-- ********************* DOCUMENTARY BUTTON ********************* -->
          <v-btn
            color="pink"
            class="genre-btn img6"
            @click="getMoviesByGenre({genre: '99', page: page})"
            dark
            block
            tile
          >
            {{ formatGenreTitle('99') }}
          </v-btn>
          <!-- ********************* DRAMATIC BUTTON ********************* -->
          <v-btn
            color="yellow darken-4"
            class="genre-btn img7"
            @click="getMoviesByGenre({genre: '18', page: page})"
            dark
            block
            tile
          >
            {{ formatGenreTitle('18') }}
          </v-btn>
          <!-- ********************* FANTASY BUTTON ********************* -->
          <v-btn
            color="blue"
            class="genre-btn img8"
            @click="getMoviesByGenre({genre: '14', page: page})"
            dark
            block
            tile
          >
            {{ formatGenreTitle('14') }}
          </v-btn>
          <!-- ********************* HISTORY BUTTON ********************* -->
          <v-btn
            color="brown"
            class="genre-btn img9"
            @click="getMoviesByGenre({genre: '36', page: page})"
            dark
            block
            tile
          >
            {{ formatGenreTitle('36') }}
          </v-btn>
          <!-- ********************* HORROR BUTTON ********************* -->
          <v-btn
            color="gray"
            class="genre-btn img10"
            @click="getMoviesByGenre({genre: '27', page: page})"
            dark
            block
            tile
          >
            {{ formatGenreTitle('27') }}
          </v-btn>
          <!-- ********************* MUSICAL BUTTON ********************* -->
          <v-btn
            color="cyan"
            class="genre-btn img11"
            @click="getMoviesByGenre({genre: '10402', page: page})"
            dark
            block
            tile
          >
            {{ formatGenreTitle('10402') }}
          </v-btn>
          <!-- ********************* ROMANTIC BUTTON ********************* -->
          <v-btn
            color="error"
            class="genre-btn img12"
            @click="getMoviesByGenre({genre: '10749', page: page})"
            dark
            block
            tile
          >
            {{ formatGenreTitle('10749') }}
          </v-btn>
          <!-- ********************* SCI-FI BUTTON ********************* -->
          <v-btn
            color="blue"
            class="genre-btn img13"
            @click="getMoviesByGenre({genre: '878', page: page})"
            dark
            block
            tile
          >
            {{ formatGenreTitle('878') }}
          </v-btn>
          <!-- ********************* THRILLER BUTTON ********************* -->
          <v-btn
            color="orange"
            class="genre-btn img14"
            @click="getMoviesByGenre({genre: '53', page: page})"
            dark
            block
            tile
          >
            {{ formatGenreTitle('53') }}
          </v-btn>
          <!-- ********************* WAR BUTTON ********************* -->
          <v-btn
            color="red"
            class="genre-btn img15"
            @click="getMoviesByGenre({genre: '10752', page: page})"
            dark
            block
            tile
          >
            {{ formatGenreTitle('10752') }}
          </v-btn>

          <!-- ********************* WESTERN BUTTON ********************* -->
          <v-btn
            color="indigo"
            class="genre-btn img16"
            @click="getMoviesByGenre({genre: '37', page: page})"
            dark
            block
            tile
          >
            {{ formatGenreTitle('37') }}
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <div v-if="snackbarObject.snackbar">
      <Snackbar
        :snackbar-color="snackbarObject.snackbarColor"
        :snackbar-text="snackbarObject.snackbarText" />
    </div>

    <LoadingData v-if="loadingData" />
  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import Snackbar from "../components/Snackbar";
import LoadingData from "../components/LoadingData";
import TrailerDialog from "../components/TrailerDialog";
import AddToDialog from "../components/AddToDialog";

import { mapActions, mapState } from 'vuex';

export default {
  name: "Genres",
  components: {
    SectionTitle,
    Snackbar,
    LoadingData,
    TrailerDialog,
    AddToDialog
  },
  data() {
    return {
      sectionTitle: this.$t('comp-sectionTitle.genres'),
      trailerDialog: false,
      movieTitle: "",
      page: 1
    };
  },
  computed: {
    ...mapState(['snackbarObject', 'imageURL', 'moviesByGenre', 'selectedGenre', 'genreDialog', 'loadingData', 'trailerVideo', 'addToDialog']),
  },
  created () {
    window.scrollTo(0, 0)
  },
  methods: {
    ...mapActions(['getMoviesByGenre','getMovieTrailer', 'showAddToDialog', 'setAddMovie', 'showInfo']),
    formatGenreTitle (genre) {
      let genres = {
        ['28']: this.$t('genres.action'), 
        ['12']: this.$t('genres.adventure'), 
        ['16']: this.$t('genres.animation'), 
        ['35']: this.$t('genres.comedy'), 
        ['80']: this.$t('genres.crime'), 
        ['99']: this.$t('genres.documentary'), 
        ['18']: this.$t('genres.drama'), 
        ['10751']: this.$t('genres.family'), 
        ['14']: this.$t('genres.fantasy'), 
        ['36']: this.$t('genres.history'), 
        ['27']: this.$t('genres.horror'), 
        ['10402']: this.$t('genres.music'), 
        ['9648']: this.$t('genres.mystery'), 
        ['10749']: this.$t('genres.romance'), 
        ['878']: this.$t('genres.sci-fi'), 
        ['10770']: this.$t('genres.tv'), 
        ['53']: this.$t('genres.thriller'), 
        ['10752']: this.$t('genres.war'), 
        ['37']: this.$t('genres.western'), 
      }
      return genres[genre]
    },
    closeDialog() {
      this.$store.commit('setGenreDialog', false)
      let dialog = document.querySelector('.v-dialog')
      dialog.scrollTo(0, 0)
    },
    formatDate(date) {
      const [year, month, day] = date.split('-')

      return `${day}/${month}/${year}`
    },
    getTrailer(item) {
      this.trailerDialog = true
      this.getMovieTrailer({ type: 'other', id: item.id })
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

#genre-dialog-toolbar {
  position: sticky;
  top: 0;
  left: auto;
  width: auto;
  z-index: 9999;
}

#genre-dialog-card {
  padding-top: 5em !important;
  padding-inline: 5em;
}

#movie-img-text {
  backdrop-filter: blur(5px);
  background: $gradient_blur2;
  padding: 10px;
  position: absolute;
  top: 0em;
  left: 0;
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  background: gradient_blur1;
}

.no-border-radius {
  border-radius: 0 !important;
}

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  .genre-btn {
    letter-spacing: 0px;
    height: 350px !important;
    font-size: 3em;
    text-shadow: 0px 0px 10px black;
    margin-bottom: 20px;
    transition: 0.5s;
    animation: fadeIn ease 2s;
    justify-content: flex-end;
    filter: grayscale(0);
  }

  .close-dialog-btn:focus {
    outline: none;
  }

  .card-genre-title {
    font-size: 2em;
    text-transform: uppercase;
    letter-spacing: 0px;
    text-align: right;
    font-family: $style3;
  }

  .go-up-btn {
    position: relative;
    margin: 0;
    width: 100%;
    bottom: 0px;
    height: 100px !important;
    font-size: 5em;
    &:focus {
      outline: none;
    }
  }

  .go_up_trigger {
    text-decoration: none;
  }

  #genre-title {
    font-size: 18px;
    font-family: $style3;
  }
  #genre-date {
    position: absolute;
    right: 20px;
    color: $primary;
  }

  #genre-overview {
    padding: 0px;
    font-size: 20px;
    text-align: justify;
    display: block;
    width: 100%;
    margin-top: 20px;
  }

  .movie-img-dialog {
    border-radius: 15px;
    display: inline;
    margin-top: 50px;
    width: 100%;
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  .genre-btn {
    letter-spacing: 40px;
    height: 200px !important;
    font-size: 2em;
    text-shadow: 0px 0px 10px black;
    margin-bottom: 20px;
    transition: 0.5s;
    animation: fadeIn ease 2s;
    justify-content: flex-end;
    filter: grayscale(1);

    &:focus {
      outline: none;
    }

    &:hover {
      color: white;
      text-shadow: 0px 0px 10px cyan, 0px 0px 3px cyan;
      font-size: 4em;
      letter-spacing: 50px;
      filter: none;
    }
  }

  .close-dialog-btn:focus {
    outline: none;
  }

  .card-genre-title {
    font-size: 4em;
    text-transform: uppercase;
    letter-spacing: 20px;
    text-align: right;
    font-family: $style3;
  }

  .go-up-btn {
    position: relative;
    margin: 0;
    width: 100%;
    bottom: 0px;
    height: 100px !important;
    font-size: 5em;
    &:focus {
      outline: none;
    }
  }

  .go_up_trigger {
    text-decoration: none;
  }

  #genre-title {
    font-size: 2em;
    font-family: $style3;
  }
  #genre-date {
    position: absolute;
    right: 25px;
    color: $primary;
  }

  #genre-overview {
    font-size: 20px;
    text-align: justify;
  }

  .movie-img-dialog {
    border-radius: 15px;
    display: inline;
    margin-top: 0px;
    width: 40%;
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  .genre-btn {
    letter-spacing: 40px;
    height: 300px !important;
    font-size: 3em;
    text-shadow: 0px 0px 10px black;
    margin-bottom: 20px;
    transition: 0.5s;
    animation: fadeIn ease 2s;
    justify-content: flex-end;
    filter: grayscale(1);

    &:focus {
      outline: none;
    }

    &:hover {
      color: white;
      text-shadow: 0px 0px 10px cyan, 0px 0px 3px cyan;
      font-size: 5em;
      letter-spacing: 50px;
      filter: none;
    }
  }

  .close-dialog-btn:focus {
    outline: none;
  }

  .card-genre-title {
    font-size: 4em;
    text-transform: uppercase;
    letter-spacing: 20px;
    font-family: $style3;
  }

  .go-up-btn {
    position: relative;
    margin: 0;
    width: 100%;
    bottom: 0px;
    height: 100px !important;
    font-size: 5em;
    &:focus {
      outline: none;
    }
  }

  .go_up_trigger {
    text-decoration: none;
  }

  #genre-title {
    font-size: 3em;
    width: 100%;
    font-family: $style3;
  }
  #genre-date {
    position: absolute;
    right: 35px;
    color: $secondary;
  }

  #genre-overview {
    font-size: 1.2em;
    text-align: justify;
  }

  .movie-img-dialog {
    display: inline;
    text-align: center;
    border-radius: 15px;
    margin-top: 0px;
  }
}

// ******** COMMON STYLES ******** //

// COMMON STYLES

.img1 {
  background: url("../assets/img/actionimg.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.img2 {
  background: url("../assets/img/adventureimg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.img3 {
  background: url("../assets/img/animationimg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.img4 {
  background: url("../assets/img/comedyimg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.img5 {
  background: url("../assets/img/crimeimg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.img6 {
  background: url("../assets/img/documentaryimg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.img7 {
  background: url("../assets/img/dramaticimg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.img8 {
  background: url("../assets/img/fantasyimg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.img9 {
  background: url("../assets/img/historyimg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.img10 {
  background: url("../assets/img/horrorimg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.img11 {
  background: url("../assets/img/musicalimg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.img12 {
  background: url("../assets/img/romanticimg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.img13 {
  background: url("../assets/img/scifiimg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.img14 {
  background: url("../assets/img/thrillerimg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.img15 {
  background: url("../assets/img/warimg.jpg");
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.img16 {
  background: url("../assets/img/westernimg.jpg");
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

#genres-container {
  position: relative;
  width: 100%;
  margin-bottom: 50px;
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

@keyframes motion {
  0% {
    background-position: top;
  }

  100% {
    background-position: bottom;
  }

  0% {
    background-position: top;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

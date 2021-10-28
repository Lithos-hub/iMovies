<template>
  <v-container fluid>
    <!-- INFO DIALOG -->

    <!-- TRAILER DIALOG -->
    <TrailerDialog
      v-if="trailerDialog"
      :video="trailerVideo"
      @close-dialog="trailerDialog = false"
    />


    <v-card
      color="error"
      class="white--text pa-2 empty-error-message"
      v-if="arrayMovies.length === 0">
      {{ $t('view-myMovies.noMovies') }}
      </v-card>

      <v-row no-gutters>
        <v-col
         cols="3"
          v-for="(item, i) in arrayMovies"
          :key="i"
          class="text-center mx-auto"
        >
            <v-card height="auto" tile class="elevation-10 movie-card indigo darken-4 white--text">
              <v-row no-gutters>
                <v-col cols="6">
                      <p class="text-h5 white--text text-center movie-title mt-2">
                        {{ item.title }}
                      </p>
                      <p
                        class="
                          overline
                          white--text
                          text-center
                          rounded
                          movie-date
                          mb-0
                        "
                      >
                        {{ formatDate(item.release_date) }}
                      </p>
                      <v-divider class="white"></v-divider>
                      <div class="myrate-section" v-if="category === 'byrate'">
                        <small class="white--text text-center">
                          {{ $t('view-myMovies.myRate') }}
                          <span class="rate-number">
                          {{
                            item.myrate
                          }}
                          </span>
                        </small>
                      </div>
                </v-col>
                <v-col cols="6">
                  <v-img
                    :src="imageURL + item.poster_path"
                    max-height="325px"
                    class="movie-img"
                  ></v-img>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-row class="py-2">
                  <v-col>
                  <v-btn
                    tile
                    width="100%"
                    color="info darken-2"
                    elevation="5"
                    class="white--text mx-auto"
                    @click="showInfo(item)"
                  >
                    <v-icon>mdi-information</v-icon>
                    </v-btn>    
                    </v-col>
                  <v-col>
                    <v-btn
                      tile
                      width="100%"
                      color="red"
                      elevation="5"
                      class="white--text mx-auto"
                      @click="removeMovie(item)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
        </v-col>
      </v-row>
    <div v-if="snackbarObject.snackbar">
      <Snackbar
        :snackbar-color="snackbarObject.snackbarColor"
        :snackbar-text="snackbarObject.snackbarText" />
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Snackbar from '../components/Snackbar'
import TrailerDialog from '../components/TrailerDialog'

export default {
  props: ['arrayMovies', 'category', 'rate'],
  components: {
    Snackbar,
    TrailerDialog
  },
  data() {
    return {
      trailerDialog: false,
      title: '',
      release_date: '',
      overview: '',
      img: '',
    };
  },
  computed: {
    ...mapState(['snackbarObject', 'user', 'imageURL', 'userID']),
  },
  methods: {
    ...mapActions(['showSnackbar']),
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    removeMovie(item) {
      const storage = JSON.parse(localStorage.getItem("storageUserDATA")) || [];
          let arrFavourite = this.arrayMovies
          let arrWishlist = this.arrayMovies
          let arrWatched = this.arrayMovies
          let arrRated = this.arrayMovies

          console.log(arrWatched)

        if (this.category === "favourite") {
          arrFavourite.splice(arrFavourite.indexOf(item), 1)
          this.showSnackbar({text: "Removed from FAVOURITE category", color: "secondary"});
          storage[this.userID].myMovies.favourite = arrFavourite;
          localStorage.setItem("storageUserDATA", JSON.stringify(storage));
        }
        if (this.category === "towatch") {
          arrWishlist.splice(arrWishlist.indexOf(item), 1)
          this.showSnackbar({text: "Removed from WISH LIST category", color: "secondary"});
          storage[this.userID].myMovies.wishlist = arrWishlist;
          localStorage.setItem("storageUserDATA", JSON.stringify(storage));
        }
        if (this.category === "watched") {
          arrWatched.splice(arrWatched.indexOf(item), 1)
          this.showSnackbar({text: "Removed from WATCHED category", color: "secondary"});
          storage[this.userID].myMovies.watched = arrWatched;
          localStorage.setItem("storageUserDATA", JSON.stringify(storage));
        }
        if (this.category === "byrate") {
          arrRated.splice(arrRated.indexOf(item), 1)
          this.showSnackbar({text: "Removed from RATED category", color: "secondary"});
          storage[this.userID].myMovies.rated = arrRated;
          localStorage.setItem("storageUserDATA", JSON.stringify(storage));
        }
    },
    showInfo(item) {
      // this.trailerDialog = true;
      // this.title = item.title;
      // this.overview = item.overview;
      // this.release_date = item.release_date;
      // this.img = item.backdrop_path;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

.movie-img {
  width: 100% !important;
  height: 100% !important;
  border-radius: 0px 10px 0px 0px;
}

.myrate-section {
  position: absolute;
  bottom: 25%;
  left: 25%;
  transform: translate(-50%, 0);
}


// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  .movie-card {
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgb(33, 33, 33), rgb(0, 20, 56));
    margin-bottom: 50px;
    box-shadow: 0px 10px 10px black;
  }


  .empty-error-message {
    margin: 50px;
    width: 400px;
    text-align: center;
    margin: 0 auto;
  }

  .card-buttons {
    position: relative;
    margin-top: 100px;
  }

  .rate-number {
    font-size: 4em;
    color: white;
    display: block;
  }

  #dialog-title {
    font-size: 2em;
    justify-content: center;
    color: white;
    text-shadow: 0px 0px 10px black;
    background: linear-gradient(to right, $dark2, $primary);
    padding: 20px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    border-radius: 0px 10px 0px 0px;
  }

  #dialog-overview {
    font-size: 20px;
    text-align: justify;
    line-height: 25px;
    font-family: $style2;
    color: black;
  }

  #dialog-date {
    text-align: right;
    font-weight: bold;
  }

  .close-info-btn {
    background: linear-gradient(to left, rgb(33, 33, 33), rgb(121, 0, 81));
    color: white;
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  .movie-card {
    width: auto;
    height: auto;
    background: linear-gradient(to right, rgb(33, 33, 33), rgb(0, 20, 56));
    margin-bottom: 100px;
    box-shadow: 0px 10px 10px black;
    margin: 20px;
  }

  .empty-error-message {
    margin: 50px;
    width: 400px;
    text-align: center;
    margin: 0 auto;
  }

  .card-buttons {
    position: relative;
    margin-top: 100px;
  }

  .rate-number {
    font-size: 4em;
    color: white;
    display: block;
  }

  #dialog-title {
    font-size: 2em;
    justify-content: center;
    color: white;
    text-shadow: 0px 0px 10px black;
    background: linear-gradient(to right, $dark2, $primary);
    padding: 20px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    border-radius: 0px 10px 0px 0px;
  }

  #dialog-overview {
    font-size: 20px;
    text-align: justify;
    line-height: 25px;
    font-family: $style2;
    color: black;
  }

  #dialog-date {
    text-align: right;
    font-weight: bold;
  }

  .close-info-btn {
    background: linear-gradient(to left, rgb(33, 33, 33), rgb(121, 0, 81));
    color: white;
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  .movie-card {
    width: auto;
    height: auto;
    background: linear-gradient(to right, rgb(33, 33, 33), rgb(0, 20, 56));
    margin-bottom: 50px;
    box-shadow: 0px 10px 20px black;
  }

  .empty-error-message {
    margin: 50px;
    width: 400px;
    text-align: center;
    margin: 0 auto;
  }

  .card-buttons {
    position: relative;
    margin-top: 100px;
  }

  .rate-number {
    font-size: 4em;
    color: white;
    display: block;
  }

  #dialog-title {
    font-size: 2em;
    justify-content: center;
    color: white;
    text-shadow: 0px 0px 10px black;
    background: linear-gradient(to right, $dark2, $primary);
    padding: 20px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    border-radius: 0px 10px 0px 0px;
  }

  #dialog-overview {
    font-size: 20px;
    text-align: justify;
    line-height: 25px;
    font-family: $style2;
    color: black;
  }

  #dialog-date {
    text-align: right;
    font-weight: bold;
  }

  .close-info-btn {
    background: linear-gradient(to left, rgb(33, 33, 33), rgb(121, 0, 81));
    color: white;
  }
}
</style>

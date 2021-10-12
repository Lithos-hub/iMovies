<template>
<div>
      <v-dialog
      v-model="dialog"
      width="auto"
      max-width="500px"
      persistent
      class="no-overflow-x"
    >
      <v-card width="auto" class="no-overflow-x">
        <v-card-title class="gradient-background-4 text-h5 white--text">
          Add movie to...
        </v-card-title>

        <v-row no-gutters>
          <v-col class="text-center">
          <v-btn
            large
            icon
            :color="!addedFavourite ? 'black' : 'red darken-4'"
            width="80px"
            height="80px"
            @click="addToFavourites"
          >
            <v-icon size="50px">{{ !addedFavourite ? 'mdi-heart-outline' : 'mdi-heart' }}</v-icon>
          </v-btn>
          <p :class="!addedFavourite ? 'black--text' : 'red--text'">Favourite</p>
          </v-col>
          <v-col class="text-center">
          <v-btn
            large
            icon
            :color="!addedWatched ? 'black' : 'primary'"
            width="80px"
            height="80px"
            @click="addToWatched"
          >
            <v-icon size="50px">{{ !addedWatched ? 'mdi-eye-outline' : 'mdi-eye' }}</v-icon>
          </v-btn>
          <p :class="!addedWatched ? 'black--text' : 'primary--text'">Watched</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
          <v-btn
            large
            icon
            :color="!addedWishlist ? 'black' : 'amber'"
            width="80px"
            height="80px"
            @click="addToWishList"
          >
            <v-icon size="50px">{{ !addedWishlist ? 'mdi-star-shooting-outline' : 'mdi-star-shooting' }}</v-icon>
          </v-btn>
          <p :class="!addedWishlist ? 'black--text' : 'amber--text'">Wish List</p>
          </v-col>
          <v-col class="text-center">
          <v-btn
            large
            icon
            :color="!addedRate ? 'black' : 'green'"
            width="80px"
            height="80px"
            @click="rateMovie()"
          >
            <v-icon size="50px">{{ !addedRate ? 'mdi-sort-numeric-variant' : 'mdi-numeric' }}</v-icon>
          </v-btn>
          <p :class="!addedRate ? 'black--text' : 'green--text'">{{ !addedRate ? 'Rate' : `Rated with ${rate} points` }}</p>
          </v-col>
        </v-row>

        <v-dialog v-model="rateMenu" overlay-opacity="0.5">
        <v-card id="rate-card" class="pa-1 fadeIn">
          <v-card-title class="green white--text">
            Rate the movie
            <v-btn depressed dark class="transparent ml-auto" icon @click="rateMenu = false">
              <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
          <div class="my-4">
            <h1 :class="computedRateColor">{{ rate }}</h1>
              <v-slider
              v-model="slider"
              min="0"
              max="100"
              steo="5"
              color="green"
              @input="toDecimal(slider)"
            ></v-slider>
          </div>
          <v-btn :disabled="!validRate" tile block color="secondary" @click="addToRateMovies">
            <span class="white--text">{{ !addedRate ? 'Save rate' : 'Update rate' }}</span>
          </v-btn>
        </v-card>
        </v-dialog>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            block
            color="purple"
            tile
            outlined
            @click="showAddToDialog(false, null)"
          >
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="snackbarObject.snackbar">
      <Snackbar
        :snackbar-color="snackbarObject.snackbarColor"
        :snackbar-text="snackbarObject.snackbarText" />
    </div>
</div>
</template>

<script>
import Snackbar from "./Snackbar";
import { mapActions, mapState } from 'vuex'
export default {
    components: {
      Snackbar
    },
    data () {
        return {
            addedFavourite: false,
            addedWatched: false,
            addedWishlist: false,
            addedRate: false,
            rateMenu: false,
            dialog: true,
            slider: 0,
            rate: 0,
            inputRules: [
              v => v <= 10 || 'The rate must be less or equal to 10',
              v => v >= 0 || 'The rate must be greater than or equal to 0'
            ],
            auxFavourite: [],
            auxWatched: [],
            auxWishlist: [],
            auxRated: [],
        }
    },
    computed: {
        ...mapState(['snackbarObject', 'movieToAdd', 'storagedMovies', 'userID']),
        validRate() {
          if (this.rate >= 0 && this.rate <= 10 && this.rate !== '') {
            return true
           } else {
            return false 
           }
        },
        computedRateColor() {
          let colorClass
          if (this.rate <= 10) {
            colorClass = 'green--text text-center'
          }
          if (this.rate <= 9) {
            colorClass = 'info--text text-center'
          }
          if (this.rate <= 7) {
            colorClass = 'purple--text text-center'
          }
          if (this.rate <= 5) {
            colorClass = 'warning--text text-center'
          }
          if (this.rate <= 3) {
            colorClass = 'red--text text-center'
          }
          return colorClass
        }
    },
    created () {
      this.getStoragedMovies()
      this.getAddedMovies()
    },
    methods: {
        ...mapActions(['showSnackbar', 'showError', 'showAddToDialog', 'storageMovie']),
        getStoragedMovies() {
          const storage = JSON.parse(localStorage.getItem("storageUserDATA")) || [];
          let movies = storage[this.userID].myMovies
          this.auxFavourite = movies.favourite
          this.auxWatched = movies.watched
          this.auxWishlist = movies.wishlist
          this.auxRated = movies.rated
        },
        getAddedMovies() {
          this.getStoragedMovies()
          this.auxFavourite.find(movie => movie.id === this.movieToAdd.id) !== undefined ? this.addedFavourite = true : this.addedFavourite = false
          this.auxWatched.find(movie => movie.id === this.movieToAdd.id) !== undefined ? this.addedWatched = true : this.addedWatched = false
          this.auxWishlist.find(movie => movie.id === this.movieToAdd.id) !== undefined ? this.addedWishlist = true : this.addedWishlist = false

          let matchRated = this.auxRated.find(movie => movie.id === this.movieToAdd.id)

          if (matchRated) {
            this.addedRate = true
            this.rate = matchRated.myrate
            this.slider = matchRated.myrate * 10
          } else {
            this.addedRate = false
          }
        },
        toDecimal(rate) {
          let dec = rate / 10;
          this.rate = dec;
        },
        addToFavourites() {
          let data = {
            category: 'favourite',
            movie: this.movieToAdd
          }
          this.storageMovie(data)
          let { category, movie } = data
          this.getAddedMovies()
          this.writeMovieData(category, movie)
        },
        addToWatched() {
          let data = {
            category: 'watched',
            movie: this.movieToAdd
          }
          this.storageMovie(data)
          let { category, movie } = data
          this.getAddedMovies()
          this.writeMovieData(category, movie)
        },
        addToWishList() {
          let data = {
            category: 'wishlist',
            movie: this.movieToAdd
          }
          this.storageMovie(data)
          let { category, movie } = data
          this.getAddedMovies()
          this.writeMovieData(category, movie)
        },
        rateMovie() {
          this.rateMenu = true;
        },
        addToRateMovies() {
            let data = {
            category: 'rated',
            movie: { myrate: this.rate, ...this.movieToAdd }
          }
          this.storageMovie(data)
          let { category, movie } = data
          this.getAddedMovies()
          this.writeMovieData(category, movie)
          this.rateMenu = false
        },
        writeMovieData(category, movieToAdd) {
        const storage = JSON.parse(localStorage.getItem("storageUserDATA")) || [];

        if (category === "favourite") {
          let settedArray = [...new Set(this.storagedMovies.favourite)]

          // If the movie is already in the array, we'll remove it
          if (this.addedFavourite) {
            settedArray.splice(settedArray.indexOf(movieToAdd), 1)
            this.auxFavourite.splice(this.auxFavourite.indexOf(movieToAdd), 1)
            this.showSnackbar({text: "Removed from FAVORITE category", color: "secondary"});
            storage[this.userID].myMovies.favourite = settedArray;
            localStorage.setItem("storageUserDATA", JSON.stringify(storage));
          } else {
            this.showSnackbar({text: "Added to FAVORITE category", color: "red darken-4"});
            storage[this.userID].myMovies.favourite = settedArray;
            localStorage.setItem("storageUserDATA", JSON.stringify(storage));
          }
        }

        if (category === "watched") {
          let settedArray = [...new Set(this.storagedMovies.watched)]

          // If the movie is already in the array, we'll remove it
          if (this.addedWatched) {
            settedArray.splice(settedArray.indexOf(movieToAdd), 1)
            this.auxWatched.splice(this.auxWatched.indexOf(movieToAdd), 1)
            this.showSnackbar({text: "Removed from WATCHED category", color: "secondary"});
            storage[this.userID].myMovies.watched = settedArray;
            localStorage.setItem("storageUserDATA", JSON.stringify(storage));
            } else {
              this.showSnackbar({text: "Added to WATCHED category", color: "blue"});
              storage[this.userID].myMovies.watched = settedArray;
              localStorage.setItem("storageUserDATA", JSON.stringify(storage));
            }
        }

        if (category === "wishlist") {
          let settedArray = [...new Set(this.storagedMovies.wishlist)]

          // If the movie is already in the array, we'll remove it
          if (this.addedWishlist) {
            settedArray.splice(settedArray.indexOf(movieToAdd), 1)
            this.auxWishlist.splice(this.auxWishlist.indexOf(movieToAdd), 1)
            this.showSnackbar({text: "Removed from WISHLIST category", color: "secondary"});
            storage[this.userID].myMovies.wishlist = settedArray;
            localStorage.setItem("storageUserDATA", JSON.stringify(storage));
          } else {
            this.showSnackbar({text: "Added to WISHLIST category", color: "orange darken-4"});
            storage[this.userID].myMovies.wishlist = settedArray;
            localStorage.setItem("storageUserDATA", JSON.stringify(storage));
          }
        }

        if (category === "rated") {
          let arr = []
          // If the movie is already in the array, we'll update it
          if (this.addedRate) {
            this.auxRated.splice(this.auxRated.indexOf(movieToAdd), 1)

            arr.push(movieToAdd)
            this.auxRated.push(movieToAdd)

            this.showSnackbar({text: "Rate updated", color: "secondary"});
            storage[this.userID].myMovies.rated = arr;
            localStorage.setItem("storageUserDATA", JSON.stringify(storage));
          } else {
            this.showSnackbar({text: "Added to RATED category", color: "green darken-4"});
            storage[this.userID].myMovies.rated.push(movieToAdd);
            localStorage.setItem("storageUserDATA", JSON.stringify(storage));
          }
        }
        this.getAddedMovies()
      }
    }
}
</script>

<style lang="scss" scoped>
@import "src/scss/app";

.no-overflow-x {
  overflow-x: hidden;
}

#rate-card {
  transition: all 1s;
  max-width: 350px;
  height: 250px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}
</style>
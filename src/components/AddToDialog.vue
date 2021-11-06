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
        <v-card-title class="gradient-background-1 text-h5 white--text shadow-text">
          {{ $t('comp-addTo.add') }}
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
          <p :class="!addedFavourite ? 'black--text' : 'red--text'">{{ $t('comp-addTo.favourite') }}</p>
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
          <p :class="!addedWatched ? 'black--text' : 'primary--text'">{{ $t('comp-addTo.watched') }}</p>
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
          <p :class="!addedWishlist ? 'black--text' : 'amber--text'">{{ $t('comp-addTo.wishlist') }}</p>
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
          <p :class="!addedRate ? 'black--text' : 'green--text'">{{ !addedRate ? $t('comp-addTo.rated') : `${$t('comp-addTo.rate1')} ${rate} ${$t('comp-addTo.rate2')}` }}</p>
          </v-col>
        </v-row>

        <v-dialog v-model="rateMenu" overlay-opacity="0.5">
        <v-card id="rate-card" class="pa-1 fadeIn">
          <v-card-title class="green white--text">
            {{ $t('comp-addTo.rate-dialog-title') }}
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
            <span class="white--text">{{ !addedRate ? $t('comp-addTo.rate-dialog-btn1') : $t('comp-addTo.rate-dialog-btn2') }}</span>
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
            @click="showAddToDialog(false, null); emitForceUpdate()"
          >
            {{ $t('comp-addTo.done') }}
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
            colorClass = 'purple--text text-center'
          }
          if (this.rate < 9) {
            colorClass = 'info--text text-center'
          }
          if (this.rate < 7) {
            colorClass = 'green--text text-center'
          }
          if (this.rate < 5) {
            colorClass = 'orange--text text-center'
          }
          if (this.rate < 3) {
            colorClass = 'red--text text-center'
          }
          return colorClass
        }
    },
    created () {
      this.getAddedMovies()
    },
    methods: {
        ...mapActions(['showSnackbar', 'showAddToDialog']),
        getStoragedMovies() {
          const storage = JSON.parse(localStorage.getItem("storageUserDATA")) || [];
          let movies = storage[this.userID].myMovies
          this.auxFavourite = movies.favourite
          this.auxWatched = movies.watched
          this.auxWishlist = movies.wishlist
          this.auxRated = movies.rated
          console.log(movies)
        },
        getAddedMovies() {
          this.getStoragedMovies()
          this.auxFavourite.find(movie => movie.id === this.movieToAdd.id) !== undefined ? this.addedFavourite = true : this.addedFavourite = false
          this.auxWatched.find(movie => movie.id === this.movieToAdd.id) !== undefined ? this.addedWatched = true : this.addedWatched = false
          this.auxWishlist.find(movie => movie.id === this.movieToAdd.id) !== undefined ? this.addedWishlist = true : this.addedWishlist = false
          this.auxRated.find(movie => movie.id === this.movieToAdd.id) !== undefined ? this.addedRate = true : this.addedRate = false
          let matchRated = this.auxRated.find(movie => movie.id === this.movieToAdd.id)
          if (this.addedRate) {
            this.rate = matchRated.myrate
            this.slider = matchRated.myrate * 10
          }
        },
        toDecimal(rate) {
          let dec = rate / 10;
          this.rate = dec;
        },
        addToFavourites() {
          let movieToAdd = this.movieToAdd
          let data = {
            category: 'favourite',
            movie: {
              id: movieToAdd.id,
              title: movieToAdd.title,
              poster_path: movieToAdd.poster_path,
              release_date: movieToAdd.release_date
            }
          }
          // this.storageMovie(data)
          let { category, movie } = data
          this.auxFavourite.push(data.movie)
          this.writeMovieData(category, movie)
          this.$forceUpdate()
          this.getAddedMovies()
        },
        addToWatched() {
          let movieToAdd = this.movieToAdd
          let data = {
            category: 'watched',
            movie: {
              id: movieToAdd.id,
              title: movieToAdd.title,
              poster_path: movieToAdd.poster_path,
              release_date: movieToAdd.release_date
            }
          }
          let { category, movie } = data
          this.auxWatched.push(data.movie)
          this.writeMovieData(category, movie)
          this.$forceUpdate()
          this.getAddedMovies()
        },
        addToWishList() {
          let movieToAdd = this.movieToAdd
          let data = {
            category: 'wishlist',
            movie: {
              id: movieToAdd.id,
              title: movieToAdd.title,
              poster_path: movieToAdd.poster_path,
              release_date: movieToAdd.release_date
            }
          }
          let { category, movie } = data
          this.auxWishlist.push(data.movie)
          this.writeMovieData(category, movie)
          this.$forceUpdate()
          this.getAddedMovies()
        },
        rateMovie() {
          this.rateMenu = true;
        },
        addToRateMovies() {
          let movieToAdd = this.movieToAdd
          let data = {
            category: 'rated',
            movie: {
                id: movieToAdd.id,
                title: movieToAdd.title,
                poster_path: movieToAdd.poster_path,
                release_date: movieToAdd.release_date,
                myrate: this.rate
            }
          }
          let { category, movie } = data
          this.auxRated.push(data.movie)
          this.writeMovieData(category, movie)
          this.$forceUpdate()
          this.getAddedMovies()
          this.rateMenu = false
        },
        writeMovieData(category, movieToAdd) {
          let favouriteArray = this.auxFavourite
          let watchedArray = this.auxWatched
          let wishlistArray = this.auxWishlist
          let ratedArray = this.auxRated
          const storage = JSON.parse(localStorage.getItem("storageUserDATA")) || [];
        if (category === "favourite") {
          // If the movie is already in the array, we'll remove it
          if (this.addedFavourite) {
            this.auxFavourite = favouriteArray.filter(movie => movie.id !== movieToAdd.id)
            this.showSnackbar({text: this.$t('comp-snackbar.favourite-removed'), color: "secondary"});
            storage[this.userID].myMovies.favourite = this.auxFavourite;
            localStorage.setItem("storageUserDATA", JSON.stringify(storage));
          } else {
            this.showSnackbar({text: this.$t('comp-snackbar.favourite-added'), color: "red darken-4"});
            storage[this.userID].myMovies.favourite = this.auxFavourite;
            localStorage.setItem("storageUserDATA", JSON.stringify(storage));
          }
        }

        if (category === "watched") {
          let settedArray = this.auxWatched

          // If the movie is already in the array, we'll remove it
          if (this.addedWatched) {
            this.auxWatched = watchedArray.filter(movie => movie.id !== movieToAdd.id)
            this.showSnackbar({text: this.$t('comp-snackbar.watched-removed'), color: "secondary"});
            storage[this.userID].myMovies.watched = this.auxWatched;
            localStorage.setItem("storageUserDATA", JSON.stringify(storage));
            } else {
              this.showSnackbar({text: this.$t('comp-snackbar.watched-added'), color: "blue"});
              storage[this.userID].myMovies.watched = settedArray;
              localStorage.setItem("storageUserDATA", JSON.stringify(storage));
            }
        }

        if (category === "wishlist") {
          let settedArray = this.auxWishlist

          // If the movie is already in the array, we'll remove it
          if (this.addedWishlist) {
            this.auxWishlist = wishlistArray.filter(movie => movie.id !== movieToAdd.id)
            this.showSnackbar({text: this.$t('comp-snackbar.wishlist-removed'), color: "secondary"});
            storage[this.userID].myMovies.wishlist = this.auxWishlist;
            localStorage.setItem("storageUserDATA", JSON.stringify(storage));
          } else {
            this.showSnackbar({text: this.$t('comp-snackbar.wishlist-added'), color: "orange darken-4"});
            storage[this.userID].myMovies.wishlist = settedArray;
            localStorage.setItem("storageUserDATA", JSON.stringify(storage));
          }
        }

        if (category === "rated") {
          let settedArray = this.auxRated
          // If the movie is already in the array, we'll update it
          if (this.addedRate) {
            this.auxRated = ratedArray.filter(movie => movie.id !== movieToAdd.id)
            this.auxRated.push(movieToAdd)

            this.showSnackbar({text: this.$t('comp-snackbar.rate-updated'), color: "secondary"});
            storage[this.userID].myMovies.rated = this.auxRated;
            localStorage.setItem("storageUserDATA", JSON.stringify(storage));
          } else {
            this.showSnackbar({text: this.$t('comp-snackbar.rate-added'), color: "green darken-4"});
            storage[this.userID].myMovies.rated = settedArray;
            localStorage.setItem("storageUserDATA", JSON.stringify(storage));
          }
        }
        this.getAddedMovies()
      },
      emitForceUpdate () {
        this.$emit('force-update')
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
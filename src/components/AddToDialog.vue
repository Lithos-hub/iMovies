<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="auto"
      max-width="500px"
      persistent
      class="no-overflow-x"
    >
      <v-card width="auto" min-height="300" class="no-overflow-x">
        <v-card-title
          class="
            gradient-background-1
            text-h5
            white--text
            shadow-text
            d-flex
            justify-space-between
          "
        >
          {{ $t("comp-addTo.add") }}
          <v-progress-circular
            v-if="isLoadingAddedMovies"
            indeterminate
            color="white"
            size="30"
            width="3"
          />
        </v-card-title>

        <v-row no-gutters>
          <v-col class="text-center">
            <v-btn
              large
              icon
              :color="!addedFavourite ? 'black' : 'red darken-4'"
              width="80px"
              height="80px"
              @click="
                addedFavourite
                  ? removeMovieByCategory('favouriteMovies', movieToAdd)
                  : saveMovieByCategory('favouriteMovies', movieToAdd)
              "
            >
              <v-icon size="50px">{{
                !addedFavourite ? "mdi-heart-outline" : "mdi-heart"
              }}</v-icon>
            </v-btn>
            <p :class="!addedFavourite ? 'black--text' : 'red--text'">
              {{ $t("comp-addTo.favourite") }}
            </p>
          </v-col>
          <v-col class="text-center">
            <v-btn
              large
              icon
              :color="!addedWatched ? 'black' : 'primary'"
              width="80px"
              height="80px"
              @click="
                addedWatched
                  ? removeMovieByCategory('watchedMovies', movieToAdd)
                  : saveMovieByCategory('watchedMovies', movieToAdd)
              "
            >
              <v-icon size="50px">{{
                !addedWatched ? "mdi-eye-outline" : "mdi-eye"
              }}</v-icon>
            </v-btn>
            <p :class="!addedWatched ? 'black--text' : 'primary--text'">
              {{ $t("comp-addTo.watched") }}
            </p>
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
              @click="
                addedWishlist
                  ? removeMovieByCategory('wishListMovies', movieToAdd)
                  : saveMovieByCategory('wishListMovies', movieToAdd)
              "
            >
              <v-icon size="50px">{{
                !addedWishlist
                  ? "mdi-star-shooting-outline"
                  : "mdi-star-shooting"
              }}</v-icon>
            </v-btn>
            <p :class="!addedWishlist ? 'black--text' : 'amber--text'">
              {{ $t("comp-addTo.wishlist") }}
            </p>
          </v-col>
          <v-col class="text-center">
            <v-btn
              large
              icon
              :color="!addedRated ? 'black' : 'green'"
              width="80px"
              height="80px"
              @click="rateMenu = true"
            >
              <v-icon size="50px">{{
                !addedRated ? "mdi-sort-numeric-variant" : "mdi-numeric"
              }}</v-icon>
            </v-btn>
            <p :class="!addedRated ? 'black--text' : 'green--text'">
              {{
                !addedRated
                  ? $t("comp-addTo.rated")
                  : `${$t("comp-addTo.rate1")} ${rate} ${$t(
                      "comp-addTo.rate2"
                    )}`
              }}
            </p>
          </v-col>
        </v-row>

        <v-dialog v-model="rateMenu" overlay-opacity="0.5">
          <v-card id="rate-card" class="pa-1 fadeIn">
            <v-card-title class="green white--text">
              {{ $t("comp-addTo.rate-dialog-title") }}
              <v-btn
                depressed
                dark
                class="transparent ml-auto"
                icon
                @click="rateMenu = false"
              >
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
            <v-btn
              :disabled="!validRate"
              tile
              block
              color="secondary"
              @click="saveMovieByCategory('ratedMovies', movieToAdd)"
            >
              <span class="white--text">{{
                !addedRated
                  ? $t("comp-addTo.rate-dialog-btn1")
                  : $t("comp-addTo.rate-dialog-btn2")
              }}</span>
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
            @click="
              showAddToDialog(false, null);
              emitForceUpdate();
            "
          >
            {{ $t("comp-addTo.done") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="snackbarObject.snackbar">
      <Snackbar
        :snackbar-color="snackbarObject.snackbarColor"
        :snackbar-text="snackbarObject.snackbarText"
      />
    </div>
  </div>
</template>

<script>
import Snackbar from "./Snackbar";
import { mapActions, mapState } from "vuex";
import { db, firebase } from "../../firebase";

export default {
  components: {
    Snackbar,
  },
  data() {
    return {
      rateMenu: false,
      dialog: true,
      slider: 0,
    };
  },
  computed: {
    ...mapState([
      "snackbarObject",
      "movieToAdd",
      "documentId",
      "isLoadingAddedMovies",
      "addedFavourite",
      "addedWatched",
      "addedWishlist",
      "addedRated",
      "favouriteMovies",
      "watchedMovies",
      "wishListMovies",
      "ratedMovies",
      "rate",
    ]),
    validRate() {
      if (this.rate >= 0 && this.rate <= 10 && this.rate !== "") {
        return true;
      } else {
        return false;
      }
    },
    computedRateColor() {
      let colorClass;
      if (this.rate <= 10) {
        colorClass = "purple--text text-center";
      }
      if (this.rate < 9) {
        colorClass = "info--text text-center";
      }
      if (this.rate < 7) {
        colorClass = "green--text text-center";
      }
      if (this.rate < 5) {
        colorClass = "orange--text text-center";
      }
      if (this.rate < 3) {
        colorClass = "red--text text-center";
      }
      return colorClass;
    },
  },
  beforeCreate () {
      this.$store.commit('setAddedFavourite', false);
      this.$store.commit('setAddedWatched', false);
      this.$store.commit('setAddedWishlist', false);
      this.$store.commit('setAddedRated', false);
  },
  created() {
    this.getStoragedMovies();
  },
  methods: {
    ...mapActions(["showSnackbar", "showAddToDialog"]),
    async saveMovieByCategory(category, movie) {
      console.log('Adding movie...')
      const MY_DOC_ID = localStorage.getItem("docID");
      let myDocRef = await db.doc(`userData/${MY_DOC_ID}/myMovies/${category}`);
      // We'll save the rate as a property and we'll remove the movie
      // to be able to update it with the new rate
      if (category === "ratedMovies") {
        myDocRef
          .update({
            moviesList: firebase.firestore.FieldValue.arrayRemove(movie),
          })
          .then(() => {
            movie.rate = this.rate;
            myDocRef
              .update({
                moviesList: firebase.firestore.FieldValue.arrayUnion(movie),
              })
              .then(() => {
                this.$store.dispatch('getReward', 28)
                this.getStoragedMovies();
                this.showSnackbar({
                  text: this.$t(`comp-snackbar.movie-added`),
                  color: "success",
                });
                this.rateMenu = false;
              })
              .catch(() => {
                this.showSnackbar({
                  text: this.$t('comp-snackbar.movie-added-error'),
                  color: 'error'
                })
              })
          });
      } else {
        // In the other cases, we'll just add the movie to the array
        myDocRef
          .update({
            moviesList: firebase.firestore.FieldValue.arrayUnion(movie),
          })
          .then(() => {
            this.$store.dispatch('getReward', 28)
            this.getStoragedMovies();
            this.showSnackbar({
              text: this.$t(`comp-snackbar.movie-added`),
              color: "success",
            });
            this.rateMenu = false;
          })
          .catch(() => {
            this.showSnackbar({
              text: this.$t('comp-snackbar.movie-added-error'),
              color: 'error'
            })
          })
      }
    },
    async removeMovieByCategory(category, movie) {
      console.log('Deleting movie...')
      const MY_DOC_ID = localStorage.getItem("docID");
      let myDocRef = await db.doc(`userData/${MY_DOC_ID}/myMovies/${category}`);
      myDocRef
        .update({
          moviesList: firebase.firestore.FieldValue.arrayRemove(movie),
        })
        .then(() => {
          console.log('Movie deleted')
          this.getStoragedMovies();
          this.showSnackbar({
            text: this.$t(`comp-snackbar.movie-removed`),
            color: "success",
          });
        })
        .catch(() => {
          this.showSnackbar({
            text: this.$t('comp-snackbar.movie-removed-error'),
            color: 'error'
          })
        })
    },
    getStoragedMovies() {
      const MY_DOC_ID = localStorage.getItem("docID");
      this.slider = this.movieToAdd.rate * 10;
      this.$store.dispatch("getStoragedMovies", { movieToAdd: this.movieToAdd, MY_DOC_ID });
    },
    toDecimal(rate) {
      let dec = rate / 10;
      this.$store.commit("setRate", dec);
    },
    rateMovie() {
      this.rateMenu = true;
    },
    emitForceUpdate() {
      this.$emit("force-update");
    },
  },
};
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

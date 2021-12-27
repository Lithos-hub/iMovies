<template>
  <v-container fluid>
    <!-- TRAILER DIALOG -->
    <TrailerDialog
      v-if="trailerDialog"
      :video="trailerVideo"
      @close-dialog="trailerDialog = false"
    />

    <v-progress-circular
      v-if="isLoadingAllStoragedMovies"
      class="centered"
      :size="100"
      color="cyan"
      width="2"
      indeterminate
    />

    <v-card
      color="error"
      class="white--text pa-2 empty-error-message"
      v-if="arrayMovies.length === 0"
    >
      {{ $t("view-myMovies.noMovies") }}
    </v-card>

    <v-row no-gutters v-if="!isLoadingAllStoragedMovies">
      <v-col
        :cols="isUsingMobile ? '12' : '3'"
        v-for="(item, i) in arrayMovies"
        :key="i"
        class="text-center mx-auto"
      >
        <v-card
          height="auto"
          tile
          class="elevation-10 movie-card indigo darken-4 white--text"
        >
          <v-row no-gutters>
            <v-col cols="12">
              <v-img
                :src="
                  item.backdrop_path !== undefined
                    ? imageURL + item.backdrop_path
                    : ''
                "
                max-height="150px"
                :height="item.backdrop_path === undefined ? '350px' : 'auto'"
                class="movie-img"
              ></v-img>
            </v-col>
            <v-col cols="12">
              <p class="white--text text-center movie-title mt-2">
                {{ item.title }}
                <span
                  class="
                    mini-text
                    cyan--text
                    text-center
                    rounded
                    font-weight-light
                  "
                >
                  ({{ formatDate(item.release_date) }})
                </span>
              </p>
              <!-- TODO: FIX THE RATE ON THE CARD -->
              <div v-if="category === 'ratedMovies'">
                <small
                  class="
                    white--text
                    text-center
                    d-flex
                    justify-center
                    align-center
                  "
                >
                  <span class="mr-5">{{ $t("view-myMovies.myRate") }}</span>
                  <span id="movie-rate" class="rate-number shadow-text">
                    {{ item.rate }}
                  </span>
                </small>
              </div>
              <v-divider class="white"></v-divider>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-row>
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
                  @click="removeMovieByCategory(category, item)"
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
        :snackbar-text="snackbarObject.snackbarText"
      />
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Snackbar from "../components/Snackbar";
import TrailerDialog from "../components/TrailerDialog";

import { firebase, db } from "../../firebase";

export default {
  props: ["arrayMovies", "category"],
  components: {
    Snackbar,
    TrailerDialog,
  },
  data() {
    return {
      trailerDialog: false,
      title: "",
      release_date: "",
      overview: "",
      img: "",
    };
  },
  computed: {
    ...mapState([
      "snackbarObject",
      "user",
      "imageURL",
      "isLoadingAllStoragedMovies",
    ]),
    isUsingMobile() {
      return this.$vuetify.breakpoint.xs;
    },
  },
  methods: {
    ...mapActions(["showSnackbar", "showInfo"]),
    formatDate(date) {
      if (!date) return null;
      if (date.includes("/")) {
        const [, , year] = date.split("/");
        return `${year}`;
      }
      if (date.includes("-")) {
        const [year, , ] = date.split("-");
        return `${year}`;
      }
    },
    async removeMovieByCategory(category, movie) {
      const MY_DOC_ID = localStorage.getItem("docID");
      let myDocRef = await db.doc(`userData/${MY_DOC_ID}/myMovies/${category}`);
      myDocRef
        .update({
          moviesList: firebase.firestore.FieldValue.arrayRemove(movie),
        })
        .then(() => {
          this.$store.dispatch("getAllStoragedMovies");
          this.showSnackbar({
            text: this.$t(`comp-snackbar.movie-removed`),
            color: "success",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

.movie-img {
  width: 100% !important;
  height: 100% !important;
}

.myrate-section {
  position: absolute;
  bottom: 25%;
  left: 25%;
  transform: translate(-50%, 0);
}

#movie-rate {
  background: $gradient_1;
  padding: 10px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
}

.rate-number {
  font-size: 22px;
  color: white;
  display: block;
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

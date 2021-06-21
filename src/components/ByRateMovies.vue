<template>
  <v-container fluid>
    <!-- INFO DIALOG -->

    <v-dialog
      v-model="dialog"
      width="800"
      height="100%"
      v-if="dialog"
      overlay-opacity="2"
    >
      <v-card>
        <v-img :src="url + img" width="100%" height="100%" class="pa-5">
          <v-card-title id="dialog-title">
            {{ title }}
          </v-card-title>
        </v-img>

        <v-card-text id="dialog-text" class="mt-5">
          <p id="dialog-date">{{ release_date }}</p>
          <p id="dialog-overview">{{ overview }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn block @click="dialog = false" class="close-info-btn"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row class="mt-5">
      <v-col></v-col>
      <v-col>
        <v-card
          color="error"
          class="white--text pa-2 m-5 empty-error-message"
          v-if="arrayMovies.length === 0"
          >There are no movies in this category yet.</v-card
        >
      </v-col>
      <v-col></v-col>
      <v-row no-gutters>
        <v-col
          lg="4"
          v-for="(item, i) in arrayMovies"
          :key="'A' + i"
          class="text-center mx-auto"
        >
          <div>
            <div class="movie-card indigo darken-4 white--text">
              <v-row no-gutters>
                <v-col cols="6">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <p class="headline white--text text-center movie-title">
                        {{ item.movie_data.title }}
                      </p>
                      <p
                        class="overline white--text text-center rounded movie-date mb-10"
                      >
                        {{ item.movie_data.release_date.slice(0, 4) }}
                      </p>
                      <v-divider class="white"></v-divider>
                      <div v-show="category === 'byrate'">
                        <v-list-item-subtitle class="white--text mt-10 text-center"
                          >My rate:
                          <span class="rate-number mt-10">{{
                            item.rate
                          }}</span></v-list-item-subtitle
                        >
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                  <div class="card-buttons">
                    <v-card-actions>
                      <v-btn
                        rounded
                        color="info darken-2"
                        elevation="5"
                        class="white--text mx-auto"
                        v-on:click="showInfo(item)"
                      >
                        <v-icon>mdi-information</v-icon>
                      </v-btn>
                      <v-btn
                        rounded
                        color="red"
                        elevation="5"
                        class="white--text mx-auto"
                        @click="removeMovie(item)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </div>
                </v-col>
                <v-col cols="6">
                  <v-img
                    :src="url + item.movie_data.poster_path"
                    class="movie-img"
                  ></v-img>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>

export default {
  props: ["category", "arrayMovies"],
  data() {
    return {
      url: "https://image.tmdb.org/t/p/original",
      dialog: false,
      title: "",
      release_date: "",
      overview: "",
      img: "",
      array_IDs: [],
      userID: null,
    };
  },
  mounted() {
    this.getUserID()
  },
  methods: {
    removeMovie(item) {
      const storage = JSON.parse(localStorage.getItem("storageUserDATA")) || [];
      console.log(storage)
      if (this.category === "byrate") {
      const index = this.arrayMovies.indexOf(item);
        if (index > -1) {
          this.arrayMovies.splice(index, 1);
        }
        storage[this.userID].ratedMovies = this.arrayMovies
        
        localStorage.setItem("storageUserDATA", JSON.stringify(storage));
      }
    },
    showInfo(item) {
      this.dialog = true;
      this.title = item.movie_data.title;
      this.overview = item.movie_data.overview;
      this.release_date = item.movie_data.release_date;
      this.img = item.movie_data.backdrop_path;
    },
    getUserID () {
      const userID= JSON.parse(localStorage.getItem("USERID")) || {};
      this.userID  = userID.id
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  .movie-card {
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgb(33, 33, 33), rgb(0, 20, 56));
    margin-bottom: 50px;
    border-radius: 10px;
    box-shadow: 0px 10px 10px black;
  }

  .movie-img {
    width: 100% !important;
    height: 100% !important;
    border-radius: 0px 10px 10px 0px;
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
    border-radius: 10px;
    box-shadow: 0px 10px 10px black;
    margin: 20px;
  }

  .movie-img {
    width: auto !important;
    height: 100% !important;
    border-radius: 0px 10px 10px 0px;
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
    border-radius: 10px;
    box-shadow: 0px 10px 10px black;
  }

  .movie-img {
    width: auto !important;
    height: 100% !important;
    border-radius: 0px 10px 10px 0px;
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

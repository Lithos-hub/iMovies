<template>
  <div>
    <SectionTitle :sectionSubtitle="subtitle" />
    <!-- SNACKBAR -->
    <v-snackbar
      class="snackbar"
      v-model="snackbar"
      height="50px"
      :color="snackbarColor"
      tile
      :timeout="1000"
    >
      <div class="text-center elevation-10 pa-2">
        <span class="m-auto secondary px-10 rounded ml-2">
          {{ snackbarText }}
        </span>
      </div>
    </v-snackbar>

    <!-- BUTTON FOR MENU EXPAND IN MOBILE DEVICES -->
    <div class="text-center" id="years-menu-btn">
      <v-btn icon @click="expand = !expand">
        <v-icon color="cyan">mdi-menu</v-icon>
      </v-btn>
    </div>

    <!-- MENU EXPAND IN MOBILE DEVICES  -->
    <v-expand-transition>
      <v-row id="years-menu" v-if="expand">
        <v-col
          class="year-col"
          v-on:click="expand = !expand"
          @click="getMoviesByYear('2010')"
        >
          2010
        </v-col>
        <v-col
          class="year-col"
          v-on:click="expand = !expand"
          @click="getMoviesByYear('2011')"
        >
          2011
        </v-col>
        <v-col
          class="year-col"
          v-on:click="expand = !expand"
          @click="getMoviesByYear('2012')"
        >
          2012
        </v-col>
        <v-col
          class="year-col"
          v-on:click="expand = !expand"
          @click="getMoviesByYear('2013')"
        >
          2013
        </v-col>
        <v-col
          class="year-col"
          v-on:click="expand = !expand"
          @click="getMoviesByYear('2014')"
        >
          2014
        </v-col>
        <v-col
          class="year-col"
          v-on:click="expand = !expand"
          @click="getMoviesByYear('2015')"
        >
          2015
        </v-col>
        <v-col
          class="year-col"
          v-on:click="expand = !expand"
          @click="getMoviesByYear('2016')"
        >
          2016
        </v-col>
        <v-col
          class="year-col"
          v-on:click="expand = !expand"
          @click="getMoviesByYear('2017')"
        >
          2017
        </v-col>
        <v-col
          class="year-col"
          v-on:click="expand = !expand"
          @click="getMoviesByYear('2018')"
        >
          2018
        </v-col>
        <v-col
          class="year-col"
          v-on:click="expand = !expand"
          @click="getMoviesByYear('2019')"
        >
          2019
        </v-col>
        <v-col
          class="year-col"
          v-on:click="expand = !expand"
          @click="getMoviesByYear('2020')"
        >
          2020
        </v-col>
      </v-row>
    </v-expand-transition>

    <v-tabs class="bar-tabs" centered background-color="transparent">
      <v-tabs-slider color="cyan"></v-tabs-slider>
      <v-tab
        active-class="cyan--text"
        class="white--text tab"
        @click="getMoviesByYear('2010')"
        >2010</v-tab
      >
      <v-tab
        active-class="cyan--text"
        class="white--text tab"
        @click="getMoviesByYear('2011')"
        >2011</v-tab
      >
      <v-tab
        active-class="cyan--text"
        class="white--text tab"
        @click="getMoviesByYear('2012')"
        >2013</v-tab
      >
      <v-tab
        active-class="cyan--text"
        class="white--text tab"
        @click="getMoviesByYear('2013')"
        >2012</v-tab
      >
      <v-tab
        active-class="cyan--text"
        class="white--text tab"
        @click="getMoviesByYear('2014')"
        >2014</v-tab
      >
      <v-tab
        active-class="cyan--text"
        class="white--text tab"
        @click="getMoviesByYear('2015')"
        >2015</v-tab
      >
      <v-tab
        active-class="cyan--text"
        class="white--text tab"
        @click="getMoviesByYear('2016')"
        >2016</v-tab
      >
      <v-tab
        active-class="cyan--text"
        class="white--text tab"
        @click="getMoviesByYear('2017')"
        >2017</v-tab
      >
      <v-tab
        active-class="cyan--text"
        class="white--text tab"
        @click="getMoviesByYear('2018')"
        >2018</v-tab
      >
      <v-tab
        active-class="cyan--text"
        class="white--text tab"
        @click="getMoviesByYear('2019')"
        >2019</v-tab
      >
      <v-tab
        active-class="cyan--text"
        class="white--text tab"
        @click="getMoviesByYear('2020')"
        >2020</v-tab
      >
    </v-tabs>

    <div id="year-selected-mobile">{{ year }}</div>

    <v-container fluid>
      <div class="moviesColumns" v-if="panelExpanded">
        <v-row no-gutters>
          <v-col
            md="3"
            xs="12"
            v-for="(item, i) in moviesByYear"
            :key="'B' + i"
          >
            <div class="fadeIn">
              <v-card class="transparent mb-15" outlined>
                <v-row no-gutters class="d-flex justify-start">
                  <!-- MOVIE IMAGE AND DYNAMIC ICONS -->
                  <v-col md="9" xs="12">
                    <v-img
                      :src="url + item.poster_path"
                      class="movie-img ml-auto"
                      @click="showDetails(item)"
                    >
                      <div
                        v-for="(id_watched, i) in arrWatchedIDS"
                        :key="'C' + i"
                      >
                        <v-icon
                          v-if="id_watched === item.id"
                          class="eye-icon-img"
                          >mdi-eye</v-icon
                        >
                      </div>
                      <div
                        v-for="(id_favorite, i) in arrFavoriteIDS"
                        :key="'D' + i"
                      >
                        <v-icon
                          v-if="id_favorite === item.id"
                          class="heart-icon-img"
                          >mdi-heart</v-icon
                        >
                      </div>
                      <div
                        v-for="(id_toWatch, i) in arrToWatchIDS"
                        :key="'E' + i"
                      >
                        <v-icon
                          v-if="id_toWatch === item.id"
                          class="plus-icon-img"
                          >mdi-plus</v-icon
                        >
                      </div>
                      <div v-for="(rated, i) in arrRatedIDS" :key="'F' + i">
                        <div class="rate-img" v-if="rated.id === item.id">
                          {{ rated.rate }}
                        </div>
                      </div>
                      <div class="movie-img-text">
                        <p>Show details</p>
                      </div>
                    </v-img>
                    <h3 class="movie-title ma-auto justify-center">
                      {{ item.title }}
                    </h3>
                    <!-- MOVIE BUTTONS -->
                  </v-col>
                  <v-col md="3" xs="12">
                    <div class="mt-10" id="btn-column">
                      <!-- BUTTON - WATCHED MOVIE  -->
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            small
                            color="blue"
                            class="white--text d-block mt-5 mx-2"
                            v-bind="attrs"
                            v-on="on"
                            @click="
                              addWatched(item);
                              saveIDMovies();
                            "
                            :disabled="
                              auxWatchedMovies.includes(item) ? true : false
                            "
                            ><v-icon>mdi-eye</v-icon></v-btn
                          >
                        </template>
                        <span>Add to watched movies</span>
                      </v-tooltip>
                      <!-- BUTTON - FAVORITE MOVIE  -->
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            small
                            color="red"
                            class="white--text d-block mt-5 mx-2"
                            v-bind="attrs"
                            v-on="on"
                            @click="
                              addFavorite(item);
                              saveIDMovies();
                            "
                            :disabled="
                              auxFavoriteMovies.includes(item) ? true : false
                            "
                            ><v-icon>mdi-heart</v-icon>
                          </v-btn>
                        </template>
                        <span>Add to favourite movies</span>
                      </v-tooltip>

                      <v-dialog
                        transition="dialog-bottom-transition"
                        max-width="600"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <div color="primary" v-bind="attrs" v-on="on">
                            <!-- BUTTON - TO RATE MOVIE  -->
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on2, attrs2 }">
                                <v-btn
                                  small
                                  color="#2c112e"
                                  class="cyan--text d-block mt-5 mx-2"
                                  v-bind="attrs2"
                                  v-on="on2"
                                  @click="setRate(item)"
                                  ><v-icon>mdi-numeric</v-icon></v-btn
                                >
                              </template>
                              <span>Rate movie</span>
                            </v-tooltip>
                          </div>
                        </template>
                        <template v-slot:default="rateDialog">
                          <v-card>
                            <v-toolbar color="primary" dark
                              >{{ item.title }}

                              <v-btn
                                icon
                                depressed
                                class="ml-auto"
                                @click="rateDialog.value = false"
                                ><v-icon>mdi-close</v-icon></v-btn
                              >
                            </v-toolbar>

                            <v-card-text>
                              <div class="pa-12">
                                <h4 class="text-center">Rate the movie</h4>
                                <div
                                  class="text-center primary--text m-5"
                                  id="rate-number"
                                >
                                  {{ value / 10 }}
                                </div>
                                <!-- RATE THE MOVIE -->
                                <form>
                                  <v-slider
                                    v-model="value"
                                    step="5"
                                    class="mt-10"
                                  ></v-slider>
                                  <v-btn
                                    block
                                    color="secondary"
                                    @click="
                                      addRate(item);
                                      saveIDMovies();
                                      rateDialog.value = false;
                                    "
                                    >Done</v-btn
                                  >
                                  <v-btn
                                    v-if="auxRatedMovies.includes(item)"
                                    block
                                    color="error"
                                    class="my-5"
                                    @click="
                                      removeRate(item);
                                      rateDialog.value = false;
                                    "
                                    >Remove rate</v-btn
                                  >
                                </form>
                              </div>
                            </v-card-text>
                          </v-card>
                        </template>
                      </v-dialog>

                      <!-- BUTTON - TO WATCH MOVIE  -->
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            small
                            color="indigo darken-2"
                            class="white--text d-block mt-5 mx-2"
                            v-bind="attrs"
                            v-on="on"
                            @click="
                              addToWatch(item);
                              saveIDMovies();
                            "
                            :disabled="
                              auxToWatchMovies.includes(item) ? true : false
                            "
                            ><v-icon>mdi-plus</v-icon></v-btn
                          >
                        </template>
                        <span>Add to to-watch list</span>
                      </v-tooltip>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import axios from "axios";
import { mapState } from 'vuex';

export default {
  name: "Ranking",
  components: {
    SectionTitle,
  },
  data() {
    return {
      subtitle: "Popular films of the last decade",
      url: "https://image.tmdb.org/t/p/original",
      userID: null,
      year: "",
      snackbar: false,
      snackbarText: "",
      snackbarColor: "",
      category: "",
      rateDialog: false,
      expand: false,
      errorMessage: "",
      panelExpanded: false,
      auxWatchedMovies: [],
      auxFavoriteMovies: [],
      auxToWatchMovies: [],
      auxRatedMovies: [],
      jsonWatchedMovies: [],
      jsonFavoriteMovies: [],
      jsonToWatchMovies: [],
      jsonRatedMovies: [],
      arrWatchedIDS: [],
      arrToWatchIDS: [],
      arrRatedIDS: [],
      arrFavoriteIDS: [],
      arrIDS: [],
      loaded: false,
      value: 0,
      moviesByYear: [],
      userData: [],
    };
  },
  mounted() {
    this.getMoviesByYear("2010");
    this.getUserID();
    this.saveIDMovies();
  },
  computed: {
    ...mapState(["apikey"])
  },
  methods: {
    showSuccess(text) {
      this.snackbar = true;
      this.snackbarText = text;
      this.snackbarColor = "cyan";
    },
    showWarning(text) {
      this.snackbar = true;
      this.snackbarText = text;
      this.snackbarColor = "orange";
    },
    showDetails(item) {
      this.$router.push(`/movie/${item.id}`);
    },
    getMoviesByYear(year) {
      this.year = year;
      const url = "https://api.themoviedb.org/3";
      
      const moviesUrl = `${url}/discover/movie?year=${year}&api_key=${this.apikey}&sort_by=popularity.desc&page=1`;

      return new Promise(() => {
        axios
          .get(moviesUrl)
          .then((resp) => {
            this.panelExpanded = true;
            this.moviesByYear = resp.data.results;
            for (let data of this.moviesByYear) {
              this.arrIDS.push(data.id);
            }
          })
          .catch((e) => {
            console.info(e);
            this.errorMessage =
              "The answer is taking too long. There may have been an error with the database. Please reload the website.";
          });
      });
    },
    getUserID() {
      const userID = JSON.parse(localStorage.getItem("USERID")) || {};
      this.userID = userID.id;
    },
    // **** LOCALSTORAGE FUNCTIONS **** //
    addWatched(item) {
      const json = { rate: this.value / 10, movie: item };

      this.auxWatchedMovies.push(item);

      this.writeMovieData(json, "isWatched", item);
    },
    addFavorite(item) {
      const json = { rate: this.value / 10, movie: item };

      this.auxFavoriteMovies.push(item);

      this.writeMovieData(json, "isFavorite", item);
    },
    addToWatch(item) {
      const json = { rate: this.value / 10, movie: item };

      this.auxToWatchMovies.push(item);

      this.writeMovieData(json, "isToWatch", item);
    },
    addRate(item) {
      const json = { rate: this.value / 10, movie: item };

      this.auxRatedMovies.push(item);

      this.writeMovieData(json, "isRated", item);
    },
    setRate(item) {
      this.value = 0;
      for (let data of this.jsonRatedMovies) {
        if (data.movie.id === item.id) {
          this.value = data.rate * 10;
        }
      }
    },
    removeRate(item) {
      const storage = JSON.parse(localStorage.getItem("storageUserDATA")) || [];
      for (let data of this.auxRatedMovies) {
        if (data.id === item.id) {
          this.auxRatedMovies.splice(this.auxRatedMovies.indexOf(data), 1);
        }
      }
      for (let data of this.arrRatedIDS) {
        if (data.id === item.id) {
          this.arrRatedIDS.splice(this.arrRatedIDS.indexOf(data), 1);
        }
      }
      for (let data of this.jsonRatedMovies) {
        if (data.movie.id === item.id) {
          this.jsonRatedMovies.splice(this.jsonRatedMovies.indexOf(data), 1);
        }
      }
      this.value = 0;
      storage[this.userID].ratedMovies = this.jsonRatedMovies;
      localStorage.setItem("storageUserDATA", JSON.stringify(storage));
    },
    writeMovieData(json, type, item) {
      const storage = JSON.parse(localStorage.getItem("storageUserDATA")) || [];

      if (type === "isWatched") {
        let isRepeated = false;
        for (let data of this.jsonWatchedMovies) {
          if (data.movie.id === item.id) {
            isRepeated = true;
            this.jsonWatchedMovies.splice(
              this.jsonWatchedMovies.indexOf(data),
              1
            );
            this.showWarning("Removed from WATCHED category");
          } else {
            isRepeated = false;
          }
        }
        if (!isRepeated) {
          this.jsonWatchedMovies.push(json);
          this.showSuccess("Added to WATCHED category");
        }

        storage[this.userID].watchedMovies = this.jsonWatchedMovies;
        localStorage.setItem("storageUserDATA", JSON.stringify(storage));
      }
      if (type === "isFavorite") {
        let isRepeated = false;
        for (let data of this.jsonFavoriteMovies) {
          if (data.movie.id === item.id) {
            isRepeated = true;
            this.jsonFavoriteMovies.splice(
              this.jsonFavoriteMovies.indexOf(data),
              1
            );
            this.showWarning("Removed from FAVORITE category");
          } else {
            isRepeated = false;
          }
        }
        if (!isRepeated) {
          this.jsonFavoriteMovies.push(json);
          this.showSuccess("Added to FAVORITE category");
        }

        storage[this.userID].favoriteMovies = this.jsonFavoriteMovies;
        localStorage.setItem("storageUserDATA", JSON.stringify(storage));
      }
      if (type === "isToWatch") {
        let isRepeated = false;
        for (let data of this.jsonToWatchMovies) {
          if (data.movie.id === item.id) {
            isRepeated = true;
            this.jsonToWatchMovies.splice(
              this.jsonToWatchMovies.indexOf(data),
              1
            );
            this.showWarning("Removed from TO WATCH category");
          } else {
            isRepeated = false;
          }
        }
        if (!isRepeated) {
          this.jsonToWatchMovies.push(json);
          this.showSuccess("Added to TO WATCH category");
        }

        storage[this.userID].toWatchMovies = this.jsonToWatchMovies;
        localStorage.setItem("storageUserDATA", JSON.stringify(storage));
      }
      if (type === "isRated") {
        let isRepeated = false;
        for (let data of this.jsonRatedMovies) {
          if (data.movie.id === item.id) {
            isRepeated = true;
            data.rate = json.rate;
            this.showWarning("Modified rate");
          } else {
            isRepeated = false;
          }
        }
        if (!isRepeated) {
          this.jsonRatedMovies.push(json);
          this.showSuccess("Added to RATED category");
        }

        storage[this.userID].ratedMovies = this.jsonRatedMovies;
        localStorage.setItem("storageUserDATA", JSON.stringify(storage));
      }
    },
    saveIDMovies() {
      const storage = JSON.parse(localStorage.getItem("storageUserDATA")) || [];

      this.jsonWatchedMovies = storage[this.userID].watchedMovies;
      this.jsonFavoriteMovies = storage[this.userID].favoriteMovies;
      this.jsonToWatchMovies = storage[this.userID].toWatchMovies;
      this.jsonRatedMovies = storage[this.userID].ratedMovies;

      let watched = storage[this.userID].watchedMovies || [];
      let favorite = storage[this.userID].favoriteMovies || [];
      let rated = storage[this.userID].ratedMovies || [];
      let toWatch = storage[this.userID].toWatchMovies || [];

      let watchedAuxArr = [];
      let favoriteAuxArr = [];
      let ratedAuxArr = [];
      let toWatchAuxArr = [];

      let uniqueWatched = [];
      let uniqueFavorite = [];
      let uniqueRated = [];
      let uniqueToWatch = [];

      for (let data of watched) {
        watchedAuxArr.push(data.movie.id);
        uniqueWatched = [...new Set(watchedAuxArr)];
      }
      for (let data of rated) {
        ratedAuxArr.push({
          id: data.movie.id,
          rate: data.rate,
        });
        uniqueRated = [...new Set(ratedAuxArr)];
      }
      for (let data of toWatch) {
        toWatchAuxArr.push(data.movie.id);
        uniqueToWatch = [...new Set(toWatchAuxArr)];
      }
      for (let data of favorite) {
        favoriteAuxArr.push(data.movie.id);
        uniqueFavorite = [...new Set(favoriteAuxArr)];
      }

      this.arrWatchedIDS = uniqueWatched;
      this.arrFavoriteIDS = uniqueFavorite;
      this.arrRatedIDS = uniqueRated;
      this.arrToWatchIDS = uniqueToWatch;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

.fadeIn {
  animation: fadeIn 1s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.snackbar {
  position: fixed !important;
  bottom: -0.5rem !important;
  width: 100% !important;
}

.movie-img-text {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 75%;
  transform: translate(-50%, -50%);
  color: cyan;
  text-shadow: none;
  font-weight: bold;
  text-transform: uppercase;
  filter: none;
  background: $dark;
  padding: 1em;
  opacity: 0;
  transition: 0.3s;
  font-size: 1em;
  box-shadow: inset 0 0 10px black;
}

.movie-img {
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);

    .movie-img-text {
      opacity: 1;
    }
  }
}
.eye-icon-img {
  color: white !important;
  text-shadow: none !important;
  background: #2196f3;
  padding: 10px;
  font-size: 30px;
  border-radius: 0px 10px 0px 0px;
  position: absolute;
  bottom: 0px;
  left: 0px;
}
.heart-icon-img {
  color: $secondary !important;
  text-shadow: none !important;
  background: white;
  padding: 10px;
  font-size: 30px;
  border-radius: 10px 0px 0px 0px;
  position: absolute;
  bottom: 0px;
  right: 0px;
}

.plus-icon-img {
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 10px;
  font-size: 30px;
  border-radius: 0px 0px 10px 0px;
  background: #404ea7;
  color: white;
  text-shadow: none;
}
.rate-img {
  color: rgb(0, 247, 255) !important;
  text-shadow: none !important;
  background: #2c112e;
  font-size: 20px;
  font-family: $style2;
  letter-spacing: 0px;
  width: 50%;
  border-radius: 0px 0px 0px 10px;
  text-align: center;
  position: absolute;
  top: 0px;
  right: 0px;
}

.rate-input {
  font-size: 1em;
  height: 100%;
  width: 100%;
  padding: 100px;
  border: 2px solid $primary;
  border-radius: 10px;

  &:focus {
    outline: none;
  }
}

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  .section-subtitle {
    font-family: $style3;
    font-size: 1em;
    text-align: center;
    margin-bottom: 20px;
    letter-spacing: 4px;
    background: url("../assets/img/background5.jpg");
    background-repeat: repeat;
    color: rgb(255, 212, 212) !important;
    text-shadow: 0px 0px 10px $secondary;
    animation: move 2s ease-in-out;
  }

  #rate-number {
    font-size: 3em;
  }

  @keyframes move {
    from {
      margin-left: -3000px;
      opacity: 0;
    }
    to {
      margin-left: 0px;
      opacity: 1;
    }
  }

  #year-selected-mobile {
    display: block;
    text-align: center;
    font-size: 2em;
    margin-bottom: 50px;
    margin-top: 50px;
    color: cyan;
  }

  .year {
    text-align: center;
  }

  .header {
    align-self: center !important;
    font-family: $style3;
    font-weight: lighter;
    font-size: 6em !important;
    background-color: $dark2 !important;
    color: $secondary;

    &:hover {
      color: white;
      transition: color 1s;
    }

    &:focus {
      outline: none;
    }
  }

  #btn-column {
    display: flex !important;
    padding-inline: 30px;
    justify-content: center;
  }

  .moviesColumns {
    text-align: center;
    background: $dark2;
    color: white;
    text-shadow: 0px 0px 3px $secondary, 0px 0px 5px red;
    margin-bottom: 100px;
  }

  .movie-img {
    width: 300px;
    border-radius: 10px 10px 10px 10px !important;
    padding: 15px;
    height: auto;
    margin: 0 auto;
  }

  .movie-title {
    font-weight: lighter;
    font-size: 1em;
    padding-top: 20px;
    color: white;
  }

  .bar-tabs {
    display: none;
  }

  #years-menu-btn {
    display: block;
  }

  #years-menu {
    margin: 10px;
    text-align: center;
  }

  .year-col {
    margin: 5px;
    border-radius: 20px;
    color: $dark2;
    font-weight: bold;
    background: $primary;
    font-family: $style3;

    &:hover {
      cursor: pointer;
    }
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  .section-subtitle {
    font-family: $style3;
    font-size: 2em;
    text-align: center;
    margin-bottom: 20px;
    letter-spacing: 4px;
    background: url("../assets/img/background5.jpg");
    background-repeat: repeat;
    color: rgb(255, 212, 212) !important;
    text-shadow: 0px 0px 10px $secondary;
    animation: move 2s ease-in-out;
  }

  @keyframes move {
    from {
      margin-left: -3000px;
      opacity: 0;
    }
    to {
      margin-left: 0px;
      opacity: 1;
    }
  }

  .year {
    text-align: center;
  }

  #rate-number {
    font-size: 5em;
  }

  .header {
    align-self: center !important;
    font-family: $style3;
    font-weight: lighter;
    font-size: 8em !important;
    background-color: $dark2 !important;
    color: $secondary;

    &:hover {
      color: white;
      transition: color 1s;
    }

    &:focus {
      outline: none;
    }
  }

  #year-selected-mobile {
    display: none;
  }

  #btn-column {
    display: block !important;
    padding-inline: 0px;
    justify-content: center;
  }

  .moviesColumns {
    text-align: center;
    background: $dark2;
    letter-spacing: 5px;
    color: white;
    text-shadow: 0px 0px 3px $secondary, 0px 0px 5px red;
    margin-bottom: 100px;
  }

  .movie-img {
    width: 220px;
    margin: 20px;
    padding: 0px;
    height: auto;
    border-radius: 10px 10px 10px 10px !important;
    box-shadow: 0px 5px 10px black;
  }

  .movie-title {
    font-weight: lighter;
    font-size: 1em;
    color: white;
  }

  .bar-tabs {
    display: block;
  }

  #years-menu-btn {
    display: none;
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  .section-subtitle {
    font-family: $style3;
    font-size: 2em;
    text-align: center;
    margin-bottom: 20px;
    letter-spacing: 4px;
    background: url("../assets/img/background5.jpg");
    background-repeat: repeat;
    color: rgb(255, 212, 212) !important;
    text-shadow: 0px 0px 10px $secondary;
    animation: move 2s ease-in-out;
  }

  @keyframes move {
    from {
      margin-left: -3000px;
      opacity: 0;
    }
    to {
      margin-left: 0px;
      opacity: 1;
    }
  }

  .year {
    text-align: center;
  }

  .header {
    align-self: center !important;
    font-family: $style3;
    font-weight: lighter;
    font-size: 8em !important;
    background-color: $dark2 !important;
    color: $secondary;

    &:hover {
      color: white;
      transition: color 1s;
    }

    &:focus {
      outline: none;
    }
  }

  #year-selected-mobile {
    display: none;
  }

  #btn-column {
    margin-right: 0 auto;
    justify-content: left;
  }

  #rate-number {
    font-size: 6em;
  }

  .moviesColumns {
    text-align: center;
    background: $dark2;
    color: white;
    text-shadow: 0px 0px 3px $secondary, 0px 0px 5px red;
    margin-bottom: 100px;
  }

  .movie-img {
    width: 300px;
    margin: 20px;
    padding: 0px;
    height: auto;
    border-radius: 10px 10px 10px 10px !important;
    box-shadow: 0px 5px 10px black;
  }

  .movie-title {
    font-weight: lighter;
    font-size: 1em;
    color: white;
  }

  .bar-tabs {
    display: block;
  }

  #years-menu-btn {
    display: none;
  }
}
</style>

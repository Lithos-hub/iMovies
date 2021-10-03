<template>
  <div>
    <SectionTitle :sectionSubtitle="isSearchingMovie ? 'Search by movie title' : 'Search by actor/actress name'" v-if="showContent" />

    <!-- SEARCH BAR -->
    <v-container v-if="showContent" id="search-bar">
      <v-row no-gutters>
        <v-col cols="12">
            <div class="input-container">
              <v-text-field
                class="input-text-field"
                v-model="input"
                filled
                dark
                rounded
                label="Search"
                :background-color="isSearchingMovie ? 'primary' : 'green'"
                append-icon="mdi-magnify"
                full-width
                @input="fillItemsList"
                />
                <v-list dark v-if="inputItemsList.length">
                    <v-list-item v-for="(item, i) in inputItemsList" :key="i" @click="searchByInput(item)">
                      <p class="white--text" v-if="!isSearchingMovie">{{ item.name }}</p>
                      <p class="white--text" v-if="isSearchingMovie">{{ item.title }}</p>
                    </v-list-item>
                </v-list>
            </div>
        </v-col>
      </v-row>
    </v-container>

    <v-row :class="showContent ? 'options-buttons' : 'options-buttons-start'">
      <v-col cols="6" class="text-right">
        <v-btn dark color="primary" large width="350px" @click="isSearchingMovie = true; showContent = true">
          Search by movie title
        </v-btn>
      </v-col>
      <v-col cols="6" class="text-left">
        <v-btn dark color="green" large width="350px" @click="isSearchingMovie = false; showContent = true">
          Search by actor/actress name
        </v-btn>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <!-- TRAILER DIALOG -->

    <TrailerDialog
      v-if="dialog"
      :video="trailerVideo"
      :message-error="videoError"
      @close-dialog="dialog = false"
    />
    
    <v-progress-circular
      v-if="loading"
      class="progressSpinner"
      :size="100"
      :width="10"
      color="cyan"
      indeterminate
    ></v-progress-circular>

    <!-- RESULTS SEARCHING BY PERSON -->

    <v-container v-if="!loading">
      <v-row v-for="(person, i) in searchedPerson" :key="'A' + i" class="pb-10 mt-10">
        <v-col cols="3" class="mt-15">
          <v-img
            :src="person.profile_path !== null ? url + person.profile_path : no_image"
            id="person-img"
            width="100%"
            class="rounded elevation-10">
          </v-img>
          <v-list dark dense>
            <v-list-item>
              Age: <span class="ml-2 cyan--text"> {{ person.info.age }}</span>
            </v-list-item>
            <v-list-item>
              Place of birth: <span class="ml-2 cyan--text"> {{ person.info.place_of_birth }}</span>
            </v-list-item>
            <v-list-item>
              Homepage:<span class="ml-2 cyan--text"> 
                <a v-if="person.info.homepage" :href="person.info.homepage">{{ person.info.homepage }}</a>
                <div v-else class="red--text">No homepage</div>
                </span>
            </v-list-item>
            <v-list-item>
              Gender: <span class="ml-2 cyan--text"> {{ person.info.gender }}</span>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col>
          <h1>
          {{ person.name}}
          </h1>
          <v-divider></v-divider>
          <v-list dark dense>
              <v-list-item v-for="(movie, j) in personMoviesList" :key="'B' + j" class="my-5" :to="'/movie/' + movie.id">
            <v-img
              aspect-ratio="1"
              max-width="200px"
              class="mr-5 elevation-5"
              :src="movie.poster_path != null ? url + movie.poster_path : no_image" />
                <h2 class="mr-10 cyan--text">{{ movie.title }}</h2>
                <h3 class="ml-auto">{{ movie.release_date }}</h3>
              </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>

    <!-- RESULTS SEARCHING BY MOVIE TITLE -->
    <v-container v-if="searchedMovie.length">
      <v-btn
        id="show-where-btn"
        dark
        :color="wheretowatch ? 'red' : 'info'"
        @click="wheretowatch = !wheretowatch"
        >{{ wheretowatch ? "Hide info" : "Show where to watch" }}</v-btn
      >
    </v-container>
    <v-container fluid>
      <v-row v-for="(item, i) in searchedMovie" :key="i" class="pb-10 mt-10">
        <v-col lg="3" md="4">
          <!-- MOVIE IMG -->
          <v-img
            :src="item.poster_path != null ? url + item.poster_path : no_image"
            id="movie-img"
            class="rounded"
          ></v-img>
        </v-col>
        <!-- PRIMARY INFO -->
        <v-col lg="4" cols="12">
          <h1 class="movie-title">{{ item.title }}</h1>
          <small
            :class="
              item.release_date !== undefined ? 'cyan--text' : 'red--text'
            "
          >
            <span class="white--text">Release date:</span>
            {{
              item.release_date !== undefined
                ? item.release_date
                : "Release date no availble"
            }}</small
          >
          <!-- MOVIE GENRES -->
          <small class="d-block mt-5">
            <span
              v-for="(genre, z) in item.genre_ids"
              :key="'A' + z"
              id="movie-genres"
            >
              {{ genre === 28 ? "Action" : "" }}
              {{ genre === 12 ? "Adventure" : "" }}
              {{ genre === 16 ? "Animation" : "" }}
              {{ genre === 35 ? "Comedy" : "" }}
              {{ genre === 80 ? "Crime" : "" }}
              {{ genre === 99 ? "Documentary" : "" }}
              {{ genre === 18 ? "Drama" : "" }}
              {{ genre === 10751 ? "Family" : "" }}
              {{ genre === 14 ? "Fantasy" : "" }}
              {{ genre === 36 ? "History" : "" }}
              {{ genre === 27 ? "Horror" : "" }}
              {{ genre === 10402 ? "Music" : "" }}
              {{ genre === 9648 ? "Mystery" : "" }}
              {{ genre === 10749 ? "Romance" : "" }}
              {{ genre === 878 ? "Science Fiction" : "" }}
              {{ genre === 10770 ? "TV Movie" : "" }}
              {{ genre === 53 ? "Thriller" : "" }}
              {{ genre === 10752 ? "War" : "" }}
              {{ genre === 37 ? "Western" : "" }}
            </span>
          </small>

          <!-- VOTE AVERAGE -->
          <div class="mt-5">
            <h4 id="movie-vote-average" class="indigo d-inline px-5">
              {{ item.vote_average }}
            </h4>
            <h5
              id="movie-vote-ratings"
              class="font-weight-bold d-inline primary--text ml-2"
            >
              {{ item.vote_count }}
            </h5>
            <span class="font-weight-light d-inline">ratings</span>
          </div>
          <!-- MOVIE OVERVIEW -->
          <p id="movie-overview">
            {{ item.overview }}
          </p>

          <!-- MOVIE ACTIONS -->
          <v-btn
            class="red"
            dark
            id="trailer-btn"
            @click="getTrailerVideo(item)"
            >View trailer</v-btn
          >
        </v-col>

        <!-- WHERE TO WATCH INFO -->
        <v-col lg="4" md="8">
          <v-expand-transition>
            <v-row no-gutters class="mt-2" v-if="wheretowatch">
              <v-col lg="4">
                <h3 class="text-center blue--text">Buy</h3>
                <h2
                  class="error--text text-center"
                  v-if="!item.providers_buy.length"
                >
                  No data
                </h2>
                <li
                  style="list-style: none"
                  v-for="(buy_provider, z) in item.providers_buy"
                  :key="z"
                  class="text-center"
                >
                  <v-divider></v-divider>
                  <p>
                    {{
                        buy_provider !== undefined ? buy_provider.provider_name : ""
                    }}
                  </p>

                  <img
                    :src="
                      buy_provider === undefined || buy_provider === null
                        ? false
                        : url + buy_provider.logo_path
                    "
                    class="provider-logo"
                  />
                </li>
              </v-col>
              <v-col lg="4">
                <h3 class="text-center orange--text">Flatrate</h3>
                <h2
                  class="error--text text-center"
                  v-if="!item.providers_flatrate.length"
                >
                  No data
                </h2>
                <li
                  style="list-style: none"
                  v-for="(flatrate_provider, z) in item.providers_flatrate"
                  :key="z"
                  class="text-center"
                >
                  <v-divider></v-divider>
                  <p>
                    {{
                      flatrate_provider !== undefined ? flatrate_provider.provider_name : ""
                    }}
                  </p>
                  <img
                    :src="
                      flatrate_provider === undefined ||
                      flatrate_provider === null
                        ? false
                        : url + flatrate_provider.logo_path
                    "
                    class="provider-logo"
                  />
                </li>
              </v-col>
              <v-col lg="4">
                <h3 class="text-center green--text">Rent</h3>
                <h2
                  class="error--text text-center"
                  v-if="!item.providers_rent.length"
                >
                  No data
                </h2>
                <li
                  style="list-style: none"
                  v-for="(rent_provider, z) in item.providers_rent"
                  :key="z"
                  class="text-center"
                >
                  <v-divider></v-divider>
                  <p>
                    {{
                      rent_provider !== undefined ? rent_provider.provider_name : ""
                    }}
                  </p>
                  <img
                    :src="
                      rent_provider === undefined || rent_provider === null
                        ? false
                        : url + rent_provider.logo_path
                    "
                    class="provider-logo"
                  />
                </li>
              </v-col>
            </v-row>
          </v-expand-transition>
        </v-col>
      </v-row>
    </v-container>
    <!-- SNACKBAR -->
    <div v-if="snackbarObject.snackbar">
      <Snackbar
        :snackbar-color="snackbarObject.snackbarColor"
        :snackbar-text="snackbarObject.snackbarText" />
    </div>
  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import axios from "axios";
import Snackbar from "../components/Snackbar";
import TrailerDialog from "../components/TrailerDialog";
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    SectionTitle,
    TrailerDialog,
    Snackbar
  },
  data() {
    return {
      loading: false,
      isSearchingMovie: false,
      showContent: false,
      dialog: false,
      input: "",
      url: "https://image.tmdb.org/t/p/original",
      no_image: require("../assets/img/no-image.jpg"),
      no_overview: "We are sorry. This movie have not available overview.",
      searchedMovie: [],
      searchedPerson: [],
      personMoviesList: [],
      inputItemsList: [],
      wheretowatch: false,
      trailerVideo: "",
      videoError: "",
    };
  },
  computed: {
    ...mapState(["apikey", "snackbarObject", "language"])
  },
  mounted () {
    if (this.input.length > 1) {
      this.fillItemsList()
    }
  },
  methods: {
    ...mapActions(['showSuccess', 'showError']),
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    getPersonAge (birthday) {
        let birthYear = birthday.split('-')[0]
        let birthMonth = birthday.split('-')[1]
        let birthDay = birthday.split('-')[2]
  
        let currentYear = new Date().getFullYear();
        let currentMonth = new Date().getMonth() + 1;
        let currentDay = new Date().getDate();

        let age = currentYear - birthYear;

        if (currentMonth < (birthMonth - 1)) {
          age--;
        }
        if (((birthMonth - 1) == currentMonth) && (currentDay < birthDay)) {
          age--;
        }
        return age;
    },
    getTrailerVideo(item) {
      const movieURL = `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${this.apikey}&language=en-US`;
      this.dialog = true;

      axios
        .get(movieURL)
        .then((resp) => {
          this.videoError = "";
          let videoKey = resp.data.results[0].key;
          let video = "https://www.youtube.com/embed/" + videoKey;
          this.trailerVideo = video;
        })
        .catch((e) => {
          console.log("Trailer movie 1 " + e);
          this.videoError = "Sorry. This video is no available.";
        });
    },
    getProviders() {
          // GET WATCH PROVIDERS (NETFLIX, GOOGLE PLAY, HBO, ETC)
        let providers;
          for (let data of this.searchedMovie) {
            providers = `https://api.themoviedb.org/3/movie/${data.id}/watch/providers?api_key=${this.apikey}`;

            axios
              .get(providers)
              .then((res) => {
                let spain = res.data.results['ES'];

                if (spain !== undefined) {
                  let buy_providers = spain.buy
                  let flat_providers = spain.flatrate
                  let rent_providers = spain.rent
                  if (buy_providers !== undefined) {
                      for (let buyProv of spain.buy) {
                        if (buyProv !== undefined || buyProv !== null) {
                          data.providers_buy.push(buyProv);
                      }
                    }
                  } else {
                    data.providers_buy = []
                  }

                  if (flat_providers !== undefined) {
                    for (let flatProv of spain.flatrate) {
                      if (flatProv !== undefined || flatProv !== null) {
                        data.providers_flatrate.push(flatProv);
                      }
                    }
                  } else {
                    data.providers_flatrate = []
                  }
                  
                  if (rent_providers !== undefined) {
                    for (let rentProv of spain.rent) {
                      if (rentProv !== undefined || rentProv !== null) {
                        data.providers_rent.push(rentProv);
                      }
                    }
                  } else {
                    data.providers_flatrate = []
                  }
                } 

              })
              .catch((e) => {
                console.log(e);
                this.showError('Database connection error')
              });
          }
          this.input = "";
          this.wheretowatch = false;
    },
    fillItemsList() {
      let url
      let arrNames = [];
      let arrTitles = [];
      if (this.input.length) {
        if (this.isSearchingMovie) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apikey}&language=${this.language}&query=${this.input}`;
          axios
          .get(url)
          .then((res) => {
            for (let data of res.data.results) {
              arrTitles.push({
                id: data.id,
                title: data.title
              })
            }

            this.inputItemsList = arrTitles;
          })
          .catch((e) => {
            this.showError('Database connection error')
            console.log(e);
          })
        } else {
          url = `https://api.themoviedb.org/3/search/person?api_key=${this.apikey}&${this.language}&query=${this.input}&page=1`
          axios
          .get(url)
          .then((res) => {
            for (let data of res.data.results) {
              arrNames.push({
                id: data.id,
                name: data.name
              })
            }

            this.inputItemsList = arrNames;
          })
          .catch((e) => {
            this.showError('Database connection error')
            console.log(e);
          });
        }
      }
    },
    searchByInput(item) {
      this.searchedMovie = [];
      this.searchedPerson = [];
      this.personMoviesList = [];
      let url;
      let arrMovie = [];

      if (this.isSearchingMovie) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apikey}&language=${this.language}&query=${item.title}`;
      axios
        .get(url)
        .then((res) => {
          for (let data of res.data.results) {
            arrMovie.push({
              id: data.id,
              poster_path: data.poster_path,
              title: data.title,
              release_date: data.release_date,
              genre_ids: data.genre_ids,
              vote_average: data.vote_average,
              vote_count: data.vote_count,
              overview: data.overview,
              genre_ids: data.genre_ids,
              providers_buy: [],
              providers_flatrate: [],
              providers_rent: []
            })
          }
          this.searchedMovie = arrMovie;
        })
        .catch((e) => {
          this.showError('Database connection error')
          console.log(e);
        });

        this.getProviders();

      } else {
        url = `https://api.themoviedb.org/3/search/person?api_key=${this.apikey}&${this.language}&query=${item.name}&page=1`
        axios
        .get(url)
        .then((res) => {
          for (let data of res.data.results) {
            this.searchedPerson.push({
              id: data.id,
              known_for: data.known_for,
              name: data.name,
              profile_path: data.profile_path,
              info: {}
            })
            this.getMoviesByPerson(data.id)
          }

          this.getPersonInfo();

        })
        .catch((e) => {
          this.showError('Database connection error')
          console.log(e);
        });

      }
    },
    getMoviesByPerson(id) {
      this.inputItemsList = []
      this.loading = true;
      let url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${this.apikey}&language=${this.language}`
      let arr = []
      axios
      .get(url)
      .then((res) => {
        if (res.data.cast !== []) {
            for (let data of res.data.cast) {
              if (data !== undefined) {
                arr.push({
                  id: data.id,
                  title: data.title,
                  character: data.character,
                  release_date: data.release_date,
                  poster_path: data.poster_path,
                  year: ""
              })
            }
          }
        }

        arr.forEach(movie => {
          if (movie.release_date) {
            movie.release_date = this.formatDate(movie.release_date)
            movie.year = movie.release_date.split("/")[2]
          }
        })

        arr = arr.sort((a, b) => {
          return b.year - a.year
        })

        for (let movie of arr) {
          this.personMoviesList.push(movie)
        }
      })
      .catch((e) => {
        this.showError('Database connection error')
        console.log(e);
      });
    },
    async getPersonInfo () {
      for (let person of this.searchedPerson) {
        let url = `https://api.themoviedb.org/3/person/${person.id}?api_key=${this.apikey}&sort_by=popularity.desc`
        await axios
        .get(url)
        .then((res) => {
            person.info = {
              place_of_birth: res.data.place_of_birth,
              homepage: res.data.homepage,
              gender: res.data.gender === 2 ? 'Male' : 'Female',
              age: res.data.birthday ? this.getPersonAge(res.data.birthday) : ""
            }
            

        })
        .catch((e) => {
          console.log(e)
        })
      }
      this.loading = false;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

#movie-vote-average {
  border-radius: 5px;
  text-align: center;
  font-size: 30px;
}

#search-bar {
  animation: fadeIn 1s ease-in;
}

.progressSpinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  #show-where-btn {
    position: relative;
    top: auto;
    right: auto;
    width: 100%;
    border-radius: 30px 30px 30px 30px;
    padding: 20px;
  }
  p {
    font-size: 14px;
  }

  .provider-logo {
    border-radius: 10px;
    max-width: 40px;
  }

  .input-container {
    margin-top: 10px;
  }

  .movie-title {
    font-size: 30px;
    text-align: center;
  }

  #movie-img {
    width: 90%;
    margin: 0 auto;
  }

  #movie-overview {
    font-size: 18px;
    line-height: auto;
    margin-top: 20px;
    text-align: justify;
  }

  #movie-genres {
    border-radius: 25px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    text-align: center;
    background: $primary;
    margin-right: 10px;
    font-family: $style1;
    text-transform: uppercase;
    font-size: 12px;
    display: inline-block;
    margin-bottom: 10px;
  }

  #trailer-btn {
    width: 100%;
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  #show-where-btn {
    position: fixed;
    top: 80;
    right: 0px;
    width: auto;
    border-radius: 30px 0px 0px 30px;
    padding: 20px;
  }

  p {
    font-size: 14px;
  }

  .provider-logo {
    border-radius: 10px;
    max-width: 40px;
  }

  .input-container {
    margin-top: 10px;
  }

  .movie-title {
    font-size: 30px;
    text-align: left;
  }

  #movie-img {
    width: 100%;
    margin: 0 auto;
  }

  #movie-overview {
    font-size: 20px;
    line-height: 40px;
    margin-top: 50px;
    text-align: justify;
  }

  #movie-genres {
    border-radius: 25px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    text-align: center;
    background: $primary;
    margin-right: 10px;
    font-family: $style1;
    text-transform: uppercase;
    font-size: 12px;
    display: inline-block;
    margin-bottom: 10px;
  }

  #trailer-btn {
    width: auto;
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  #show-where-btn {
    position: fixed;
    top: 80;
    right: 0px;
    width: auto;
    border-radius: 30px 0px 0px 30px;
    padding: 20px;
  }

  p {
    font-size: 14px;
  }

  .provider-logo {
    border-radius: 10px;
    max-width: 40px;
  }

  .input-container {
    margin-top: 10px;
  }

  .movie-title {
    font-size: 30px;
    text-align: left;
  }

  #movie-overview {
    font-size: 20px;
    line-height: 40px;
    margin-top: 50px;
    text-align: justify;
  }

  #movie-img {
    width: 100%;
    margin: 0 auto;
  }

  #movie-genres {
    border-radius: 25px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    text-align: center;
    background: $primary;
    margin-right: 10px;
    font-family: $style1;
    text-transform: uppercase;
    font-size: 12px;
    display: inline-block;
    margin-bottom: 10px;
  }

  #trailer-btn {
    width: auto;
  }

  .options-buttons-start {
    transition: all 1s ease-out;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .options-buttons {
    transition: all 1s ease-out;
    position: relative;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    animation: fadeIn 1s ease-in;
  }
}
</style>

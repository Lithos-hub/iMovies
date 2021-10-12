<template>
  <div>
    <SectionTitle :sectionSubtitle="isSearchingMovie ? 'Search by movie title' : 'Search by actor/actress name'" v-if="showContent" />

    <!-- SEARCH BAR -->
    <v-container v-if="showContent" id="search-bar">
      <v-row no-gutters>
        <v-col md="12">
            <div class="input-container">
              <v-text-field
                v-model="input"
                class="input-text-field"
                filled
                dark
                rounded
                label="Search"
                :background-color="isSearchingMovie ? 'primary' : 'green'"
                append-icon="mdi-magnify"
                full-width
                @input="fillItemsList"
                v-on:keyup.enter="searchByInput(input)"
                />
                <v-list dark v-if="inputItemsList.length" id="items-list">
                    <v-list-item v-for="(item, i) in inputItemsList" :key="i" @click="searchByInput(item)">
                      <p class="white--text" v-if="!isSearchingMovie">{{ item.name }}</p>
                      <p class="white--text" v-if="isSearchingMovie">{{ item.title }}</p>
                    </v-list-item>
                </v-list>
            </div>
        </v-col>
      </v-row>
    </v-container>

    <v-row class="options-buttons" v-if="showContent">
      <v-col cols="12" lg="6" md="12">
        <v-btn dark color="primary" large width="350px" @click="isSearchingMovie = true">
          Search by movie title
        </v-btn>
      </v-col>
      <v-col cols="12" lg="6" md="12">
        <v-btn dark color="green" large width="350px" @click="isSearchingMovie = false">
          Search by actor/actress name
        </v-btn>
      </v-col>
    </v-row>

      <v-row no-gutters id="btn-row" v-if="!showContent">
        <v-col cols="12" lg="6" md="12">
          <v-img id="byMovie-btn" src="../assets/img/lotr.jpg" @click="isSearchingMovie = true; showContent = true">
            <h1 id="byMovie-text" class="text-h4">Search by movie title</h1>
          </v-img>
        </v-col>
        <v-col cols="12" lg="6" md="12">
          <v-img id="byPerson-btn" src="../assets/img/tomhanks.jpg"  @click="isSearchingMovie = false; showContent = true">
            <h1 id="byPerson-text" class="text-h4">Search by actor/actress name</h1>
          </v-img>
        </v-col>
      </v-row>

    <v-divider v-if="showContent"></v-divider>

    <!-- TRAILER DIALOG -->
    <TrailerDialog
      v-if="trailerDialog"
      :video="trailerVideo"
      @close-dialog="trailerDialog = false"
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
        <v-col md="3" class="mt-15">
          <v-img
            :src="person.profile_path !== null ? imageURL + person.profile_path : no_image"
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
              <v-list-item v-for="(movie, j) in personMoviesList" :key="'B' + j" :to="'/movie/' + movie.id" class="my-1">
            <v-img
              max-width="100px"
              max-height="100%"
              class="mr-5 elevation-5"
              :src="movie.poster_path != null ? imageURL + movie.poster_path : no_image" />
                <p class="text-h5 mr-10 cyan--text">{{ movie.title }}</p>
                <p class="text-h6 ml-auto">{{ movie.release_date }}</p>
              </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row v-for="(item, i) in searchedMovie" :key="i" class="pb-10 mt-10">
        <v-col cols="12" lg="3" md="12">
          <!-- MOVIE IMG -->
          <v-img
            :src="item.poster_path != null ? imageURL + item.poster_path : no_image"
            id="movie-img"
            class="rounded"
          ></v-img>
        </v-col>
        <!-- PRIMARY INFO -->
        <v-col lg="4" md="12" sm="12">
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
            {{ formatGenre(genre) }}
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
            class="d-block my-1 mr-auto"
            block
            outlined
            color="red"
            large
            tile
            @click="getTrailer(item)"
            dark
            >
            <span class="white--text">View trailer</span>
          </v-btn>
        </v-col>

        <!-- WHERE TO WATCH INFO -->
        <v-col cols="12" lg="4" md="12">
          <v-expand-transition>
            <v-row no-gutters class="mt-2">
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
                        : imageURL + buy_provider.logo_path
                    "
                    class="provider-logo"
                  />
                </li>
              </v-col>
              <v-col lg="4">
                <h3 class="text-center orange--text">Streaming</h3>
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
                        : imageURL + flatrate_provider.logo_path
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
                        : imageURL + rent_provider.logo_path
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
import { mapActions, mapState } from 'vuex';
import TrailerDialog from "../components/TrailerDialog";

export default {
  components: {
    SectionTitle,
    TrailerDialog,
    Snackbar
  },
  data() {
    return {
      isNotSelected: false,
      loading: false,
      isSearchingMovie: false,
      showContent: false,
      trailerDialog: false,
      input: "",
      no_overview: "We are sorry. This movie have not available overview.",
      searchedMovie: [],
      searchedPerson: [],
      personMoviesList: [],
      inputItemsList: [],
      wheretowatch: false,
    };
  },
  computed: {
    ...mapState(['snackbarObject', "language", "apikey", "no_image", "imageURL", "trailerVideo"])
  },
  mounted () {
    if (this.input.length > 1) {
      this.fillItemsList()
    }
  },
  methods: {
    ...mapActions(['showError', 'getMovieTrailer']),
      formatGenre (genre) {
      let genres = {
        ['28']: "Action",
        ['12']: "Adventure",
        ['16']: "Animation",
        ['35']: "Comedy",
        ['80']: "Crime",
        ['99']: "Documentary",
        ['18']: "Drama",
        ['10751']: "Family",
        ['14']: "Fantasy",
        ['36']: "History",
        ['27']: "Horror",
        ['10402']: "Music",
        ['9648']: "Mystery",
        ['10749']: "Romance",
        ['878']: "Science Fiction",
        ['10770']: "TV Movie",
        ['53']: "Thriller",
        ['10752']: "War",
        ['37']: "Western"
      }
      return genres[genre]
    },
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
    getTrailer(item) {
      this.trailerDialog = true
      this.getMovieTrailer({ type: 'other', id: item.id })
    },
    getProviders() {
          // GET WATCH PROVIDERS (NETFLIX, GOOGLE PLAY, HBO, ETC)
        let providers;
          for (let data of this.searchedMovie) {
            console.log(data)
            providers = `https://api.themoviedb.org/3/movie/${data.id}/watch/providers?api_key=${this.apikey}`;

            axios
              .get(providers)
              .then((res) => {
                console.log(res)
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
      if (this.isSearchingMovie) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apikey}&language=${this.language}&query=${this.input}&sorty_by=popularity.desc`;
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
        url = `https://api.themoviedb.org/3/search/person?api_key=${this.apikey}&${this.language}&query=${this.input}&sorty_by=popularity.desc`
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
    },
    searchByInput(item) {
      let query = this.input
      this.searchedMovie = [];
      this.searchedPerson = [];
      this.personMoviesList = [];
      this.inputItemsList = [];
      let url;

      if (this.isSearchingMovie) {
        if (item !== this.input) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apikey}&language=${this.language}&query=${item.title}`;
        } else {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apikey}&language=${this.language}&query=${query}`;
        }
      axios
        .get(url)
        .then((res) => {
          for (let data of res.data.results) {
            this.searchedMovie.push({
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
          this.getProviders();
        })
        .catch((e) => {
          this.showError('Database connection error')
          console.log(e);
        });

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

#items-list {
  border-radius: 10px;
  box-shadow: 0px 5px 10px #151515;
  overflow-y: scroll;
  max-height: 300px;
}

#btn-row {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  margin: 0;
  padding: 0;
}

#byMovie-btn {
  margin-left: auto;
  clip-path: polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%);
}

#byPerson-btn {
   margin-right: auto;
  clip-path: polygon(100% 0, 85% 100%, 0 100%, 15% 0);
}

#byMovie-btn, #byPerson-btn {
  border: 5px solid cyan;
  border-radius: 50px;
  cursor: pointer;
  width: 100%;
  max-width: 800px;
  height: 350px;
  transition: all 0.3s ease-out;
  filter: grayscale(2); 
  &:hover {
    filter: grayscale(0);
  }
}

#byMovie-text, #byPerson-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
  color: white;
  text-shadow: 0px 2px 5px black;
  transition: all 0.3s ease-out;
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
    padding-inline: 10px;
    padding-block: 5px;
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

    .options-buttons-start {
    transition: all 1s ease-out;
    position: absolute;
    inset: 0;
    justify-content: center;
    align-content: center;
    text-align: center;

  }

  .options-buttons {
    transition: all 1s ease-out;
    position: relative;
    animation: fadeIn 1s ease-in;
    text-align: center;
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
    padding-inline: 10px;
    padding-block: 5px;
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
    padding-inline: 10px;
    padding-block: 5px;
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
    inset: 0;
    justify-content: center;
    align-content: center;
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

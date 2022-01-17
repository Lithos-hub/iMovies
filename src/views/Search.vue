<template>
  <div>
    <SectionTitle
      :title="
        isSearchingMovie
          ? $t('comp-sectionTitle.search1')
          : this.$t('comp-sectionTitle.search2')
      "
      v-if="showContent"
    />

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
              :label="$t('view-search.search')"
              :background-color="isSearchingMovie ? 'primary' : 'green'"
              append-icon="mdi-magnify"
              full-width
              @input="fillItemsList"
              @keyup.enter="searchByInput(input)"
            />
            <v-list dark v-if="inputItemsList.length" id="items-list">
              <v-list-item
                v-for="(item, i) in inputItemsList"
                :key="i"
                @click="searchByInput(item)"
              >
                <p class="white--text" v-if="!isSearchingMovie">
                  {{ item.name }}
                </p>
                <p class="white--text" v-if="isSearchingMovie">
                  {{ item.title }}
                </p>
              </v-list-item>
            </v-list>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-row class="options-buttons" v-if="showContent">
      <v-col cols="12" lg="6" md="12">
        <v-btn dark color="primary" large width="350px" @click="searchMovie()">
          {{ $t("view-search.byTitle") }}
        </v-btn>
      </v-col>
      <v-col cols="12" lg="6" md="12">
        <v-btn dark color="green" large width="350px" @click="searchPerson()">
          {{ $t("view-search.byPerson") }}
        </v-btn>
      </v-col>
    </v-row>

    <v-row no-gutters id="btn-row" v-if="!showContent">
      <v-col :cols="isUsingMobile ? '12' : '6'">
        <v-img id="byMovie-btn" :src="randomMovieIMG" @click="searchMovie()">
          <h1 id="byMovie-text" :class="isUsingMobile ? 'text-h6' : 'text-h4'">
            {{ $t("view-search.byTitle") }}
          </h1>
        </v-img>
      </v-col>
      <v-col :cols="isUsingMobile ? '12' : '6'">
        <v-img id="byPerson-btn" :src="randomPersonIMG" @click="searchPerson()">
          <h1 id="byPerson-text" :class="isUsingMobile ? 'text-h6' : 'text-h4'">
            {{ $t("view-search.byPerson") }}
          </h1>
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

    <!-- ADD TO MY MOVIES DIALOG -->
    <AddToDialog v-if="addToDialog" />

    <v-progress-circular
      v-if="loading"
      class="progressSpinner"
      :size="100"
      color="cyan"
      indeterminate
    ></v-progress-circular>

    <!-- RESULTS SEARCHING BY PERSON -->

    <v-container v-if="!loading">
      <v-row
        v-for="(person, i) in searchedPerson"
        :key="'A' + i"
        class="pb-10 mt-10"
      >
        <v-col md="3" :class="isUsingMobile ? '' : 'mt-15'">
          <h1 v-if="isUsingMobile" class="text-center text-h2 cyan--text">
            {{ person.name }}
          </h1>
          <v-img
            :src="
              person.profile_path !== null
                ? imageURL + person.profile_path
                : no_image
            "
            id="person-img"
            width="100%"
            class="rounded elevation-10"
          >
          </v-img>
          <v-list dark dense>
            <v-list-item>
              {{ $t("view-search.age") }}
              <span class="ml-2 cyan--text"> {{ person.info.age }}</span>
            </v-list-item>
            <v-list-item>
              {{ $t("view-search.birth") }}
              <span class="ml-2 cyan--text">
                {{ person.info.place_of_birth }}</span
              >
            </v-list-item>
            <v-list-item>
              {{ $t("view-search.homepage")
              }}<span class="ml-2 cyan--text">
                <a v-if="person.info.homepage" :href="person.info.homepage">{{
                  person.info.homepage
                }}</a>
                <div v-else class="red--text">
                  {{ $t("view-search.no-homepage") }}
                </div>
              </span>
            </v-list-item>
            <v-list-item>
              {{ $t("view-search.gender") }}
              <span class="ml-2 cyan--text"> {{ person.info.gender }}</span>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col>
          <h1 v-if="!isUsingMobile">
            {{ person.name }}
          </h1>
          <v-divider></v-divider>
          <v-list dark dense v-if="!loading">
            <v-list-item
              v-for="(movie, j) in personMoviesList"
              :key="'B' + j"
              :to="'/movie/' + movie.id"
              class="my-1"
            >
              <v-img
                :max-width="isUsingMobile ? '75px' : '100px'"
                max-height="100%"
                class="mr-5 elevation-5"
                :src="
                  movie.poster_path != null
                    ? imageURL + movie.poster_path
                    : no_image
                "
              />
              <p :class="isUsingMobile ? 'cyan--text' : 'text-h5 mr-10 cyan--text'">{{ movie.title }}</p>
              <p :class="isUsingMobile ? 'ml-auto' : 'text-h6 ml-auto'">
                {{ formatDate(movie.release_date) }}
              </p>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid v-if="!loading">
      <v-row v-for="(item, i) in searchedMovie" :key="i" class="pb-10 mt-10">
        <v-col cols="12" lg="3" md="12">
          <!-- MOVIE IMG -->
          <v-img
            :src="
              item.poster_path != null ? imageURL + item.poster_path : no_image
            "
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
            <span class="white--text">{{ $t("view-search.releaseDate") }}</span>
            {{
              item.release_date !== undefined
                ? formatDate(item.release_date)
                : $t("generic-messages.no-release")
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
          <div class="d-flex">
            <v-sheet
              elevation="5"
              height="50px"
              width="100%"
              max-width="50px"
              :class="`${formatRateColor(item.vote_average)} pa-2`"
            >
              <h4 class="white--text align-center text-center">
                {{ item.vote_average }}
              </h4>
            </v-sheet>
            <h5 class="font-weight-bold primary--text mx-2">
              {{ item.vote_count }}
            </h5>
            <span class="font-weight-light">{{
              $t("view-search.ratings")
            }}</span>
          </div>
          <!-- MOVIE OVERVIEW -->
          <p
            :class="
              item.overview === ''
                ? 'error--text mt-5 text-justify'
                : 'mt-5 text-justify'
            "
          >
            {{
              item.overview === ""
                ? $t("view-search.noOverview")
                : item.overview
            }}
          </p>

          <!-- MOVIE ACTIONS -->
          <v-row>
            <v-col>
              <v-btn
                class="my-1 mr-auto"
                block
                outlined
                color="red"
                large
                tile
                @click="getTrailer(item)"
                dark
              >
                <span class="white--text">{{ $t("app-buttons.view") }}</span>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                class="my-1 ml-auto"
                block
                outlined
                color="purple"
                large
                tile
                @click="
                  showAddToDialog(true);
                  setAddMovie(item);
                "
                dark
              >
                <span class="white--text">{{ $t("app-buttons.add") }}</span>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                class="my-1 ml-auto"
                block
                color="primary"
                large
                outlined
                tile
                @click="showInfo(item)"
                dark
              >
                <v-icon color="white">mdi-information</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>

        <!-- WHERE TO WATCH INFO -->
        <v-col cols="12" lg="4" md="12">
          <v-expand-transition>
            <v-row no-gutters class="mt-2">
              <v-col lg="4">
                <h3 class="text-center blue--text">
                  {{ $t("view-search.buy") }}
                </h3>
                <h2
                  class="error--text text-center"
                  v-if="!item.providers_buy.length"
                >
                  {{ $t("view-search.no-data") }}
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
                      buy_provider !== undefined
                        ? buy_provider.provider_name
                        : ""
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
                <h3 class="text-center orange--text">
                  {{ $t("view-search.streaming") }}
                </h3>
                <h2
                  class="error--text text-center"
                  v-if="!item.providers_flatrate.length"
                >
                  {{ $t("view-search.no-data") }}
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
                      flatrate_provider !== undefined
                        ? flatrate_provider.provider_name
                        : ""
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
                <h3 class="text-center green--text">
                  {{ $t("view-search.rent") }}
                </h3>
                <h2
                  class="error--text text-center"
                  v-if="!item.providers_rent.length"
                >
                  {{ $t("view-search.no-data") }}
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
                      rent_provider !== undefined
                        ? rent_provider.provider_name
                        : ""
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
      <v-sheet
        id="no-results"
        color="transparent"
        v-if="noResults"
        width="350px"
        class="mx-auto"
      >
        <p class="text-h4 error--text">{{ $t("view-search.noResults") }}</p>
      </v-sheet>
    </v-container>
    <!-- SNACKBAR -->
    <div v-if="snackbarObject.snackbar">
      <Snackbar
        :snackbar-color="snackbarObject.snackbarColor"
        :snackbar-text="snackbarObject.snackbarText"
      />
    </div>
  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import axios from "axios";
import Snackbar from "../components/Snackbar";
import { mapActions, mapState } from "vuex";
import TrailerDialog from "../components/TrailerDialog";
import AddToDialog from "../components/AddToDialog";
import i18n from "@/plugins/i18n";
import Services from '../services/services';

export default {
  components: {
    SectionTitle,
    TrailerDialog,
    AddToDialog,
    Snackbar,
  },
  data() {
    return {
      isNotSelected: false,
      loading: false,
      showContent: false,
      trailerDialog: false,
      input: "",
      searchedMovie: [],
      searchedPerson: [],
      personMoviesList: [],
      inputItemsList: [],
      wheretowatch: false,
      noResults: false,
    };
  },
  computed: {
    ...mapState([
      "snackbarObject",
      "language",
      "apikey",
      "no_image",
      "imageURL",
      "trailerVideo",
      "addToDialog",
      "comesFromDetails",
      "isSearchingMovie",
      "searchInput",
      "searchItem",
    ]),
    randomMovieIMG() {
      let random = Math.floor(Math.random() * 11) + 1;
      return require(`../assets/img/random-movie-${random}.jpg`);
    },
    randomPersonIMG() {
      let random = Math.floor(Math.random() * 11) + 1;
      return require(`../assets/img/random-person-${random}.jpg`);
    },
    isUsingMobile() {
      return this.$vuetify.breakpoint.xs;
    },
  },
  mounted() {
    Services.hasVisitedTheSection("search");
    window.scrollTo(0, 0);
    if (this.input.length > 1) {
      this.fillItemsList();
    }
    if (this.comesFromDetails) {
      this.loading = true;
      this.showContent = true;
      this.input = this.searchInput;
      setTimeout(() => {
        this.searchByInput(this.searchItem);
      }, 1000);
    }
  },
  methods: {
    ...mapActions([
      "showSnackbar",
      "getMovieTrailer",
      "showAddToDialog",
      "setAddMovie",
      "showInfo",
    ]),
    formatRateColor(movieRate) {
      let color = "";
      if (movieRate <= 10) {
        color = "purple";
      }
      if (movieRate < 9) {
        color = "info";
      }
      if (movieRate < 7) {
        color = "green";
      }
      if (movieRate < 5) {
        color = "orange";
      }
      if (movieRate < 3) {
        color = "red";
      }
      return color;
    },
    formatGenre(genre) {
      let genres = {
        ["28"]: this.$t("genres.action"),
        ["12"]: this.$t("genres.adventure"),
        ["16"]: this.$t("genres.animation"),
        ["35"]: this.$t("genres.comedy"),
        ["80"]: this.$t("genres.crime"),
        ["99"]: this.$t("genres.documentary"),
        ["18"]: this.$t("genres.drama"),
        ["10751"]: this.$t("genres.family"),
        ["14"]: this.$t("genres.fantasy"),
        ["36"]: this.$t("genres.history"),
        ["27"]: this.$t("genres.horror"),
        ["10402"]: this.$t("genres.music"),
        ["9648"]: this.$t("genres.mystery"),
        ["10749"]: this.$t("genres.romance"),
        ["878"]: this.$t("genres.sci-fi"),
        ["10770"]: this.$t("genres.tv"),
        ["53"]: this.$t("genres.thriller"),
        ["10752"]: this.$t("genres.war"),
        ["37"]: this.$t("genres.western"),
      };
      return genres[genre];
    },
    formatDate(date) {
      if (!date) return null;
      if (date.includes("/")) {
        const [day, month, year] = date.split("/");
        return `${day}-${month}-${year}`;
      }
      if (date.includes("-")) {
        const [year, month, day] = date.split("-");
        return `${day}-${month}-${year}`;
      }
    },
    getPersonAge(birthday) {
      let birthYear = birthday.split("-")[0];
      let birthMonth = birthday.split("-")[1];
      let birthDay = birthday.split("-")[2];

      let currentYear = new Date().getFullYear();
      let currentMonth = new Date().getMonth() + 1;
      let currentDay = new Date().getDate();

      let age = currentYear - birthYear;

      if (currentMonth < birthMonth - 1) {
        age--;
      }
      if (birthMonth - 1 == currentMonth && currentDay < birthDay) {
        age--;
      }
      return age;
    },
    getTrailer(item) {
      this.trailerDialog = true;
      this.getMovieTrailer({ type: "other", id: item.id });
    },
    searchMovie() {
      this.$store.commit("setSearchingMovie", true);
      this.showContent = true;
      this.noResults = false;
    },
    searchPerson() {
      this.$store.commit("setSearchingMovie", false);
      this.showContent = true;
      this.noResults = false;
    },
    getProviders() {
      // GET WATCH PROVIDERS (NETFLIX, GOOGLE PLAY, HBO, ETC)
      let providers;
      for (let data of this.searchedMovie) {
        providers = `https://api.themoviedb.org/3/movie/${data.id}/watch/providers?api_key=${this.apikey}`;

        axios
          .get(providers)
          .then((res) => {
            let spain = res.data.results["ES"];

            if (spain !== undefined) {
              let buy_providers = spain.buy;
              let flat_providers = spain.flatrate;
              let rent_providers = spain.rent;
              if (buy_providers !== undefined) {
                for (let buyProv of spain.buy) {
                  if (buyProv !== undefined || buyProv !== null) {
                    data.providers_buy.push(buyProv);
                  }
                }
              } else {
                data.providers_buy = [];
              }

              if (flat_providers !== undefined) {
                for (let flatProv of spain.flatrate) {
                  if (flatProv !== undefined || flatProv !== null) {
                    data.providers_flatrate.push(flatProv);
                  }
                }
              } else {
                data.providers_flatrate = [];
              }

              if (rent_providers !== undefined) {
                for (let rentProv of spain.rent) {
                  if (rentProv !== undefined || rentProv !== null) {
                    data.providers_rent.push(rentProv);
                  }
                }
              } else {
                data.providers_flatrate = [];
              }
            }
          })
          .catch((e) => {
            console.log(e);
            this.showSnackbar({
              text: $t("view-search.ErrorDatabase"),
              color: "red",
            });
          });
      }
      this.input = "";
      this.wheretowatch = false;
    },
    fillItemsList() {
      let url;
      let arrNames = [];
      let arrTitles = [];
      this.noResults = false;
      if (this.input.length > 1) {
        if (this.isSearchingMovie) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apikey}&language=${i18n.locale}&query=${this.input}&sort_by=popularity.desc&page=1&include_adult=false`;
          axios
            .get(url)
            .then((res) => {
              for (let data of res.data.results) {
                arrTitles.push({
                  id: data.id,
                  title: data.title,
                });
              }

              this.inputItemsList = arrTitles;
            })
            .catch((e) => {
              this.showSnackbar({
                text: $t("view-search.ErrorDatabase"),
                color: "red",
              });
              console.log(e);
            });
        } else {
          url = `https://api.themoviedb.org/3/search/person?api_key=${this.apikey}&${i18n.locale}&query=${this.input}&sort_by=popularity.desc&page=1&include_adult=false`;
          axios
            .get(url)
            .then((res) => {
              for (let data of res.data.results) {
                arrNames.push({
                  id: data.id,
                  name: data.name,
                });
              }

              this.inputItemsList = arrNames;
            })
            .catch((e) => {
              this.showSnackbar({
                text: $t("view-search.ErrorDatabase"),
                color: "red",
              });
              console.log(e);
            });
        }
      } else {
        this.inputItemsList = [];
      }
    },
    async searchByInput(item) {
      let query = this.input;
      this.searchedMovie = [];
      this.searchedPerson = [];
      this.personMoviesList = [];
      this.inputItemsList = [];
      this.loading = true;
      this.noResults = false;
      let url;

      if (this.isSearchingMovie) {
        if (item.id) {
          this.$store.commit("setSearchItem", item);
          this.$store.commit("setSearchInput", "");
          url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apikey}&language=${i18n.locale}&query=${item.title}&page=1&sort_by=popularity.desc&include_adult=false`;
        } else {
          this.$store.commit("setSearchInput", query);
          this.$store.commit("setSearchItem", {});
          url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apikey}&language=${i18n.locale}&query=${query}&page=1&sort_by=popularity.desc&include_adult=false`;
        }
        await axios
          .get(url)
          .then((res) => {
            if (res.data.results.length) {
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
                  providers_rent: [],
                });
              }
              this.getProviders();
              this.loading = false;
            } else {
              this.noResults = true;
              this.loading = false;
            }
          })
          .catch((e) => {
            this.showSnackbar({
              text: $t("view-search.ErrorDatabase"),
              color: "red",
            });
            console.log(e);
            this.loading = false;
          });
      } else {
        if (item.id) {
          this.$store.commit("setSearchItem", item);
          this.$store.commit("setSearchInput", "");
          url = `https://api.themoviedb.org/3/search/person?api_key=${this.apikey}&language=${i18n.locale}&query=${item.name}&page=1&include_adult=false`;
        } else {
          this.$store.commit("setSearchInput", query);
          this.$store.commit("setSearchItem", {});
          url = `https://api.themoviedb.org/3/search/person?api_key=${this.apikey}&language=${i18n.locale}&query=${query}&page=1&include_adult=false`;
        }

        await axios
          .get(url)
          .then((res) => {
            if (res.data.results.length) {
              for (let data of res.data.results.slice(0, 10)) {
                this.searchedPerson.push({
                  id: data.id,
                  known_for: data.known_for,
                  name: data.name,
                  profile_path: data.profile_path,
                  info: {},
                });
                this.getMoviesByPerson(data.id);
              }

              this.getPersonInfo();
            } else {
              this.noResults = true;
              this.loading = false;
            }
          })
          .catch((e) => {
            this.showSnackbar({
              text: $t("view-search.ErrorDatabase"),
              color: "red",
            });
            console.log(e);
            this.loading = false;
          });
      }
    },
    async getMoviesByPerson(id) {
      this.loading = true;
      this.inputItemsList = [];
      let url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${this.apikey}&language=${i18n.locale}&page=1&include_adult=false`;
      let arr = [];
      await axios
        .get(url)
        .then((res) => {
          if (res.data.cast !== [] && res.data.cast !== undefined) {
            for (let data of res.data.cast) {
              arr.push({
                id: data.id,
                title: data.title,
                character: data.character,
                release_date: data.release_date,
                poster_path: data.poster_path,
                year: "",
              });
            }
          }

          arr.forEach((movie) => {
            if (movie.release_date) {
              movie.release_date = movie.release_date;
              movie.year = movie.release_date.split("-")[0];
            }
          });

          arr = arr.sort((a, b) => {
            return b.year - a.year;
          });

          for (let movie of arr) {
            this.personMoviesList.push(movie);
          }
          setTimeout(() => {
            this.loading = false;
          }, 2500);
        })
        .catch((e) => {
          this.showSnackbar({
            text: $t("view-search.ErrorDatabase"),
            color: "red",
          });
          console.log(e);
          this.loading = false;
        });
    },
    async getPersonInfo() {
      for (let person of this.searchedPerson) {
        let url = `https://api.themoviedb.org/3/person/${person.id}?api_key=${this.apikey}&sort_by=popularity.desc&language=${i18n.locale}&include_adult=false`;
        await axios
          .get(url)
          .then((res) => {
            person.info = {
              place_of_birth: res.data.place_of_birth,
              homepage: res.data.homepage,
              gender:
                res.data.gender === 2
                  ? this.$t("view-search.male")
                  : this.$t("view-search.female"),
              age: res.data.birthday
                ? this.getPersonAge(res.data.birthday)
                : "",
            };
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

#movie-vote-average {
  border-radius: 5px;
  text-align: center;
}

#search-bar {
  animation: fadeIn 1s ease-in;
}

#items-list {
  border-radius: 10px;
  box-shadow: 0px 5px 10px #151515;
  overflow-y: scroll;
  max-height: 300px;
}

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {

  #no-results {
  margin: 0;
  padding: 2em;
  text-align: center;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
}

  .progressSpinner {
  position: fixed;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

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

  #btn-row {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    margin: 0;
    padding: 0;
  }

  #byMovie-btn {
    margin-left: auto;
    border: 5px solid rgb(31, 153, 220);
    clip-path: polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%);
  }

  #byPerson-btn {
    margin-right: auto;
    border: 5px solid rgb(63, 202, 63);
    clip-path: polygon(100% 0, 85% 100%, 0 100%, 15% 0);
  }

  #byMovie-btn,
  #byPerson-btn {
    border-radius: 50px;
    cursor: pointer;
    width: 100%;
    max-width: 100%;
    height: 200px;
    margin-block: 2em;
    transition: all 0.3s ease-out;
    filter: grayscale(2);
    &:hover {
      filter: grayscale(0);
    }
  }

  #byMovie-text,
  #byPerson-text {
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
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  #no-results {
  margin: 0;
  padding: 2em;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

  .progressSpinner {
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

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
    border: 5px solid rgb(31, 153, 220);
    clip-path: polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%);
  }

  #byPerson-btn {
    margin-right: auto;
    border: 5px solid rgb(63, 202, 63);
    clip-path: polygon(100% 0, 85% 100%, 0 100%, 15% 0);
  }

  #byMovie-btn,
  #byPerson-btn {
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

  #byMovie-text,
  #byPerson-text {
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
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  #no-results {
  margin: 0;
  padding: 2em;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

  .progressSpinner {
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

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
    border: 5px solid rgb(31, 153, 220);
    clip-path: polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%);
  }

  #byPerson-btn {
    margin-right: auto;
    border: 5px solid rgb(63, 202, 63);
    clip-path: polygon(100% 0, 85% 100%, 0 100%, 15% 0);
  }

  #byMovie-btn,
  #byPerson-btn {
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

  #byMovie-text,
  #byPerson-text {
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
}
</style>

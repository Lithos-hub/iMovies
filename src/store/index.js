import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import i18n from "@/plugins/i18n";

Vue.use(Vuex);

const url = "https://api.themoviedb.org/3";

const current_year = new Date().getFullYear();

export default new Vuex.Store({
  state: {
    apikey: "c9a3e87b703c630c13d5ea61ef62c7b6",
    language: "es-ES",
    loadingError: "",
    loadingGenre: false,
    current: [],
    trending: [],
    genre: "",
    moviesByYear: [],
    movieDetails: [],
    watchedMovies: [],
    toWatchMovies: [],
    favoriteMovies: [],
    moviesWithRates: [],
    rates: [],
    user: [],
    isDefault: false,
    userID: null,
    isLogged: false,
  },
  mutations: {
    loadingError(state, payload) {
      state.loadingError = payload;
    },
    loadingTrending(state, payload) {
      state.loadingTrending = payload;
    },
    loadingGenre(state, payload) {
      state.loadingGenre = payload;
    },
    setCurrent(state, payload) {
      state.current = payload;
    },
    setTrending(state, payload) {
      state.trending = payload;
    },
    setMoviesByYear(state, payload) {
      state.moviesByYear = payload;
    },
    setToWatchMovies(state, payload) {
      state.toWatchMovies = payload;
    },
    setWatchedMovies(state, payload) {
      state.watchedMovies = payload;
    },
    setFavoriteMovies(state, payload) {
      state.favoriteMovies = payload;
    },
    setRatedMovies(state, payload) {
      state.moviesWithRates = payload;
    },
    setSearchedMovies(state, payload) {
      state.searchedMovies = payload;
    },
    setUser(state, payload) {
      state.user.push(payload);
    },
    setDefault(state, payload) {
      state.isDefault = payload;
    },
    setID(state, payload) {
      state.userID = payload;
    },
    isLogged(state, payload) {
      state.isLogged = payload;
    },
    setLanguage(state, payload) {
      state.language = payload;
      localStorage.setItem("storageLanguage", JSON.stringify(state.language));
    },
  },
  actions: {
    changeLanguage({ commit }, payload) {
      commit("setLanguage", payload);
      i18n.locale = payload.split('-')[0];
    },
    getCurrentMovies({ commit }, apikey) {
      const apiurl = `${url}/discover/movie?year=${current_year}&api_key=${apikey}`;

      return new Promise((resolve) => {
        axios
          .get(apiurl)
          .then((resp) => {
            commit("setCurrent", resp.data.results);
          })
          .catch((e) => {
            console.info(e);
            commit(
              "loadingError",
              "The answer is taking too long. There may have been an error with the database. Please reload the website."
            );
          });
      });
    },
    getTrending({ commit }, apikey) {
      const date = new Date();

      const dateGreaterThan = `${date.getFullYear()}-${(
        "0" + date.getMonth()
      ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
      const dateLessThan = `${date.getFullYear()}-${(
        "0" +
        (date.getMonth() + 1)
      ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;

      // ********************* Filter: note average of 7 or greater; English language; popularity desc; release time = 2 weeks ago ----------------------- //
      const apiurl = `${url}/discover/movie?primary_release_date.gte=${dateGreaterThan}&primary_release_date.lte=${dateLessThan}&api_key=${apikey}&vote_average.gte=7&language=en-EN&sort_by=popularity.desc&include_video=true`;

      return new Promise(() => {
        axios
          .get(apiurl)
          .then((resp) => {
            commit("setTrending", resp.data.results);
          })
          .catch((e) => {
            console.info(e);
            commit(
              "loadingError",
              "The answer is taking too long. There may have been an error with the database. Please reload the website."
            );
          });
      });
    },
  },
  getters: {
    signedUser(state) {
      return !!state.user;
    },
    defaultUser(state) {
      return state.isDefault;
    },
    userID(state) {
      return state.user.id;
    },
    getUserData(state) {
      return state.user;
    },
    isLogged(state) {
      return state.isLogged;
    },
  },
});

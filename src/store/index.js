import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import i18n from "@/plugins/i18n";

Vue.use(Vuex);

import {
  URL,
  APIKEY,
  CURRENT_YEAR,
  ONE_MONTH_AGO,
  CURRENT_DATE,
  ONE_WEEK_AGO,
  LANGUAGE } from "@/constants/constants.js"

export default new Vuex.Store({
  state: {
    imageURL: "https://image.tmdb.org/t/p/original",
    user: [],
    userID: null,
    isLogged: false,
    isDefault: false,
    apikey: "c9a3e87b703c630c13d5ea61ef62c7b6",
    language: "es-ES",
    no_image: require("@/assets/img/no-image.jpg"),
    loadingIMG: require("@/assets/img/loadingIMG.gif"),
    snackbarObject: {
      snackbar: false,
      snackbarColor: "",
      snackbarText: ""
    },
    addToDialog: false,
    movieToAdd: {},
    latestReleases: [],
    trendingMovies: [],
    moviesByYear: [],
    moviesID: [],
    movieCasting: [],
    movieOfTheWeek: {},
    movieDetails: {},
    trailerOfTheWeekVideo: "",
    trailerVideo: "",
    videoNoAvailable: false,
    loadingScroll: false,
    storagedMovies: {
      favourite: [],
      watched: [],
      wishlist: [],
      rated: []
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user.push(payload);
    },
    setUserID(state, payload) {
      state.userID = payload
    },
    setDefault(state, payload) {
      state.isDefault = payload;
    },
    setTrending(state, payload) {
      state.trendingMovies = payload;
    },
    setMoviesID(state, payload) {
      state.moviesID = payload;
    },
    setMovieDetails(state, payload) {
      state.movieDetails = payload;
    },
    setLatestReleases(state, payload) {
      state.latestReleases = payload;
    },
    setTrailerOfTheWeekVideo(state, payload) {
      state.trailerOfTheWeekVideo = payload
    },
    setTrailerVideo(state, payload) {
      state.trailerVideo = payload
    },
    setVideoAvailable(state, payload) {
      state.videoNoAvailable = payload
    },
    setMovieCasting(state, payload) {
      state.movieCasting = payload
    },
    setMovieOfTheWeek(state, payload) {
      state.movieOfTheWeek = payload
    },
    setMoviesByYear(state, payload) {
      state.moviesByYear = payload
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
    showSnackbar(state, {text, color}) {
      state.snackbarObject = {
        snackbar: true,
        snackbarColor: color,
        snackbarText: text,
      }
      setTimeout(() => { state.snackbarObject.snackbar = false }, 3000);
    },
    setAddDialog (state, payload) {
      state.addToDialog = payload
    },
    setAddToMovie (state, payload) {
      state.movieToAdd = payload
    },
    setStoragedMovies(state, payload) {
      state.storagedMovies = payload
    },
    setMovieInCategory (state, {category, movie}) {
      if (category === 'favourite') {
        state.storagedMovies.favourite.push(movie);
      }
      if (category === 'watched') {
        state.storagedMovies.watched.push(movie);
      }
      if (category === 'wishlist') {
        state.storagedMovies.wishlist.push(movie);
      }
      if (category === 'rated') {
        state.storagedMovies.rated.push(movie);
      }
    },
    setLoadingScroll (state, payload) {
      state.loadingScroll = payload
    }
  },
  actions: {
    getUserID({ commit }) {
      const userID = JSON.parse(localStorage.getItem("USERID")) || {};
      let id = userID.id;
      commit('setUserID', id)
    },
    showSnackbar({ commit }, payload) {
      commit("showSnackbar", payload);
    },
    showError({ commit }, payload) {
      commit("showError", payload);
    },
    setAddMovie({commit}, item) {
      commit('setAddToMovie', item)
    },
    showAddToDialog({ commit }, bool) {
      commit('setAddDialog', bool)
    },
    closeAddToDialog({ commit}, bool) {
      commit('setAddDialog', bool)
    },
    changeLanguage({ commit }, payload) {
      commit("setLanguage", payload);
      i18n.locale = payload.split('-')[0];
    },
    storageMovie({ commit}, payload) {
      commit("setMovieInCategory", payload)
    },
    getStoragedMovies({ commit }) {
      const storage = JSON.parse(localStorage.getItem("storageUserDATA")) || {};
      let movies = storage.myMovies;
      commit("setStoragedMovies", movies)
    },
    async getLatestReleases({ commit }, byPopularity) {
      let CALL_URL;

      let arr = []
      let pages = [1, 2, 3, 4, 5]

      for (let page of pages) {
        if (byPopularity) {
          CALL_URL = `${URL}/discover/movie?year=${CURRENT_YEAR}&api_key=${APIKEY}&page=${page}&vote_average.gte=7&sort_by=popularity.desc&include_adult=false`;
        } else {
          CALL_URL = `${URL}/discover/movie?year=${CURRENT_YEAR}&api_key=${APIKEY}&page=${page}&include_adult=false`;
        }
        await axios
        .get(CALL_URL)
        .then((resp) => {
          for (let data of resp.data.results) {
            arr.push(data)
          }
          commit("setLatestReleases", arr);
        })
        .catch((e) => {
          console.log(e);
          commit("showError", "Database error connection")
          });
        }
    },
    async getTrending({ commit }, byPopularity) {
      let CALL_URL;

      if (byPopularity) {
        CALL_URL = `${URL}/discover/movie?primary_release_date.gte=${ONE_MONTH_AGO}&primary_release_date.lte=${CURRENT_DATE}&api_key=${APIKEY}&vote_average.gte=7&language=${LANGUAGE}&sort_by=popularity.desc&include_video=true&include_adult=false`;
      } else {
        CALL_URL = `${URL}/discover/movie?primary_release_date.gte=${ONE_MONTH_AGO}&primary_release_date.lte=${CURRENT_DATE}&api_key=${APIKEY}&language=${LANGUAGE}&include_video=true&include_adult=false`;
      }

      let arrMovies = []
      let arrMoviesID = []

          await axios
          .get(CALL_URL)
          .then((resp) => {
            for (let data of resp.data.results) {
              arrMovies.push(data)
              arrMoviesID.push(data.id)
              
            }
            commit("setMoviesID", arrMoviesID)
          })
          .catch((e) => {
            console.log(e);
            commit("showError", "Database error connection")
          });

          
          for (let movie of arrMovies) {
            movie.cast = []
            const CALL_URL_CAST = `${URL}/movie/${movie.id}/credits?api_key=${APIKEY}&language=${LANGUAGE}&include_adult=false`;
            axios
            .get(CALL_URL_CAST)
            .then((resp) => {
              for (let data of resp.data.cast) {
                movie.cast.push({
                  name: data.name,
                  character: data.character
                })
              }
              commit("setTrending", arrMovies)
            })
            .catch((e) => {
              console.log(e)
          });
        }
    },
    async getMovieTrailer({ commit }, { type, id }) {
      const CALL_URL = `${URL}/movie/${id}/videos?api_key=${APIKEY}&language=${LANGUAGE}&include_adult=false`;
      await axios
      .get(CALL_URL)
      .then((resp) => {
        if (resp.data.results.length) {
          const KEY = resp.data.results[0].key;
          const VIDEO_YOUTUBE = "https://www.youtube.com/embed/" + KEY;
            if (type === 'ofTheWeek') {
              commit('setTrailerOfTheWeekVideo', VIDEO_YOUTUBE)
            }
            if (type === 'other') {
              commit('setTrailerVideo', VIDEO_YOUTUBE)
            }
          } else {
            // If the video doesn't have trailer video available:
            commit('setVideoAvailable', true)
          }

          })
          .catch((e) => {
            console.log(e);
            commit("showError", "Database error connection")
          });
    },
    async getMovieOfTheWeek({ commit }) {
      const CALL_URL = `${URL}/discover/movie?primary_release_date.gte=${ONE_WEEK_AGO}&primary_release_date.lte=${CURRENT_DATE}&api_key=${APIKEY}&vote_average.gte=7&language=${LANGUAGE}&sort_by=popularity.desc&include_video=true&include_adult=false`;
        await axios
          .get(CALL_URL)
          .then((resp) => {
            if (resp.data.results.length) {
              commit('setMovieOfTheWeek', resp.data.results[0])
            }

          })
          .catch((e) => {
            console.log(e);
            commit("showError", "Database error connection")
          });
    },
    async getMoviesByYear({ commit }, {year, page}) {
      commit('setLoadingScroll', true)
      let arrMovies = []
      let arrMoviesID = []
      if (year >= 1878) {
      for (let i = 1; i <= page; i++) {
        const CALL_URL = `${URL}/discover/movie?year=${year}&api_key=${APIKEY}&sort_by=popularity.desc&page=${i}&include_adult=false`;
            await axios
            .get(CALL_URL)
            .then((resp) => {
              if (resp.data.results.length) {
                for (let data of resp.data.results) {
                  arrMovies.push(data)
                  arrMoviesID.push(data.id);
                }
            }
            commit('setLoadingScroll', false)
            commit('setMoviesByYear', arrMovies)
            commit('setMoviesID', arrMoviesID)
          })
          .catch((e) => {
            console.info(e);
            commit("showError", "Database error connection")
            commit('setLoadingScroll', false)
          });
        }
      } else {
        commit('setMoviesByYear', [])
        commit('setMoviesID', []);
        commit('setLoadingScroll', false)
      }
    },
    async getMovieDetails({ commit }, id) {
      const CALL_URL = `${URL}/movie/${id}?api_key=${APIKEY}&language=en-US&include_adult=false`;

      await axios
        .get(CALL_URL)
        .then((resp) => {
          commit('setMovieDetails', resp.data)
        })
        .catch((e) => {
          console.log(e);
          commit("showError", "Database error connection")
        });
      }
  },
  getters: {
    signedUser(state) {
      return !!state.user;
    },
    defaultUser(state) {
      return state.isDefault;
    },
    isLogged(state) {
      return state.isLogged;
    },
  },
});

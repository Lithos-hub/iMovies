import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import i18n from "@/plugins/i18n";
import router from "@/router/index";

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
    userData: {},
    userID: null,
    isLogged: false,
    isDefault: false,
    apikey: "c9a3e87b703c630c13d5ea61ef62c7b6",
    language: "es-ES",
    no_image: require("@/assets/img/no-image.jpg"),
    loadingIMG: require("@/assets/img/loadingIMG.gif"),
    snackbarObject: {
      snackbar: false,
      snackbarColor: '',
      snackbarText: ''
    },
    comesFromDetails: false,
    isSearchingMovie: false,
    searchItem: {},
    searchInput: '',
    addToDialog: false,
    genreDialog: false,
    loadingData: false,
    movieToAdd: {},
    latestReleases: [],
    trendingMovies: [],
    moviesByYear: [],
    moviesByGenre: [],
    moviesID: [],
    movieCasting: [],
    movieOfTheWeek: {},
    movieDetails: {},
    selectedGenre: '',
    trailerOfTheWeekVideo: '',
    trailerVideo: '',
    videoNoAvailable: false,
    secondaryVideoNoAvailable: false,
    clickedTab: 0,
  },
  mutations: {
    setUser(state, payload) {
      state.user.push(payload);
    },
    saveUserData(state, payload) {
      state.userData = payload;
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
    setSecondaryTrailerVideo(state, payload) {
      state.trailerVideo = payload
    },
    setVideoNoAvailable(state, payload) {
      state.videoNoAvailable = payload
    },
    setSecondaryVideoNoAvailable(state, payload) {
      state.secondaryVideoNoAvailable = payload
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
      setTimeout(() => { state.snackbarObject.snackbar = false }, 1500);
    },
    setAddDialog (state, payload) {
      state.addToDialog = payload
    },
    setAddToMovie (state, payload) {
      state.movieToAdd = payload
    },
    setMoviesByGenre (state, payload) {
      state.moviesByGenre = payload
    },
    setGenreDialog (state, payload) {
      state.genreDialog = payload
    },
    setLoadingData (state, payload) {
      state.loadingData = payload
    },
    setSelectedGenre (state, payload) {
      state.selectedGenre = payload
    },
    setComesFromDetails (state, payload) {
      state.comesFromDetails = payload
    },
    setClickedTab (state, key) {
      state.clickedTab = key
    },
    setSearchingMovie (state, payload) {
      state.isSearchingMovie = payload
    },
    setSearchItem (state, payload) {
      state.searchItem = payload
    },
    setSearchInput (state, payload) {
      state.searchInput = payload
    },
  },
  actions: {
    getUserID({ commit }) {
      const userID = JSON.parse(localStorage.getItem("USERID")) || {};
      let id = userID.id;
      commit('setUserID', id)
    },
    showInfo({ commit }, item) {
      router.push({ path: `movie/${item.id}` })
    },
    showSnackbar({ commit }, payload) {
      commit("showSnackbar", payload);
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
      setTimeout(() => {
        i18n.locale = payload.split('-')[0];
      }, 1000)
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
          CALL_URL = `${URL}/discover/movie?year=${CURRENT_YEAR}&api_key=${APIKEY}&page=${page}&vote_average.gte=7&language=${LANGUAGE}&sort_by=popularity.desc&include_adult=false`;
        } else {
          CALL_URL = `${URL}/discover/movie?year=${CURRENT_YEAR}&api_key=${APIKEY}&page=${page}&include_adult=false&language=${LANGUAGE}`;
        }
        await axios
        .get(CALL_URL)
        .then((resp) => {
          for (let data of resp.data.results) {
            arr.push(data)
          }
          commit("setLatestReleases", arr.slice(0, -4));
        })
        .catch((e) => {
          console.log(e);
          commit("showSnackbar", { text: "Database error connection", color: "red" })
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
            commit("showSnackbar", { text: "Database error connection", color: "red" })
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
          commit('setSecondaryVideoNoAvailable', false)
          const KEY = resp.data.results[0].key;
          const VIDEO_YOUTUBE = "https://www.youtube.com/embed/" + KEY;
            if (type === 'ofTheWeek') {
              commit('setTrailerOfTheWeekVideo', VIDEO_YOUTUBE)
            }
            if (type === 'other') {
              commit('setTrailerVideo', VIDEO_YOUTUBE)
            }
          } else {
              commit('setVideoNoAvailable', true)
              // We will provide the trailer in case of not to be available, so the user can watch it in english
              const SECONDARY_URL = `${URL}/movie/${id}/videos?api_key=${APIKEY}&language=en-EN&include_adult=false`;
              axios
              .get(SECONDARY_URL)
              .then((resp) => {
                if (resp.data.results.length) {
                  const KEY = resp.data.results[0].key;
                  const VIDEO_YOUTUBE = "https://www.youtube.com/embed/" + KEY;
                  commit('setSecondaryTrailerVideo', VIDEO_YOUTUBE)
                } else {
                  commit('setVideoNoAvailable', false)
                  commit('setSecondaryVideoNoAvailable', true)
                }
              })
              .catch((e) => {
                console.log(e)
                commit("showSnackbar", { text: "Database error connection", color: "red" })
              });
            }
          })
          .catch((e) => {
            console.log(e);
            commit("showSnackbar", { text: "Database error connection", color: "red" })
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
            commit("showSnackbar", { text: "Database error connection", color: "red" })
          });
    },
    async getMoviesByYear({ commit }, {year, page}) {
      commit('setLoadingData', true)
      let arrMovies = []
      let arrMoviesID = []
      if (year >= 1878 && year <= 2030) {
      for (let i = 1; i <= page; i++) {
        const CALL_URL = `${URL}/discover/movie?year=${year}&api_key=${APIKEY}&language=${LANGUAGE}&sort_by=popularity.desc&page=${i}&include_adult=false`;
            await axios
            .get(CALL_URL)
            .then((resp) => {
              if (resp.data.results.length) {
                for (let data of resp.data.results) {
                  arrMovies.push(data)
                  arrMoviesID.push(data.id);
                }
                setTimeout(() => {
                  commit('setMoviesByYear', arrMovies)
                  commit('setMoviesID', arrMoviesID)
                  commit('setLoadingData', false)
                }, 2000)
              }
          })
          .catch((e) => {
            console.info(e);
            commit("showSnackbar", { text: "Database error connection", color: "red" })
            commit('setLoadingData', false)
          });
        }
      } else {
        commit('setMoviesByYear', [])
        commit('setMoviesID', []);
        commit('setLoadingData', false)
      }
    },
    async getMovieDetails({ commit }, id) {
      const CALL_URL = `${URL}/movie/${id}?api_key=${APIKEY}&language=${LANGUAGE}&include_adult=false`;

      await axios
        .get(CALL_URL)
        .then((resp) => {
          commit('setMovieDetails', resp.data)
        })
        .catch((e) => {
          console.log(e);
          commit("showSnackbar", { text: "Database error connection", color: "red" })
        });
      },
    async getMoviesByGenre({ commit }, {genre, page}) {  
      console.log(genre)
      console.log(page)
      commit('setLoadingData', true)
      commit('setSelectedGenre', genre)

      // TODO: INFINITE SCROLL

      const CALL_URL = `${URL}/discover/movie?&api_key=${APIKEY}&sort_by=popularity.desc&language=${LANGUAGE}&page=${page}&with_genres=${genre}`;

        await axios
          .get(CALL_URL)
          .then((resp) => {
            commit('setMoviesByGenre', resp.data.results)
            commit('setGenreDialog', true)
            commit('setLoadingData', false)
          })
          .catch((e) => {
            console.info(e);
            commit("showSnackbar", { text: "Database error connection", color: "red" })
            commit('setLoadingData', false)
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

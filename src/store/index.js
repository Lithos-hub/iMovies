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
    apikey: "c9a3e87b703c630c13d5ea61ef62c7b6",
    language: "es-ES",
    no_image: require("@/assets/img/no-image.jpg"),
    snackbarObject: {
      snackbar: false,
      snackbarColor: "",
      snackbarText: ""
    },
    latestReleases: [],
    trendingMovies: [],
    moviesID: [],
    movieCasting: [],
    movieOfTheWeek: {},
    trailerVideo: "",
    videoNoAvailable: false,
    isLogged: false,
    user: [],
    isDefault: false,
  },
  mutations: {
    setUser(state, payload) {
      state.user.push(payload);
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
    setLatestReleases(state, payload) {
      state.latestReleases = payload;
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
    showSuccess(state, payload) {
      state.snackbarObject = {
        snackbar: true,
        snackbarColor: "success",
        snackbarText: payload,
      }
      setTimeout(() => { state.snackbarObject.snackbar = false }, 3000);
    },
    showError(state, payload) {
      state.snackbarObject = {
        snackbar: true,
        snackbarColor: "error",
        snackbarText: payload,
      }
      setTimeout(() => { state.snackbarObject.snackbar = false }, 3000);
    },
  },
  actions: {
    showSuccess({ commit }, payload) {
      commit("showSuccess", payload);
    },
    showError({ commit }, payload) {
      commit("showError", payload);
    },
    changeLanguage({ commit }, payload) {
      commit("setLanguage", payload);
      i18n.locale = payload.split('-')[0];
    },
    async getLatestReleases({ commit }, byPopularity) {
      let CALL_URL;

      let arr = []
      let pages = [1, 2, 3, 4, 5]

      for (let page of pages) {
        if (byPopularity) {
          CALL_URL = `${URL}/discover/movie?year=${CURRENT_YEAR}&api_key=${APIKEY}&page=${page}&vote_average.gte=7&sort_by=popularity.desc`;
        } else {
          CALL_URL = `${URL}/discover/movie?year=${CURRENT_YEAR}&api_key=${APIKEY}&page=${page}`;
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
        CALL_URL = `${URL}/discover/movie?primary_release_date.gte=${ONE_MONTH_AGO}&primary_release_date.lte=${CURRENT_DATE}&api_key=${APIKEY}&vote_average.gte=7&${LANGUAGE}&sort_by=popularity.desc&include_video=true`;
      } else {
        CALL_URL = `${URL}/discover/movie?primary_release_date.gte=${ONE_MONTH_AGO}&primary_release_date.lte=${CURRENT_DATE}&api_key=${APIKEY}&${LANGUAGE}&include_video=true`;
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
            const CALL_URL_CAST = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${APIKEY}&language=${LANGUAGE}`
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
    async getMovieTrailer({ commit }, id) {
      const CALL_URL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKEY}&language=${LANGUAGE}`;
        await axios
          .get(CALL_URL)
          .then((resp) => {
            if (resp.data.results.length) {
              const KEY = resp.data.results[0].key;
              const VIDEO_YOUTUBE = "https://www.youtube.com/embed/" + KEY;
              commit('setTrailerVideo', VIDEO_YOUTUBE)
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
    async getMovieOfTheWeek({ commit}) {
      const CALL_URL = `${URL}/discover/movie?primary_release_date.gte=${ONE_WEEK_AGO}&primary_release_date.lte=${CURRENT_DATE}&api_key=${APIKEY}&language=${LANGUAGE}&sort_by=popularity.desc&include_video=true`;
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

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

const url = "https://api.themoviedb.org/3";
const apikey = "c9a3e87b703c630c13d5ea61ef62c7b6";
const current_year = new Date().getFullYear();

export default new Vuex.Store({
  state: {
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
    user: null
  },
  mutations: {
    loadingError(state, payload) {
      state.loadingError = payload
    },
    loadingTrending(state, payload) {
      state.loadingTrending = payload
    },
    loadingGenre(state, payload) {
      state.loadingGenre = payload
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
      state.user = payload;
    }
  },
  actions: {
    getCurrentMovies({commit}) {

      const apiurl = `${url}/discover/movie?year=${current_year}&api_key=${apikey}`;
      
      return new Promise((resolve) => {
        
        axios
        .get(apiurl)
        .then((resp) => {
          commit("setCurrent", resp.data.results)
        })
        .catch((e) => {
          console.info(e);
          commit('loadingError', "The answer is taking too long. There may have been an error with the database. Please reload the website.")
        });
      })
    },
    getTrending({commit}) {

      const date = new Date();
      
  
      const dateGreaterThan = `${ date.getFullYear() }-${ ('0' + (date.getMonth() + 1 )).slice(-2) }-${ ('0' + ( date.getDate() - 10)).slice(-2) }`;
      const dateLessThan = `${ date.getFullYear() }-${ ('0' + (date.getMonth() + 1 )).slice(-2) }-${ ('0' + ( date.getDate())).slice(-2) }`;
      
      // ********************* Filter: note average of 7 or greater; English language; popularity desc; release time = 2 weeks ago ----------------------- //
      const apiurl = `${url}/discover/movie?primary_release_date.gte=${dateGreaterThan}&primary_release_date.lte=${ dateLessThan }&api_key=${apikey}&vote_average.gte=7&language=en-EN&sort_by=popularity.desc&include_video=true`;

      return new Promise((resolve) => {
 
        axios
        .get(apiurl)
        .then((resp) => {
            commit("setTrending", resp.data.results)
          
          })
          .catch((e) => {
            console.info(e);
            commit('loadingError', "The answer is taking too long. There may have been an error with the database. Please reload the website.")
          });
      })
    },
  },
  getMoviesByYear({commit}) {
    const year = "";
    const movieURL = `${url}/discover/movie?year=${year}&api_key=${apikey}&sort_by=popularity.desc&page=1`;
    
    return new Promise((resolve) => {
      axios
      .get(movieURL)
      .then((resp) => {
        commit("setMoviesByYear", resp.data.results)
      })
      .catch((e) => {
        console.info(e);
        commit('loadingError', "The answer is taking too long. There may have been an error with the database. Please reload the website.")
      });
    })
  },
  getToWatchMovies({commit}) {
    if (localStorage.getItem("storageToWatchMovies")) {
    commit("setToWatchMovies", JSON.parse(localStorage.getItem("storageToWatchMovies")))
    }
  },
  getWatchedMovies({commit}) {
  if (localStorage.getItem("storageWatchedMovies")) {
  commit("setWatchedMovies", JSON.parse(localStorage.getItem("storageWatchedMovies")))
      }
  },
  getFavoriteMovies({commit}) {
  if (localStorage.getItem("storageFavoriteMovies")) {
  commit("setFavoriteMovies", JSON.parse(localStorage.getItem("storageFavoriteMovies")))
      }
  },
  getRatedMovies({commit}) {
  if (localStorage.getItem("storageRatedMovies")) {
  commit("setRatedMovies", JSON.parse(localStorage.getItem("storageRatedMovies")))
      }
    },
    getters: {
      signedUser(state) {
        return !!state.user
      }
    },
})


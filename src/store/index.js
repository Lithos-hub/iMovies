import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import i18n from "@/plugins/i18n";
import router from "@/router/index";
import { auth, db } from "../../firebase.js";

Vue.use(Vuex);

import {
  URL,
  APIKEY,
  CURRENT_YEAR,
  ONE_MONTH_AGO,
  CURRENT_DATE,
  ONE_WEEK_AGO,
  LANGUAGE,
} from "@/constants/constants.js";

export default new Vuex.Store({
  state: {
    imageURL: "https://image.tmdb.org/t/p/original",
    user: {},
    userData: {},
    documentId: "",
    loadingUserAuthStatus: false,
    userID: null,
    isLogged: false,
    isLoadingDynamicUserData: false,
    apikey: "c9a3e87b703c630c13d5ea61ef62c7b6",
    language: "es-ES",
    no_image: require("@/assets/img/no-image.jpg"),
    loadingIMG: require("@/assets/img/loadingIMG.gif"),
    snackbarObject: {
      snackbar: false,
      snackbarColor: "",
      snackbarText: "",
    },
    comesFromDetails: false,
    isSearchingMovie: false,
    searchItem: {},
    searchInput: "",
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
    selectedGenre: "",
    trailerOfTheWeekVideo: "",
    trailerVideo: "",
    videoNoAvailable: false,
    secondaryVideoNoAvailable: false,
    clickedTab: 0,
    isLoadingAddedMovies: false,
    addedFavourite: false,
    addedWatched: false,
    addedWishlist: false,
    addedRated: false,
    rate: 0,
    favouriteMovies: [],
    watchedMovies: [],
    wishListMovies: [],
    ratedMovies: [],
    isLoadingAllStoragedMovies: false,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setAuthStatus(state, payload) {
      state.isLogged = payload;
    },
    setLoadingUserAuthStatus(state, payload) {
      state.loadingUserAuthStatus = payload;
    },
    setIsLoadingDynamicUserData(state, payload) {
      state.isLoadingDynamicUserData = payload;
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
      state.trailerOfTheWeekVideo = payload;
    },
    setTrailerVideo(state, payload) {
      state.trailerVideo = payload;
    },
    setSecondaryTrailerVideo(state, payload) {
      state.trailerVideo = payload;
    },
    setVideoNoAvailable(state, payload) {
      state.videoNoAvailable = payload;
    },
    setSecondaryVideoNoAvailable(state, payload) {
      state.secondaryVideoNoAvailable = payload;
    },
    setMovieCasting(state, payload) {
      state.movieCasting = payload;
    },
    setMovieOfTheWeek(state, payload) {
      state.movieOfTheWeek = payload;
    },
    setMoviesByYear(state, payload) {
      state.moviesByYear = payload;
    },
    setLanguage(state, payload) {
      state.language = payload;
      localStorage.setItem("storageLanguage", JSON.stringify(state.language));
    },
    showSnackbar(state, { text, color }) {
      state.snackbarObject = {
        snackbar: true,
        snackbarColor: color,
        snackbarText: text,
      };
      setTimeout(() => {
        state.snackbarObject.snackbar = false;
      }, 3000);
    },
    setAddDialog(state, payload) {
      state.addToDialog = payload;
    },
    setAddToMovie(state, payload) {
      state.movieToAdd = payload;
    },
    setMoviesByGenre(state, payload) {
      state.moviesByGenre = payload;
    },
    setGenreDialog(state, payload) {
      state.genreDialog = payload;
    },
    setLoadingData(state, payload) {
      state.loadingData = payload;
    },
    setSelectedGenre(state, payload) {
      state.selectedGenre = payload;
    },
    setComesFromDetails(state, payload) {
      state.comesFromDetails = payload;
    },
    setClickedTab(state, key) {
      state.clickedTab = key;
    },
    setSearchingMovie(state, payload) {
      state.isSearchingMovie = payload;
    },
    setSearchItem(state, payload) {
      state.searchItem = payload;
    },
    setSearchInput(state, payload) {
      state.searchInput = payload;
    },
    setDocID (state, payload) {
      state.documentId = payload;
    },
    setIsLoadingAddedMovies(state, payload) {
      state.isLoadingAddedMovies = payload;
    },
    setAddedFavourite (state, payload) {
      state.addedFavourite = payload;
    },
    setAddedWatched (state, payload) {
      state.addedWatched = payload;
    },
    setAddedWishlist (state, payload) {
      state.addedWishlist = payload;
    },
    setAddedRated (state, payload) {
      state.addedRated = payload;
    },
    setRate (state, payload) {
      state.rate = payload;
    },
    setFavouriteMovies (state, payload) {
      state.favouriteMovies = payload;
    },
    setWatchedMovies (state, payload) {
      state.watchedMovies = payload;
    },
    setWishListMovies (state, payload) {
      state.wishListMovies = payload;
    },
    setRatedMovies (state, payload) {
      state.ratedMovies = payload;
    },
    setLoadingAllStoragedMovies (state, payload) {
      state.isLoadingAllStoragedMovies = payload;
    }
  },
  actions: {
    // ******* USER ACTIONS ******* //
    checkAuth({ commit }) {
      commit("setLoadingUserAuthStatus", true);
      auth.onAuthStateChanged((user) => {
        user ? commit("setAuthStatus", true) : commit("setAuthStatus", false);
        // localStorage.setItem("user", JSON.stringify(user));
        commit("setLoadingUserAuthStatus", false);
      });
    },
    getCurrentUser() {
      return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(
          (user) => {
            unsubscribe();
            resolve(user);
          },
          () => {
            reject();
          }
        );
      });
    },
    async updateProfile({ commit }, { userName, userEmail, userPassword, userAvatar}) {
      const user = auth.currentUser;

      if (userName) {
        await user.updateProfile({ displayName: userName });
      }
      if (userEmail) {
        await user.updateEmail(userEmail);
      }
      if (userPassword) {
        await user.updatePassword(userPassword);
      }
      if (userAvatar) {
        await user.updateProfile({ photoURL: userAvatar });
      }

      commit("setUser", user);
    },
    // ************ MIX ACTIONS ************* //
    showInfo({ commit }, item) {
      router.push({ path: `movie/${item.id}` });
    },
    showSnackbar({ commit }, payload) {
      commit("showSnackbar", payload);
    },
    setAddMovie({ commit }, item) {
      commit("setAddToMovie", item);
    },
    showAddToDialog({ commit }, bool) {
      commit("setAddDialog", bool);
    },
    closeAddToDialog({ commit }, bool) {
      commit("setAddDialog", bool);
    },
    changeLanguage({ commit }, payload) {
      commit("setLanguage", payload);
      setTimeout(() => {
        i18n.locale = payload.split("-")[0];
      }, 1000);
    },
    // ************ MOVIE ACTIONS ************* //
    async getAllStoragedMovies({ commit }) {
      commit("setLoadingAllStoragedMovies", true);
      const MY_DOC_ID = localStorage.getItem("docID");
      const MY_favourite_MOVIES = await db
        .doc(`userData/${MY_DOC_ID}/myMovies/favouriteMovies`)
        .get("moviesList");
      const MY_watched_MOVIES = await db
        .doc(`userData/${MY_DOC_ID}/myMovies/watchedMovies`)
        .get("moviesList");
      const MY_wishList_MOVIES = await db
        .doc(`userData/${MY_DOC_ID}/myMovies/wishListMovies`)
        .get("moviesList");
      const MY_rated_MOVIES = await db
        .doc(`userData/${MY_DOC_ID}/myMovies/ratedMovies`)
        .get("moviesList");

        const favouriteData = MY_favourite_MOVIES.data();
        const watchedData = MY_watched_MOVIES.data();
        const wishListData = MY_wishList_MOVIES.data();
        const ratedData = MY_rated_MOVIES.data();

        commit('setFavouriteMovies', favouriteData.moviesList);
        commit('setWatchedMovies', watchedData.moviesList);
        commit('setWishListMovies', wishListData.moviesList);
        commit('setRatedMovies', ratedData.moviesList);

        commit("setLoadingAllStoragedMovies", false);
    },
    async getStoragedMovies({ commit }, { movieToAdd, MY_DOC_ID }) {
      commit('setIsLoadingAddedMovies', true)
      const MY_favourite_MOVIES = await db
        .doc(`userData/${MY_DOC_ID}/myMovies/favouriteMovies`)
        .get("moviesList");
      const MY_watched_MOVIES = await db
        .doc(`userData/${MY_DOC_ID}/myMovies/watchedMovies`)
        .get("moviesList");
      const MY_wishList_MOVIES = await db
        .doc(`userData/${MY_DOC_ID}/myMovies/wishListMovies`)
        .get("moviesList");
      const MY_rated_MOVIES = await db
        .doc(`userData/${MY_DOC_ID}/myMovies/ratedMovies`)
        .get("moviesList");

      const favouriteData = MY_favourite_MOVIES.data();
      const watchedData = MY_watched_MOVIES.data();
      const wishListData = MY_wishList_MOVIES.data();
      const ratedData = MY_rated_MOVIES.data();

      commit('setFavouriteMovies', favouriteData.moviesList);
      commit('setWatchedMovies', watchedData.moviesList);
      commit('setWishListMovies', wishListData.moviesList);
      commit('setRatedMovies', ratedData.moviesList);

      if (favouriteData.moviesList !== undefined) {
        commit('setAddedFavourite', favouriteData.moviesList.find(movie => movie.id === movieToAdd.id) ? true : false);
      };
      if (watchedData.moviesList !== undefined) {
        commit('setAddedWatched', watchedData.moviesList.find(movie => movie.id === movieToAdd.id) ? true : false);
      };
      if (wishListData.moviesList !== undefined) {
        commit('setAddedWishlist', wishListData.moviesList.find(movie => movie.id === movieToAdd.id) ? true : false);
      };
      if (ratedData.moviesList !== undefined) {
        commit('setAddedRated', ratedData.moviesList.find(movie => movie.id === movieToAdd.id) ? true : false);
        const RATED_MATCH = ratedData.moviesList.find(
          (item) => item.id === movieToAdd.id
        );
        commit('setRate', RATED_MATCH ? RATED_MATCH.rate : 0);
      };
      commit('setIsLoadingAddedMovies', false)
    },
    async getLatestReleases({ commit }, byPopularity) {
      let CALL_URL;

      let arr = [];
      let pages = [1, 2, 3, 4, 5];

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
              arr.push(data);
            }
            commit("setLatestReleases", arr.slice(0, -4));
          })
          .catch((e) => {
            console.log(e);
            commit("showSnackbar", {
              text: "Database error connection",
              color: "red",
            });
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

      let arrMovies = [];
      let arrMoviesID = [];

      await axios
        .get(CALL_URL)
        .then((resp) => {
          for (let data of resp.data.results) {
            arrMovies.push(data);
            arrMoviesID.push(data.id);
          }
          commit("setMoviesID", arrMoviesID);
        })
        .catch((e) => {
          console.log(e);
          commit("showSnackbar", {
            text: "Database error connection",
            color: "red",
          });
        });

      for (let movie of arrMovies) {
        movie.cast = [];
        const CALL_URL_CAST = `${URL}/movie/${movie.id}/credits?api_key=${APIKEY}&language=${LANGUAGE}&include_adult=false`;
        axios
          .get(CALL_URL_CAST)
          .then((resp) => {
            for (let data of resp.data.cast) {
              movie.cast.push({
                name: data.name,
                character: data.character,
              });
            }
            commit("setTrending", arrMovies);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    async getMovieTrailer({ commit }, { type, id }) {
      const CALL_URL = `${URL}/movie/${id}/videos?api_key=${APIKEY}&language=${LANGUAGE}&include_adult=false`;
      await axios
        .get(CALL_URL)
        .then((resp) => {
          if (resp.data.results.length) {
            commit("setSecondaryVideoNoAvailable", false);
            const KEY = resp.data.results[0].key;
            const VIDEO_YOUTUBE = "https://www.youtube.com/embed/" + KEY;
            if (type === "ofTheWeek") {
              commit("setTrailerOfTheWeekVideo", VIDEO_YOUTUBE);
            }
            if (type === "other") {
              commit("setTrailerVideo", VIDEO_YOUTUBE);
            }
          } else {
            commit("setVideoNoAvailable", true);
            // We will provide the trailer in case of not to be available, so the user can watch it in english
            const SECONDARY_URL = `${URL}/movie/${id}/videos?api_key=${APIKEY}&language=en-EN&include_adult=false`;
            axios
              .get(SECONDARY_URL)
              .then((resp) => {
                if (resp.data.results.length) {
                  const KEY = resp.data.results[0].key;
                  const VIDEO_YOUTUBE = "https://www.youtube.com/embed/" + KEY;
                  commit("setSecondaryTrailerVideo", VIDEO_YOUTUBE);
                } else {
                  commit("setVideoNoAvailable", false);
                  commit("setSecondaryVideoNoAvailable", true);
                }
              })
              .catch((e) => {
                console.log(e);
                commit("showSnackbar", {
                  text: "Database error connection",
                  color: "red",
                });
              });
          }
        })
        .catch((e) => {
          console.log(e);
          commit("showSnackbar", {
            text: "Database error connection",
            color: "red",
          });
        });
    },
    async getMovieOfTheWeek({ commit }) {
      const CALL_URL = `${URL}/discover/movie?primary_release_date.gte=${ONE_WEEK_AGO}&primary_release_date.lte=${CURRENT_DATE}&api_key=${APIKEY}&vote_average.gte=7&language=${LANGUAGE}&sort_by=popularity.desc&include_video=true&include_adult=false`;
      await axios
        .get(CALL_URL)
        .then((resp) => {
          if (resp.data.results.length) {
            commit("setMovieOfTheWeek", resp.data.results[0]);
          }
        })
        .catch((e) => {
          console.log(e);
          commit("showSnackbar", {
            text: "Database error connection",
            color: "red",
          });
        });
    },
    async getMoviesByYear({ commit, dispatch }, { year, page }) {
      commit("setLoadingData", true);
      let arrMovies = [];
      let arrMoviesID = [];
      if (year >= 1878 && year <= 2030) {
        for (let i = 1; i <= page; i++) {
          const CALL_URL = `${URL}/discover/movie?year=${year}&api_key=${APIKEY}&language=${LANGUAGE}&sort_by=popularity.desc&page=${i}&include_adult=false`;
          await axios
            .get(CALL_URL)
            .then((resp) => {
              if (resp.data.results.length) {
                for (let data of resp.data.results) {
                  arrMovies.push(data);
                  arrMoviesID.push(data.id);
                }
                dispatch('getAllStoragedMovies');
                setTimeout(() => {
                  commit("setMoviesByYear", arrMovies);
                  commit("setMoviesID", arrMoviesID);
                  commit("setLoadingData", false);
                }, 2000);
              }
            })
            .catch((e) => {
              console.info(e);
              commit("showSnackbar", {
                text: "Database error connection",
                color: "red",
              });
              commit("setLoadingData", false);
            });
        }
      } else {
        commit("setMoviesByYear", []);
        commit("setMoviesID", []);
        commit("setLoadingData", false);
      }
    },
    async getMovieDetails({ commit }, id) {
      const CALL_URL = `${URL}/movie/${id}?api_key=${APIKEY}&language=${LANGUAGE}&include_adult=false`;

      await axios
        .get(CALL_URL)
        .then((resp) => {
          commit("setMovieDetails", resp.data);
        })
        .catch((e) => {
          console.log(e);
          commit("showSnackbar", {
            text: "Database error connection",
            color: "red",
          });
        });
    },
    async getMoviesByGenre({ commit }, { genre, page }) {
      console.log(genre);
      console.log(page);
      commit("setLoadingData", true);
      commit("setSelectedGenre", genre);

      // TODO: INFINITE SCROLL

      const CALL_URL = `${URL}/discover/movie?&api_key=${APIKEY}&sort_by=popularity.desc&language=${LANGUAGE}&page=${page}&with_genres=${genre}`;

      await axios
        .get(CALL_URL)
        .then((resp) => {
          commit("setMoviesByGenre", resp.data.results);
          commit("setGenreDialog", true);
          commit("setLoadingData", false);
        })
        .catch((e) => {
          console.info(e);
          commit("showSnackbar", {
            text: "Database error connection",
            color: "red",
          });
          commit("setLoadingData", false);
        });
    },
  },
  getters: {
    userData: (state) => state.user,
    isLogged: (state) => state.isLogged,
    myDocumentID: (state) => state.documentId,
  },
});

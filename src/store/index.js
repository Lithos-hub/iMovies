import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import i18n from "@/plugins/i18n";
import router from "@/router/index";
import { auth, db, firebase } from "../../firebase.js";

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
    userPoints: null,
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
    warningObject: {
      warning: false,
      warningColor: "",
      warningText: "",
    },
    rewardObject: {
      notification: false,
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
    triviaMoviesBackground: [],
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
    moviesCounter: null,
    questionID: 0,
    resolvedQuestions: [],
    currentDate: null,
    achievementsCards: [],
    visitedSections: []
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
    showWarning(state, { text, color, isCorrect }) {
      state.warningObject = {
        warning: true,
        warningColor: color,
        warningText: text,
        isCorrect: isCorrect,
      };
      setTimeout(() => {
        state.warningObject.warning = false;
      }, 3000);
    },
    showNotification(state) {
      state.rewardObject = {
        notification: true,
      };
      setTimeout(() => {
        state.rewardObject.notification = false;
      }, 6000);
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
    setDocID(state, payload) {
      state.documentId = payload;
    },
    setIsLoadingAddedMovies(state, payload) {
      state.isLoadingAddedMovies = payload;
    },
    setAddedFavourite(state, payload) {
      state.addedFavourite = payload;
    },
    setAddedWatched(state, payload) {
      state.addedWatched = payload;
    },
    setAddedWishlist(state, payload) {
      state.addedWishlist = payload;
    },
    setAddedRated(state, payload) {
      state.addedRated = payload;
    },
    setRate(state, payload) {
      state.rate = payload;
    },
    setFavouriteMovies(state, payload) {
      state.favouriteMovies = payload;
    },
    setWatchedMovies(state, payload) {
      state.watchedMovies = payload;
    },
    setWishListMovies(state, payload) {
      state.wishListMovies = payload;
    },
    setRatedMovies(state, payload) {
      state.ratedMovies = payload;
    },
    setLoadingAllStoragedMovies(state, payload) {
      state.isLoadingAllStoragedMovies = payload;
    },
    setMoviesCounter(state, payload) {
      state.moviesCounter = payload;
    },
    setQuestionID(state, payload) {
      state.questionID = payload;
    },
    setResolvedQuestions(state, payload) {
      state.resolvedQuestions = payload;
    },
    setTriviaMoviesBackground(state, payload) {
      state.triviaMoviesBackground = payload;
    },
    setCurrentDate(state, payload) {
      state.currentDate = payload;
    },
    setUserPoints(state, payload) {
      state.userPoints = payload;
    },
    setAchievementsCards(state, payload) {
      state.achievementsCards = payload;
    },
    setMoviesMap(state, payload) {
      state.moviesMap = payload;
    },
    setVisitedSections(state, payload) {
      state.visitedSections = payload;
    },
  },
  actions: {
    // ! __________________ MIX ACTIONS __________________ //
    showInfo({ commit }, item) {
      router.push({ path: `movie/${item.id}` });
    },
    showSnackbar({ commit }, payload) {
      commit("showSnackbar", payload);
    },
    showWarning({ commit }, payload) {
      commit("showWarning", payload);
    },
    showRewardNotification({ commit }) {
      commit("showNotification", true);
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
    // ! __________________ FIREBASE ACTIONS __________________ //
    // ? ----- USER ACTIONS ----- //
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
    async updateProfile(
      { commit },
      { userName, userEmail, userPassword, userAvatar }
    ) {
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
    async getUserPoints({ commit }) {
      const MY_DOC_ID = localStorage.getItem("docID");
      const My_POINTS = await db
        .doc(`userData/${MY_DOC_ID}/triviaQuestions/points`)
        .get("total");

      const userPoints = My_POINTS.data();
      commit("setUserPoints", userPoints.total);
    },
    async addUserPoints(points) {
      const MY_DOC_ID = localStorage.getItem("docID");
      await db.doc(`userData/${MY_DOC_ID}/triviaQuestions/points`).set({
        total: points,
      });
    },
    // ? ----- FIRESTORE ACTIONS ----- //
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

      let moviesCounter =
        favouriteData.moviesList.length +
        watchedData.moviesList.length +
        wishListData.moviesList.length +
        ratedData.moviesList.length;

      commit("setMoviesCounter", moviesCounter);
      commit("setFavouriteMovies", favouriteData.moviesList);
      commit("setWatchedMovies", watchedData.moviesList);
      commit("setWishListMovies", wishListData.moviesList);
      commit("setRatedMovies", ratedData.moviesList);
      commit("setLoadingAllStoragedMovies", false);
    },
    async getStoragedMovies({ commit, dispatch }, { movieToAdd, MY_DOC_ID }) {
      commit("setIsLoadingAddedMovies", true);
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

      let moviesCounter =
        favouriteData.moviesList.length +
        watchedData.moviesList.length +
        wishListData.moviesList.length +
        ratedData.moviesList.length;

      commit("setMoviesCounter", moviesCounter);
      commit("setFavouriteMovies", favouriteData.moviesList);
      commit("setWatchedMovies", watchedData.moviesList);
      commit("setWishListMovies", wishListData.moviesList);
      commit("setRatedMovies", ratedData.moviesList);

      if (favouriteData.moviesList !== undefined) {
        commit(
          "setAddedFavourite",
          favouriteData.moviesList.find((movie) => movie.id === movieToAdd.id)
            ? true
            : false
        );
      }
      if (watchedData.moviesList !== undefined) {
        commit(
          "setAddedWatched",
          watchedData.moviesList.find((movie) => movie.id === movieToAdd.id)
            ? true
            : false
        );
      }
      if (wishListData.moviesList !== undefined) {
        commit(
          "setAddedWishlist",
          wishListData.moviesList.find((movie) => movie.id === movieToAdd.id)
            ? true
            : false
        );
      }
      if (ratedData.moviesList !== undefined) {
        commit(
          "setAddedRated",
          ratedData.moviesList.find((movie) => movie.id === movieToAdd.id)
            ? true
            : false
        );
        const RATED_MATCH = ratedData.moviesList.find(
          (item) => item.id === movieToAdd.id
        );
        commit("setRate", RATED_MATCH ? RATED_MATCH.rate : 0);
      }
      commit("setIsLoadingAddedMovies", false);
      dispatch('addAchievementByGenre')
      dispatch('addAchievementByMovie')
    },
    async addAchievementByGenre ({ dispatch, state }) {
      // ? **************** Here we will achieve if the user has watched 50 movies **************** ? //
      state.favouriteMovies.length >= 50 ? dispatch("getReward", 38) : null;
      state.watchedMovies.length >= 50 ? dispatch("getReward", 32) : null;
      state.wishListMovies.length >= 50 ? dispatch("getReward", 39) : null;
      state.ratedMovies.length >= 50 ? dispatch("getReward", 40) : null;
      // ? **************** Here we will find 50 movies by categories to get the rewards **************** ? //

      const moviesMap = new Map()
      const setArr = [
        ...new Set(
          state.favouriteMovies.concat(
            state.watchedMovies,
            state.wishListMovies,
            state.ratedMovies
          )
        ),
      ];
      const arrayMoviesIds = setArr.map((item) => item.id ? item.id : item.genre_ids);
      console.log("All movies saved: ", arrayMoviesIds);

      const genresArr = [
        28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878,
        10770, 53, 10752, 37,
      ];

      const getGenre = (genre) => {
        let genres = {
          28: 'action',
          12: 'adventure',
          16: 'animation',
          35: 'comedy',
          80: 'crime',
          99: 'documentary',
          18: 'drama',
          10751: 'family',
          14: 'fantasy',
          36: 'history',
          27: 'horror',
          10402: 'music',
          9648: 'mystery',
          10749: 'romance',
          878: 'scifi',
          10770: 'tv',
          53: 'thriller',
          10752: 'war',
          37: 'western',
        };
        return genres[genre];
      };

      const filterByGenre = (genre) => {
        return arrayMoviesIds.filter((movie) => {
          if (movie.genre_ids) {
            return movie.genre_ids.includes(genre)
          }
          if (movie.genres) {
            let auxGenArr = []
            for (let genID of movie.genres) {
              auxGenArr.push(genID.id)
            }
            return auxGenArr.includes(genre)
          }
        }); // ? => Returns an array with filtered movies
      };

      for (let gen of genresArr) {
        moviesMap.set(getGenre(gen), filterByGenre(gen));
      }

      const getMoviesByGenre = (genre) => {
        if (moviesMap && moviesMap.has(getGenre(genre))) {
          return moviesMap.get(getGenre(genre));
        }
        return []
      }

      const getRewardByGenre = (genre) => {
        let genres = {
          28: 12, // ? => 'action'
          12: 13, // ? => 'adventure'
          16: 14, // ? => 'animation'
          35: 15, // ? => 'comedy'
          80: 16, // ? => 'crime'
          99: 17, // ? => 'documentary'
          18: 18, // ? => 'drama'
          14: 19, // ? => 'fantasy'
          36: 20, // ? => 'history'
          27: 21, // ? => 'horror'
          10402: 22, // ? => 'music'
          10749: 23, // ? => 'romance'
          878: 24, // ? => 'scifi'
          53: 25, // ? => 'thriller'
          10752: 26, // ? => 'war'
          37: 27, // ? => 'western'
        }
        return genres[genre]
      }

      genresArr.forEach(gen => {
        let arr = getMoviesByGenre(gen)
        arr.length >= 50 ? dispatch('getReward', getRewardByGenre(gen)) : console.log(`Genre ${getGenre(gen).toUpperCase()} need ${50 - arr.length} more movies to get the reward`)
      })
    },
    async addAchievementByMovie({ dispatch, state }) {
      const setArr = [
        ...new Set(
          state.favouriteMovies.concat(
            state.watchedMovies,
            state.wishListMovies,
            state.ratedMovies
          )
        ),
      ];

      const arrayMoviesIds = setArr.map((item) => item.id ? item.id : item.genre_ids);
      console.log('Unique array: ', arrayMoviesIds)
      
      // TODO: continuar
      const checker = (arr, myMoviesArr) => {
        return arr.every(id => myMoviesArr.includes(id))
      }

      const STARWARS_MOVIES = [
        1893, // Episode I
        1894, // Episode II
        1895, // Episode III
        11, // Episode IV
        1891, // Episode V
        1892, // Episode VI
        140607, // Episode VII
        181808, // Episode VIII
        181812, // Episode IX
      ]

      
      const LOTR_HOBBIT_MOVIES = [
        120, // LOTR: The Fellowship of the Ring
        121, // LOTR: The Two Towers
        122, // LOTR: The Return of the King
        49051, // LOTR: The Hobbit: An Unexpected Journey
        57158, // LOTR: The Hobbit: The Desolation of Smaug
        122917, // LOTR: The Hobbit: The Battle of the Five Armies
      ]
      
      const HARRY_POTTER_MOVIES = [
        671, // Harry Potter and the Philosopher's Stone
        672, // Harry Potter and the Chamber of Secrets
        673, // Harry Potter and the Prisoner of Azkaban
        674, // Harry Potter and the Goblet of Fire
        675, // Harry Potter and the Order of the Phoenix
        767, // Harry Potter and the Half-Blood Prince
        12444, // Harry Potter and the Deathly Hallows PT.1
        12445, // Harry Potter and the Deathly Hallows PT.2
      ]
      
      const BLADE_RUNNER_MOVIE = [
        78, // Blade Runner
      ]
      
      const KILL_BILL_MOVIES = [
        24, // Kill Bill: Volume 1
        393, // Kill Bill: Volume 2
      ]
      
      const GODFATHER_MOVIE = [
        238, // The Godfather
      ]

      console.log('Checking Star Wars: ', checker(STARWARS_MOVIES, arrayMoviesIds))
      console.log('Checking LOTR: ', checker(LOTR_HOBBIT_MOVIES, arrayMoviesIds))
      console.log('Checking Harry Potter: ', checker(HARRY_POTTER_MOVIES, arrayMoviesIds))
      console.log('Checking Blade Runner: ', checker(BLADE_RUNNER_MOVIE, arrayMoviesIds))
      console.log('Checking Kill Bill: ', checker(KILL_BILL_MOVIES, arrayMoviesIds))
      console.log('Checking Godfather: ', checker(GODFATHER_MOVIE, arrayMoviesIds))
      
      checker(STARWARS_MOVIES, arrayMoviesIds) ? dispatch('getReward', 6) : null
      checker(LOTR_HOBBIT_MOVIES, arrayMoviesIds) ? dispatch('getReward', 7) : null
      checker(HARRY_POTTER_MOVIES, arrayMoviesIds) ? dispatch('getReward', 8) : null
      checker(BLADE_RUNNER_MOVIE, arrayMoviesIds) ? dispatch('getReward', 9) : null
      checker(KILL_BILL_MOVIES, arrayMoviesIds) ? dispatch('getReward', 10) : null
      checker(GODFATHER_MOVIE, arrayMoviesIds) ? dispatch('getReward', 11) : null
    },
    async getGettedAchievements({ commit }) {
      const MY_DOC_ID = localStorage.getItem("docID");
      // ? First, we get all achievements on the database
      const REWARDS_REF = await db
        .doc(`Achievements/AllAchievements`)
        .get("list");
      const ALL_REWARDS_ARRAY = REWARDS_REF.data();
      const ALL_ACHIEVEMENTS = ALL_REWARDS_ARRAY.list;

      // ? Then, we filter by the user's achievements
      const MY_REWARDS_FB = await db
        .doc(`userData/${MY_DOC_ID}/rewards/achievements`)
        .get("codes");

      const MY_REWARDS_DATA = MY_REWARDS_FB.data();
      const MY_REWARDS = MY_REWARDS_DATA.codes;
      console.log("My Rewards: ", MY_REWARDS);

      const OWNED_REWARDS = ALL_ACHIEVEMENTS.filter((achievement) =>
        MY_REWARDS.includes(achievement.code)
      );

      commit("setAchievementsCards", OWNED_REWARDS);
    },
    getHasTheReward({}, code) {
      console.log("Checking the reward: ", code);
      let match = null;
      return new Promise((resolve) => {
        let cards = this.getters.achievementsCards;
        match = cards.some((card) => card.code === code);
        console.log("Has the reward? " + match);
        match ? resolve(true) : resolve(false);
      });
    },
    async getReward({ dispatch }, code) {
      await dispatch("getHasTheReward", code).then((res) => {
        if (!res) {
          dispatch("addAchievement", code);
          dispatch("getGettedAchievements");
        }
      });
    },
    getQuestionID({ commit }) {
      let id = null;
      // TODO: get question ID from firestore

      commit("setQuestionID", id);
    },
    async addAchievement({ dispatch }, code) {
      const MY_DOC_ID = localStorage.getItem("docID");
      let myDocRef = await db.doc(`userData/${MY_DOC_ID}/rewards/achievements`);

      myDocRef
        .update({
          codes: firebase.firestore.FieldValue.arrayUnion(code),
        })
        .then(() => {
          dispatch("showRewardNotification");
        });
    },
    async getVisitedSections({ commit }, visitedSections) {
      console.log('Visited sections: ', visitedSections)
      if (visitedSections.length < 11) {
        const MY_DOC_ID = localStorage.getItem("docID");
        const VISITED_SECTIONS_FB = await db
        .doc(`userData/${MY_DOC_ID}/iMovies-Sections/sections`)
        .get("visited");
        const VISITED_ARR = VISITED_SECTIONS_FB.data();
        commit('setVisitedSections', VISITED_ARR.visited)
      }
      if (visitedSections.length === 11) {
        this.dispatch('getReward', 31)
      }
    },
    // ! __________________ API ACTIONS __________________ //
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
          commit("setTriviaMoviesBackground", arrMovies);
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
                dispatch("getAllStoragedMovies");
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

      const CALL_URL = `${URL}/discover/movie/?api_key=${APIKEY}&sort_by=popularity.desc&language=${LANGUAGE}&page=${page}&with_genres=${genre}`;

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
    async getRandomMovies({ commit }) {
      let arr = [];
      let page = 1;
      const CALL_URL = `${URL}/discover/movie?year=2021&api_key=${APIKEY}&include_adult=false&page=${page}&sort_by=popularity.desc&vote_average.gte=6`;
      await axios
        .get(CALL_URL)
        .then((resp) => {
          for (let movie of resp.data.results) {
            arr.push(movie);
          }
        })
        .catch((e) => {
          console.log(e);
          commit("showSnackbar", {
            text: "Database error connection",
            color: "red",
          });
        });
      commit("setTriviaMoviesBackground", arr);
    },
  },
  getters: {
    userData: (state) => state.user,
    isLogged: (state) => state.isLogged,
    myDocumentID: (state) => state.documentId,
    counterMovies: (state) => state.counterMovies,
    userPoints: (state) => state.userPoints,
    questionID: (state) => state.questionID,
    achievementsCards: (state) => state.achievementsCards,
    visitedSections: (state) => state.visitedSections,
  },
});

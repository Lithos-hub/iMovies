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
    reUpdateComponentKey: 0,
    myDocID: localStorage.getItem("docID"),
    imageURL: "https://image.tmdb.org/t/p/original",
    user: {},
    mySocialData: {},
    userPoints: null,
    userData: {},
    loadingUserAuthStatus: false,
    isLogged: false,
    isLoadingDynamicUserData: false,
    isLoading: true,
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
    comesFromAnotherView: false,
    comebackFromDetails: false,
    rewardObject: {
      notification: false,
    },
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
    visitedSections: [],
    chatIsActivated: false,
    isChatting: false,
    showingFriends: true,
    chatRooms: {},
    userToChat: null,
    iMoviesUsersList: [],
    myFriendshipRequests: [],
    mySocialRequests: {
      accepted: [],
      rejected: [],
      sended: [],
    },
    myFriendsList: [],
    friendshipDate: "",
    hasNotifications: false,
    notifications: [],
    userDetailsData: {
      docID: "",
      userName: "",
      avatar: "",
      userEmail: "",
      userID: "",
      favouriteData: {
        moviesList: [],
      },
      watchedData: {
        moviesList: [],
      },
      wishListData: {
        moviesList: [],
      },
      ratedData: {
        moviesList: [],
      },
    },
  },
  mutations: {
    updateComponent(state) {
      state.reUpdateComponentKey++;
    },
    resetData(state) {
      state.user = {};
      state.mySocialData = {};
      state.userDetailsData = {};
      state.myFriendshipRequests = [];
      state.mySocialRequests.accepted = [];
      state.mySocialRequests.rejected = [];
      state.mySocialRequests.sended = [];
    },
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
    setComesFromAnotherView(state, payload) {
      state.comesFromAnotherView = payload;
    },
    setcomebackFromDetails(state, payload) {
      state.comebackFromDetails = payload;
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
      state.docID = payload;
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
    setChatIsActivated(state, payload) {
      state.chatIsActivated = payload;
    },
    setIsChatting(state, payload) {
      state.isChatting = payload;
    },
    setUserToChat(state, id) {
      state.userToChat = id;
      state.isChatting = true;
    },
    setIsShowingFriends(state, payload) {
      state.showingFriends = payload;
    },
    setiMoviesUsersList(state, payload) {
      state.iMoviesUsersList = payload;
    },
    setMyFriendshipRequests(state, payload) {
      state.myFriendshipRequests = payload;
    },
    setAllSocialRequests(state, payload) {
      state.mySocialRequests = payload;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    setHasNotifications(state, payload) {
      state.hasNotifications = payload;
    },
    setNotifications(state, payload) {
      state.notifications = payload;
    },
    setMyFriendslist(state, payload) {
      state.myFriendsList = payload;
    },
    setMySocialData(state, payload) {
      state.mySocialData = payload;
    },
    setUserDetailsData(state, payload) {
      state.userDetailsData = payload;
    },
    setFriendshipDate(state, payload) {
      state.friendshipDate = payload;
    },
    setChatRooms(state, payload) {
      state.chatRooms = payload;
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
    async getMyDocID({ commit, rootState }) {
      const COLLECTION = await db.collection("userData").get();
      const USERDATA = rootState.user;
      if (USERDATA) {
        COLLECTION.forEach((doc) => {
          if (doc.data().userID === USERDATA.uid) {
            commit("setDocID", doc.data().docID);
            localStorage.setItem("docID", doc.data().docID);
          }
        });
      }
    },
    checkLogin({ commit, dispatch }) {
      let user = auth.currentUser;
      if (user) {
        dispatch("setOnlineStatus", true);
      }
      dispatch("setOnlineStatus", false);
    },
    async setOnlineStatus({ commit, state }, onlineStatus) {
      await db.doc(`userData/${state.myDocID}/onlineStatus/status`).set({
        isOnline: onlineStatus,
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
    // ? ----- SOCIAL ACTIONS ----- //
    async getMySocialData({ commit, state }) {
      commit("setIsLoading", true);
      let myDataRef = await db.doc(`userData/${state.myDocID}`).get();
      let myData = myDataRef.data();
      let myUserData = {
        avatar: myData.avatar,
        docID: myData.docID,
        userName: myData.userName,
      };
      commit("setMySocialData", myUserData);
    },
    getUsers({ commit }) {
      return new Promise(async (resolve) => {
        let arr = [];
        await db
          .collection("userData")
          .get()
          .then(async (snapshot) => {
            for (let user of snapshot.docs) {
              let userData = user.data();
              const FAVOURITES_COL = await db
                .doc(`userData/${userData.docID}/myMovies/favouriteMovies`)
                .get("moviesList");
              const WATCHED_COL = await db
                .doc(`userData/${userData.docID}/myMovies/watchedMovies`)
                .get("moviesList");
              const WISH_COL = await db
                .doc(`userData/${userData.docID}/myMovies/wishListMovies`)
                .get("moviesList");
              const RATED_COL = await db
                .doc(`userData/${userData.docID}/myMovies/ratedMovies`)
                .get("moviesList");

              const favouriteData = FAVOURITES_COL.data();
              const watchedData = WATCHED_COL.data();
              const wishData = WISH_COL.data();
              const ratedData = RATED_COL.data();
              arr.push({
                ...userData,
                userMovies: {
                  total:
                    favouriteData.moviesList.length +
                    watchedData.moviesList.length +
                    wishData.moviesList.length +
                    ratedData.moviesList.length,
                  favourites: favouriteData.moviesList.length,
                  watched: watchedData.moviesList.length,
                  wishlist: wishData.moviesList.length,
                  rated: ratedData.moviesList.length,
                },
              });
            }
            resolve(arr);
          });
      });
    },
    async getUserByName({ commit, dispatch }, searchName = "") {
      commit("setIsLoading", true);
      const arr = await dispatch("getUsers");
      commit(
        "setiMoviesUsersList",
        arr.filter((user) =>
          user.userName.toLowerCase().includes(searchName.toLowerCase())
        )
      );
      commit("setIsLoading", false);
    },
    async getAllUsers({ commit, rootState, dispatch }) {
      commit("setIsLoading", true);
      const arr = await dispatch("getUsers");
      commit(
        "setiMoviesUsersList",
        arr.filter((user) => user.userID !== rootState.user.uid)
      );
      commit("setIsLoading", false);
    },
    async getAllMyFriends({ commit, state }) {
      // ! => My friends list (/community)
      let myAcceptedData = state.mySocialRequests.accepted;
      let arr = [];

      for (let user of myAcceptedData) {
        const FRIEND_favourite_MOVIES = await db
          .doc(`userData/${user.docID}/myMovies/favouriteMovies`)
          .get("moviesList");
        const FRIEND_watched_MOVIES = await db
          .doc(`userData/${user.docID}/myMovies/watchedMovies`)
          .get("moviesList");
        const FRIEND_wishList_MOVIES = await db
          .doc(`userData/${user.docID}/myMovies/wishListMovies`)
          .get("moviesList");
        const FRIEND_rated_MOVIES = await db
          .doc(`userData/${user.docID}/myMovies/ratedMovies`)
          .get("moviesList");

        let onlineStatus = await db
          .doc(`userData/${user.docID}/onlineStatus/status`)
          .get("isOnline");

        const favouriteData = FRIEND_favourite_MOVIES.data();
        const watchedData = FRIEND_watched_MOVIES.data();
        const wishListData = FRIEND_wishList_MOVIES.data();
        const ratedData = FRIEND_rated_MOVIES.data();
        let ref = await db.doc(`userData/${user.docID}`).get();
        let data = ref.data();
        arr.push({
          userName: data.userName,
          uid: data.userID,
          avatar: data.avatar,
          docID: user.docID,
          friendshipDate: user.createdAt,
          onlineStatus: onlineStatus,
          userMovies: {
            total:
              favouriteData.moviesList.length +
              watchedData.moviesList.length +
              wishListData.moviesList.length +
              ratedData.moviesList.length,
            favourites: favouriteData.moviesList.length,
            watched: watchedData.moviesList.length,
            wishlist: wishListData.moviesList.length,
            rated: ratedData.moviesList.length,
          },
        });
        commit("setMyFriendslist", arr);
        commit("setIsLoading", false);
      }
    },
    async sendFriendRequest({ commit, state }, userData) {
      let MY_SENDED_DOC_REF = await db.doc(
        `userData/${state.myDocID}/mySocialRequests/sended`
      );
      MY_SENDED_DOC_REF.update({
        sendedList: firebase.firestore.FieldValue.arrayUnion(userData),
      });
      let USER_RECEIVED_REF = await db.doc(
        `userData/${userData.docID}/mySocialRequests/received`
      );
      USER_RECEIVED_REF.update({
        receivedList: firebase.firestore.FieldValue.arrayUnion(
          state.mySocialData
        ),
      });
    },
    acceptFriendshipRequest({ commit, rootState, dispatch }, userData) {
      commit("setIsLoading", true);
      let date = new Date();
      let today =
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

      setTimeout(async () => {
        // ? IN MY DATA, I WILL REMOVE THE DOCID AND MOVE IT TO ACCEPTED
        let MY_RECEIVED_REF = await db.doc(
          `userData/${rootState.myDocID}/mySocialRequests/received`
        );
        let MY_ACCEPTED_REF = await db.doc(
          `userData/${rootState.myDocID}/mySocialRequests/accepted`
        );
        MY_RECEIVED_REF.update({
          receivedList: firebase.firestore.FieldValue.arrayRemove(userData),
        });
        MY_ACCEPTED_REF.update({
          acceptedList: firebase.firestore.FieldValue.arrayUnion({
            ...userData,
            createdAt: today,
          }),
        });
      }, 250);
      setTimeout(async () => {
        // ? IN THE OTHER USER, I WILL REMOVE THE DOCID AND MOVE IT TO ACCEPTED
        let USER_SENDED_REF = await db.doc(
          `userData/${userData.docID}/mySocialRequests/sended`
        );
        let USER_ACCEPTED_REF = await db.doc(
          `userData/${userData.docID}/mySocialRequests/accepted`
        );
        USER_SENDED_REF.update({
          sendedList: firebase.firestore.FieldValue.arrayRemove(
            rootState.mySocialData
          ),
        });
        USER_ACCEPTED_REF.update({
          acceptedList: firebase.firestore.FieldValue.arrayUnion({
            ...rootState.mySocialData,
            createdAt: today,
          }),
        });
      }, 500);

      setTimeout(async () => {
        dispatch("getFriendshipNotification");
        dispatch("getAllMyFriends");
        let filteredArr = rootState.myFriendshipRequests.filter(
          (user) => user.docID !== userData.docID
        );
        commit("setMyFriendshipRequests", filteredArr);
      }, 750);
    },
    async getMyFriendshipData({ commit, state, dispatch }) {
      const MY_SENDED_REF = await db
        .doc(`userData/${state.myDocID}/mySocialRequests/sended`)
        .get("sendedList");
      const MY_ACCEPTED_REF = await db
        .doc(`userData/${state.myDocID}/mySocialRequests/accepted`)
        .get("acceptedList");
      const MY_REJECTED_REF = await db
        .doc(`userData/${state.myDocID}/mySocialRequests/rejected`)
        .get("rejectedList");

      const SENDED_DATA = MY_SENDED_REF.data();
      const ACCEPTED_DATA = MY_ACCEPTED_REF.data();
      const REJECTED_DATA = MY_REJECTED_REF.data();

      console.log(SENDED_DATA)

      commit("setAllSocialRequests", {
        sended: SENDED_DATA.sendedList || [],
        accepted: ACCEPTED_DATA.acceptedList || [],
        rejected: REJECTED_DATA.rejectedList || [],
      });

      dispatch("getAllMyFriends");
    },
    async getUserDetailsData({ commit }, { data: userData, id: docID }) {
      commit("setIsLoading", true);
      const USER_favourite_MOVIES = await db
        .doc(`userData/${docID}/myMovies/favouriteMovies`)
        .get("moviesList");
      const USER_watched_MOVIES = await db
        .doc(`userData/${docID}/myMovies/watchedMovies`)
        .get("moviesList");
      const USER_wishList_MOVIES = await db
        .doc(`userData/${docID}/myMovies/wishListMovies`)
        .get("moviesList");
      const USER_rated_MOVIES = await db
        .doc(`userData/${docID}/myMovies/ratedMovies`)
        .get("moviesList");

      const favouriteData = USER_favourite_MOVIES.data();
      const watchedData = USER_watched_MOVIES.data();
      const wishListData = USER_wishList_MOVIES.data();
      const ratedData = USER_rated_MOVIES.data();

      let fullData = {
        ...userData,
        favouriteData,
        watchedData,
        wishListData,
        ratedData,
      };

      console.log("User full data ==> ", fullData);

      commit("setUserDetailsData", fullData);
      commit("setIsLoading", false);
      commit("updateComponent");
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
    async getAllStoragedMovies({ commit, state }) {
      commit("setLoadingAllStoragedMovies", true);
      const MY_favourite_MOVIES = await db
        .doc(`userData/${state.myDocID}/myMovies/favouriteMovies`)
        .get("moviesList");
      const MY_watched_MOVIES = await db
        .doc(`userData/${state.myDocID}/myMovies/watchedMovies`)
        .get("moviesList");
      const MY_wishList_MOVIES = await db
        .doc(`userData/${state.myDocID}/myMovies/wishListMovies`)
        .get("moviesList");
      const MY_rated_MOVIES = await db
        .doc(`userData/${state.myDocID}/myMovies/ratedMovies`)
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
    async getStoragedMovies({ commit, state, dispatch }, { movieToAdd = {} }) {
      commit("setIsLoadingAddedMovies", true);
      const MY_favourite_MOVIES = await db
        .doc(`userData/${state.myDocID}/myMovies/favouriteMovies`)
        .get("moviesList");
      const MY_watched_MOVIES = await db
        .doc(`userData/${state.myDocID}/myMovies/watchedMovies`)
        .get("moviesList");
      const MY_wishList_MOVIES = await db
        .doc(`userData/${state.myDocID}/myMovies/wishListMovies`)
        .get("moviesList");
      const MY_rated_MOVIES = await db
        .doc(`userData/${state.myDocID}/myMovies/ratedMovies`)
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

      if (favouriteData.moviesList !== undefined && movieToAdd !== undefined) {
        commit(
          "setAddedFavourite",
          favouriteData.moviesList.find((movie) => movie.id === movieToAdd.id)
            ? true
            : false
        );
      }
      if (watchedData.moviesList !== undefined && movieToAdd !== undefined) {
        commit(
          "setAddedWatched",
          watchedData.moviesList.find((movie) => movie.id === movieToAdd.id)
            ? true
            : false
        );
      }
      if (wishListData.moviesList !== undefined && movieToAdd !== undefined) {
        commit(
          "setAddedWishlist",
          wishListData.moviesList.find((movie) => movie.id === movieToAdd.id)
            ? true
            : false
        );
      }
      if (ratedData.moviesList !== undefined && movieToAdd !== undefined) {
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
    async addAchievementByGenre({ dispatch, state }) {
      // ? **************** Here we will achieve if the user has watched 50 movies **************** ? //
      state.favouriteMovies.length >= 50 ? dispatch("getReward", 38) : null;
      state.watchedMovies.length >= 50 ? dispatch("getReward", 32) : null;
      state.wishListMovies.length >= 50 ? dispatch("getReward", 39) : null;
      state.ratedMovies.length >= 50 ? dispatch("getReward", 40) : null;
      // ? **************** Here we will find 50 movies by categories to get the rewards **************** ? //

      const moviesMap = new Map();
      const setArr = [
        ...new Set(
          state.favouriteMovies.concat(
            state.watchedMovies,
            state.wishListMovies,
            state.ratedMovies
          )
        ),
      ];
      const arrayMoviesIds = setArr.map((item) =>
        item.id ? item.id : item.genre_ids
      );
      console.log("All movies saved: ", arrayMoviesIds);

      const genresArr = [
        28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878,
        10770, 53, 10752, 37,
      ];

      const getGenre = (genre) => {
        let genres = {
          28: "action",
          12: "adventure",
          16: "animation",
          35: "comedy",
          80: "crime",
          99: "documentary",
          18: "drama",
          10751: "family",
          14: "fantasy",
          36: "history",
          27: "horror",
          10402: "music",
          9648: "mystery",
          10749: "romance",
          878: "scifi",
          10770: "tv",
          53: "thriller",
          10752: "war",
          37: "western",
        };
        return genres[genre];
      };

      const filterByGenre = (genre) => {
        return arrayMoviesIds.filter((movie) => {
          if (movie.genre_ids) {
            return movie.genre_ids.includes(genre);
          }
          if (movie.genres) {
            let auxGenArr = [];
            for (let genID of movie.genres) {
              auxGenArr.push(genID.id);
            }
            return auxGenArr.includes(genre);
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
        return [];
      };

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
        };
        return genres[genre];
      };

      genresArr.forEach((gen) => {
        let arr = getMoviesByGenre(gen);
        arr.length >= 50
          ? dispatch("getReward", getRewardByGenre(gen))
          : console.log(
              `Genre ${getGenre(gen).toUpperCase()} need ${
                50 - arr.length
              } more movies to get the reward`
            );
      });
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

      const arrayMoviesIds = setArr.map((item) =>
        item.id ? item.id : item.genre_ids
      );
      console.log("Unique array: ", arrayMoviesIds);

      // TODO: continuar
      const checker = (arr, myMoviesArr) => {
        return arr.every((id) => myMoviesArr.includes(id));
      };

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
      ];

      const LOTR_HOBBIT_MOVIES = [
        120, // LOTR: The Fellowship of the Ring
        121, // LOTR: The Two Towers
        122, // LOTR: The Return of the King
        49051, // LOTR: The Hobbit: An Unexpected Journey
        57158, // LOTR: The Hobbit: The Desolation of Smaug
        122917, // LOTR: The Hobbit: The Battle of the Five Armies
      ];

      const HARRY_POTTER_MOVIES = [
        671, // Harry Potter and the Philosopher's Stone
        672, // Harry Potter and the Chamber of Secrets
        673, // Harry Potter and the Prisoner of Azkaban
        674, // Harry Potter and the Goblet of Fire
        675, // Harry Potter and the Order of the Phoenix
        767, // Harry Potter and the Half-Blood Prince
        12444, // Harry Potter and the Deathly Hallows PT.1
        12445, // Harry Potter and the Deathly Hallows PT.2
      ];

      const BLADE_RUNNER_MOVIE = [
        78, // Blade Runner
      ];

      const KILL_BILL_MOVIES = [
        24, // Kill Bill: Volume 1
        393, // Kill Bill: Volume 2
      ];

      const GODFATHER_MOVIE = [
        238, // The Godfather
      ];

      console.log(
        "Checking Star Wars: ",
        checker(STARWARS_MOVIES, arrayMoviesIds)
      );
      console.log(
        "Checking LOTR: ",
        checker(LOTR_HOBBIT_MOVIES, arrayMoviesIds)
      );
      console.log(
        "Checking Harry Potter: ",
        checker(HARRY_POTTER_MOVIES, arrayMoviesIds)
      );
      console.log(
        "Checking Blade Runner: ",
        checker(BLADE_RUNNER_MOVIE, arrayMoviesIds)
      );
      console.log(
        "Checking Kill Bill: ",
        checker(KILL_BILL_MOVIES, arrayMoviesIds)
      );
      console.log(
        "Checking Godfather: ",
        checker(GODFATHER_MOVIE, arrayMoviesIds)
      );

      checker(STARWARS_MOVIES, arrayMoviesIds)
        ? dispatch("getReward", 6)
        : null;
      checker(LOTR_HOBBIT_MOVIES, arrayMoviesIds)
        ? dispatch("getReward", 7)
        : null;
      checker(HARRY_POTTER_MOVIES, arrayMoviesIds)
        ? dispatch("getReward", 8)
        : null;
      checker(BLADE_RUNNER_MOVIE, arrayMoviesIds)
        ? dispatch("getReward", 9)
        : null;
      checker(KILL_BILL_MOVIES, arrayMoviesIds)
        ? dispatch("getReward", 10)
        : null;
      checker(GODFATHER_MOVIE, arrayMoviesIds)
        ? dispatch("getReward", 11)
        : null;
    },
    async getGettedAchievements({ commit }, lang) {
      const MY_DOC_ID = localStorage.getItem("docID");
      // ? First, we get all achievements on the database
      const REWARDS_REF = await db
        .doc(`Achievements/${lang}`)
        .get("list");
      const ALL_REWARDS_ARRAY = REWARDS_REF.data();
      let ALL_ACHIEVEMENTS = [];
      if (ALL_REWARDS_ARRAY.length) {
        ALL_ACHIEVEMENTS = ALL_REWARDS_ARRAY.list
      }

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
      console.log("Visited sections: ", visitedSections);
      if (visitedSections.length < 11) {
        const MY_DOC_ID = localStorage.getItem("docID");
        const VISITED_SECTIONS_FB = await db
          .doc(`userData/${MY_DOC_ID}/iMovies-Sections/sections`)
          .get("visited");
        const VISITED_ARR = VISITED_SECTIONS_FB.data();
        commit("setVisitedSections", VISITED_ARR.visited);
      }
      if (visitedSections.length === 12) {
        this.dispatch("getReward", 31);
      }
    },
    // ? -----  FRIENDSHIP ACTIONS ----- //
    async getFriendshipNotification({ commit, state, dispatch }) {
      let notifications = [];
      let usersData = [];

      await db
        .collection("userData")
        .doc(state.myDocID)
        .collection("mySocialRequests")
        .doc("received")
        .onSnapshot((doc) => {
          // ! Real time database listener
          let data = doc.data();
          let receivedList = data.receivedList;

          for (let req of receivedList) {
            // ? Here we are looping through the DocIDs users
            usersData.push(req);
            notifications.push({
              icon: "mdi-account",
              title: "Tienes una nueva solicitud de amistad",
              isRead: false,
            });
          }

          commit("setNotifications", notifications);
          commit("setMyFriendshipRequests", usersData);
          dispatch("getMyFriendshipData");
        });

      await db
        .collection("userData")
        .doc(state.myDocID)
        .collection("mySocialRequests")
        .doc("accepted")
        .onSnapshot((doc) => {
          // ! Real time database listener
          let data = doc.data();
          let acceptedList = data.acceptedList;

          for (let req of acceptedList) {
            // ? Here we are looping through the DocIDs users
            notifications.push({
              icon: "mdi-account",
              avatar: req.avatar,
              title: `El usuario ${req.userName} es ahora amigo tuyo`,
              isRead: false,
            });
          }

          commit("setNotifications", notifications);
          dispatch("getMyFriendshipData");
        });

      await db
        .collection("userData")
        .doc(state.myDocID)
        .collection("mySocialRequests")
        .doc("rejected")
        .onSnapshot((doc) => {
          // ! Real time database listener
          dispatch("getMyFriendshipData");
        });
    },
    async rejectFriendshipRequest({ commit, rootState, dispatch }, userData) {
      commit("setIsLoading", true);
      // ? IN MY DATA, I WILL REMOVE THE DOCID AND MOVE IT TO ACCEPTED
      let MY_RECEIVED_REF = await db.doc(
        `userData/${rootState.myDocID}/mySocialRequests/received`
      );
      let MY_REJECTED_REF = await db.doc(
        `userData/${rootState.myDocID}/mySocialRequests/rejected`
      );
      MY_RECEIVED_REF.update({
        receivedList: firebase.firestore.FieldValue.arrayRemove(userData),
      });
      MY_REJECTED_REF.update({
        rejectedList: firebase.firestore.FieldValue.arrayUnion(userData),
      });

      // ? IN THE OTHER USER, I WILL REMOVE THE DOCID AND MOVE IT TO ACCEPTED
      let USER_SENDED_REF = await db.doc(
        `userData/${userData.docID}/mySocialRequests/sended`
      );
      let USER_REJECTED_REF = await db.doc(
        `userData/${userData.docID}/mySocialRequests/rejected`
      );
      USER_SENDED_REF.update({
        sendedList: firebase.firestore.FieldValue.arrayRemove(
          rootState.mySocialData
        ),
      });
      USER_REJECTED_REF.update({
        rejectedList: firebase.firestore.FieldValue.arrayUnion(
          rootState.mySocialData
        ),
      });

      dispatch("getFriendshipNotification");
      dispatch("getAllMyFriends");

      setTimeout(() => {
        let filteredArr = rootState.myFriendshipRequests.filter(
          (user) => user.docID !== userData.docID
        );
        commit("setMyFriendshipRequests", filteredArr);
      }, 500);
    },
    // ? ----- CHAT ACTIONS ----- //
    async getAllMyMessages({ rootState }) {
      await db
        .collection("userData")
        .doc(rootState.myDocID)
        .collection("messages")
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            rootState.chatRooms[doc.id] = doc.data();
          });
        });
    },
    async createMessage(
      { rootState },
      { message: message, docID: docID, avatar: avatar }
    ) {
      const MY_MESSAGES_REF = await db.doc(
        `userData/${rootState.myDocID}/messages/${docID}`
      );

      let obj = {
        avatar: avatar,
        userId: rootState.user.uid,
        docID: rootState.myDocID,
        userName: rootState.user.displayName,
        message,
        createdAt: Date.now(),
      };
      MY_MESSAGES_REF.update({
        read: false,
        messagesList: firebase.firestore.FieldValue.arrayUnion(obj),
      });

      const USER_MESSAGES_REF = await db.doc(
        `userData/${docID}/messages/${rootState.myDocID}`
      );
      USER_MESSAGES_REF.update({
        read: false,
        messagesList: firebase.firestore.FieldValue.arrayUnion(obj),
      });
    },
    async hasReadTheMessage({ rootState }, docID) {
      const MY_MESSAGES_REF = await db.doc(
        `userData/${rootState.myDocID}/messages/${docID}`
      );
      MY_MESSAGES_REF.update({
        read: true,
      });
    },
    async generateChatRooms({ commit, rootState }) {
      let chatRoom = {};
      for (let friend of rootState.myFriendsList) {
        chatRoom[friend.docID] = {
          read: false,
          messagesList: [],
        };
      }
      commit("setChatRooms", chatRoom);
    },
    async createChatRoom({ rootState }, docID) {
      const MY_MESSAGES_REF = await db
        .doc(`userData/${rootState.myDocID}/messages/${docID}`)
        .get();
      const MY_FRIEND_REF = await db
        .doc(`userData/${docID}/messages/${rootState.myDocID}`)
        .get();

      const MY_MESSAGES_DATA = MY_MESSAGES_REF.data();
      const MY_FRIEND_DATA = MY_FRIEND_REF.data();

      if (!MY_MESSAGES_DATA || !MY_FRIEND_DATA) {
        await db.doc(`userData/${rootState.myDocID}/messages/${docID}`).set({
          read: false,
          messagesList: [],
        });
        await db.doc(`userData/${docID}/messages/${rootState.myDocID}`).set({
          read: false,
          messagesList: [],
        });
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
                  if (type === "ofTheWeek") {
                    commit("setTrailerOfTheWeekVideo", VIDEO_YOUTUBE);
                  }
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
      let castingArr = [];

      await axios
        .get(CALL_URL)
        .then((resp) => {
          const CALL_URL_CAST = `${URL}/movie/${id}/credits?api_key=${APIKEY}&language=${LANGUAGE}&include_adult=false`;
          axios
            .get(CALL_URL_CAST)
            .then((resp) => {
              for (let data of resp.data.cast) {
                castingArr.push({
                  name: data.name,
                  character: data.character,
                });
              }
            })
            .catch((e) => {
              console.log(e);
            });
          let movieDetails = {
            ...resp.data,
            cast: castingArr,
          };
          commit("setMovieDetails", movieDetails);
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
    myDocID: (state) => state.myDocID,
    counterMovies: (state) => state.counterMovies,
    userPoints: (state) => state.userPoints,
    questionID: (state) => state.questionID,
    achievementsCards: (state) => state.achievementsCards,
    visitedSections: (state) => state.visitedSections,
  },
});

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
    myDocID: localStorage.getItem("docID"),
    imageURL: "https://image.tmdb.org/t/p/original",
    user: {},
    userData: {},
    documentId: "",
    loadingUserAuthStatus: false,
    userID: null,
    isLogged: false,
    isLoadingDynamicUserData: false,
    isLoading: false,
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
    chatIsActivated: true,
    isChatting: false,
    showingFriends: false,
    messages: [],
    messagesListener: () => {},
    notificationsListener: () => {},
    allUsersData: [],
    allFriendshipRequestsData: [],
    myFriends: {
      accepted: [],
      rejected: [],
      sended: [],
    },
    myFriendsList: [],
    hasNotifications: false,
    notifications: [],
  },
  mutations: {
    async setUser(state, payload) {
      state.user = payload;
      const COLLECTION = await db.collection("userData").get();
      COLLECTION.forEach((doc) => {
        if (doc.data().userID === payload.uid) {
          state.documentId = doc.data().docID;
          localStorage.setItem("docID", doc.data().docID);
        }
      });
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
    setChatIsActivated(state, payload) {
      state.chatIsActivated = payload;
    },
    setIsChatting(state, payload) {
      state.isChatting = payload;
    },
    setIsShowingFriends(state, payload) {
      state.showingFriends = payload;
    },
    setMessages(state, payload) {
      state.messages = payload;
    },
    setMessagesListener(state, listener) {
      listener ? (state.listener = listener) : state.messagesListener();
    },
    setAllUsersData(state, payload) {
      state.allUsersData = payload;
    },
    setAllFriendshipRequestsData(state, payload) {
      state.allFriendshipRequestsData = payload;
    },
    setMyFriendshipData(state, payload) {
      state.myFriends = payload;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    setHasNotifications(state, payload) {
      state.hasNotifications = payload;
    },
    setNotificationsListener(state, listener) {
      listener ? (state.listener = listener) : state.notificationsListener();
    },
    setNotifications(state, payload) {
      state.notifications = payload;
    },
    setMyFriendslist(state, payload) {
      state.myFriendsList = payload;
    }
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
        if (user) {
          commit("setAuthStatus", true);
          commit("setLoadingUserAuthStatus", false);
        } else {
          commit("setAuthStatus", false);
          commit("setMessages", []);
          commit("setMessagesListener", () => {});
          commit("setLoadingUserAuthStatus", false);
        }
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
    async getAllUsers({ commit, state }) {
      // ? ----- GET ALL USERS ----- //
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
              userData,
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
          commit(
            "setAllUsersData",
            arr.filter((user) => user.userData.userID !== state.user.uid)
          );
          commit("setIsLoading", false);
        });
    },
    async getAllMyFriends({ commit, state}) {
      let myAcceptedData = state.myFriends.accepted;
      let arr = []

      console.log('Getting all my friends list...', myAcceptedData)

      for (let doc of myAcceptedData) {
        const FRIEND_favourite_MOVIES = await db
        .doc(`userData/${doc}/myMovies/favouriteMovies`)
        .get("moviesList");
      const FRIEND_watched_MOVIES = await db
        .doc(`userData/${doc}/myMovies/watchedMovies`)
        .get("moviesList");
      const FRIEND_wishList_MOVIES = await db
        .doc(`userData/${doc}/myMovies/wishListMovies`)
        .get("moviesList");
      const FRIEND_rated_MOVIES = await db
        .doc(`userData/${doc}/myMovies/ratedMovies`)
        .get("moviesList");

      const favouriteData = FRIEND_favourite_MOVIES.data();
      const watchedData = FRIEND_watched_MOVIES.data();
      const wishListData = FRIEND_wishList_MOVIES.data();
      const ratedData = FRIEND_rated_MOVIES.data();
        let ref = await db.doc(`userData/${doc}`).get();
        let data = ref.data()
        arr.push({
          userName: data.userName,
          avatar: data.avatar,
          docID: doc,
          userMovies: {
            total: favouriteData.moviesList.length + watchedData.moviesList.length + wishListData.moviesList.length + ratedData.moviesList.length,
            favourites: favouriteData.moviesList.length,
            watched: watchedData.moviesList.length,
            wishlist: wishListData.moviesList.length,
            rated: ratedData.moviesList.length
          }
        })
        console.log(arr)
        commit('setMyFriendslist', arr);
      }
    },
    async sendFriendRequest({ commit, state }, docID) {
      let MY_SENDED_DOC_REF = await db.doc(
        `userData/${state.myDocID}/myFriends/sended`
      );
      MY_SENDED_DOC_REF.update({
        sendedList: firebase.firestore.FieldValue.arrayUnion(docID),
      });
      let USER_REQUEST_INBOX_REF = await db.doc(
        `userData/${docID}/myFriends/requestInbox`
      );
      USER_REQUEST_INBOX_REF.update({
        requestsList: firebase.firestore.FieldValue.arrayUnion(state.myDocID),
      });
    },
    async getMyFriendshipData({ commit, state, dispatch }) {
      const MY_SENDED_REF = await db
        .doc(`userData/${state.myDocID}/myFriends/sended`)
        .get("sendedList");
      const MY_ACCEPTED_REF = await db
        .doc(`userData/${state.myDocID}/myFriends/accepted`)
        .get("acceptedList");
      const MY_REJECTED_REF = await db
        .doc(`userData/${state.myDocID}/myFriends/rejected`)
        .get("rejectedList");

      const SENDED_DATA = MY_SENDED_REF.data();
      const ACCEPTED_DATA = MY_ACCEPTED_REF.data();
      const REJECTED_DATA = MY_REJECTED_REF.data();

      commit("setMyFriendshipData", {
        sended: SENDED_DATA.sendedList,
        accepted: ACCEPTED_DATA.acceptedList,
        rejected: REJECTED_DATA.rejectedList,
      });

      dispatch("getAllMyFriends")
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
    async getStoragedMovies({ commit, state }, { movieToAdd }) {
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
    },
    async getAllFriendshipData({ commit }, docsArray) {
      let arrayData = []
      for (let docID of docsArray) {
        let userRef = await db
        .doc(
          `userData/${docID}`
        )
        .get()

        let userData = userRef.data()

        arrayData.push({
          avatar: userData.avatar,
          docID: userData.docID,
          userName: userData.userName
        })

        commit('setAllFriendshipRequestsData', arrayData)
      }
    },
    // ? -----  FRIENDSHIP ACTIONS ----- //
    async getFriendshipNotification({ commit, state, dispatch }) {
      let notifications = [];
      let usersData = [];

      await db
        .collection("userData")
        .doc(state.myDocID)
        .collection("myFriends")
        .doc("requestInbox")
        .onSnapshot((doc) => {
          // ! Real time database listener
          let data = doc.data();
          let requestsList = data.requestsList;
          for (let req of requestsList) {
            // ? Here we are looping through the DocIDs users
            usersData.push(req);
            notifications.push({
              icon: "mdi-account",
              title: "Tienes una nueva solicitud de amistad",
              isRead: false,
            });
          }

          if (usersData.length) {
            dispatch('getAllFriendshipData', usersData)
          }
        });

      commit("setNotifications", notifications);
    },
    async acceptFriendshipRequest({ commit, state, dispatch }, docID) {

      // ? IN MY DATA, I WILL REMOVE THE DOCID AND MOVE IT TO ACCEPTED
      let MY_REQUEST_INBOX_REF = await db.doc(
        `userData/${state.myDocID}/myFriends/requestInbox`
      );
      let MY_ACCEPTED_REF = await db.doc(
        `userData/${state.myDocID}/myFriends/accepted`
      );
      MY_REQUEST_INBOX_REF.update({
        requestsList: firebase.firestore.FieldValue.arrayRemove(docID), // ? I received the request from the other user
      });
      MY_ACCEPTED_REF.update({
        acceptedList: firebase.firestore.FieldValue.arrayUnion(docID),
      });

      // ? IN THE OTHER USER, I WILL REMOVE THE DOCID AND MOVE IT TO ACCEPTED
      let USER_SENDED_REF = await db.doc(
        `userData/${docID}/myFriends/sended`
      );
      let USER_ACCEPTED_REF = await db.doc(
        `userData/${docID}/myFriends/accepted`
      );
      USER_SENDED_REF.update({
        sendedList: firebase.firestore.FieldValue.arrayRemove(state.myDocID), // ? The other user sended the request
      });
      USER_ACCEPTED_REF.update({
        acceptedList: firebase.firestore.FieldValue.arrayUnion(state.myDocID),
      });

      dispatch('getMyFriendshipData');
      dispatch('getAllMyFriends');
    },
    // ? ----- CHAT ACTIONS ----- //
    async getMessages({ commit, state }) {
      const MY_MESSAGES = await db
        .collection("userData")
        .doc(state.myDocID)
        .collection("messages")
        .orderBy("createdAt", "desc")
        .onSnapshot(doSnapShot); // ! Real time database listener

      commit("setMessagesListener", MY_MESSAGES);

      const doSnapShot = (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
          let message = doc.data();
          message.id = doc.id;
          messages.unshift(message);
        });

        commit("setMessages", messages);
      };
    },
    async createMessage({ rootState }, { myMessage: message, friendUid: uid }) {
      const messagesRef = await db.doc(
        `userData/${state.myDocID}/messages/${uid}`
      );

      let obj = {
        userId: rootState.user.uid,
        userName: rootState.user.displayName,
        message,
        createdAt: Date.now(),
      };
      messagesRef.update({
        messages: firebase.firestore.FieldValue.arrayUnion(obj),
      });
    },
    async createChatRoom({ rootState }, uid) {
      await db.doc(`userData/${state.myDocID}/messages/${uid}`).set({
        messages: [],
      });
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
    questionID: (state) => state.questionID,
  },
});

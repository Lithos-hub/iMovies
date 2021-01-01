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
    movieError1: "",
    movieError2: "",
    movieError3: "",
    movieError4: "",
    movieError5: "",
    movieError6: "",
    currently: [],
    trending: [],
    genre: "",
    movie1: [],
    trailer1: [],
    movie2: [],
    trailer2: [],
    movie3: [],
    trailer3: [],
    movie4: [],
    trailer4: [],
    movie5: [],
    trailer5: [],
    movie6: [],
    trailer6: [],
    moviesByYear: [],
    movieDetails: [],


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
    setCurrently(state, payload) {
      state.currently = payload;
    },
    setTrending(state, payload) {
      state.trending = payload;
    },
    setTrailer1(state, payload) {
      state.trailer1 = payload;
    },
    setTrailer2(state, payload) {
      state.trailer2 = payload;
    },
    setTrailer3(state, payload) {
      state.trailer3 = payload;
    },
    setTrailer4(state, payload) {
      state.trailer4 = payload;
    },
    setTrailer5(state, payload) {
      state.trailer5 = payload;
    },
    setTrailer6(state, payload) {
      state.trailer6 = payload;
    },
    setMovie1(state, payload) {
      state.movie1 = payload;
    },
    setMovie2(state, payload) {
      state.movie2 = payload;
    },
    setMovie3(state, payload) {
      state.movie3 = payload;
    },
    setMovie4(state, payload) {
      state.movie4 = payload;
    },
    setMovie5(state, payload) {
      state.movie5 = payload;
    },
    setMovie6(state, payload) {
      state.movie6 = payload;
    },
    setMoviesByYear(state, payload) {
      state.moviesByYear = payload;
    },
    setMovieError1(state, payload) {
      state.movieError1 = payload;
    },
    setMovieError2(state, payload) {
      state.movieError2 = payload;
    },
    setMovieError3(state, payload) {
      state.movieError3 = payload;
    },
    setMovieError4(state, payload) {
      state.movieError4 = payload;
    },
    setMovieError5(state, payload) {
      state.movieError5 = payload;
    },
    setMovieError6(state, payload) {
      state.movieError6 = payload;
    },
    setMovieDetails(state, payload) {
      state.MovieDetails = payload
    }

  },
  actions: {
        // **************************** CURRENT MOVIES **************************** //
    getCurrentlyMovies({commit}) {

      const apiurl = `${url}/discover/movie?year=${current_year}&api_key=${apikey}`;
      
      return new Promise((resolve) => {
        
        axios
        .get(apiurl)
        .then((resp) => {
          commit("setCurrently", resp.data.results)
        })
        .catch((e) => {
          console.info(e);
          commit('loadingError', "The answer is taking too long. There may have been an error with the database. Please reload the website.")
        });
      })
    },
    // **************************** TRENDING **************************** //
    getTrending({commit}) {

      const fromDate = new Date();
      const toDate = new Date();
  
      //  *********** CHANGE THIS *********** //
      const dateGreaterThan = `2020-${ ('0' + (fromDate.getMonth() + 1 )).slice(-2) }-${ ('0' + ( fromDate.getDate() - 13)).slice(-2) }`;
      const dateLessThan = `${ toDate.getFullYear() }-${ ('0' + (toDate.getMonth() + 1 )).slice(-2) }-${ ('0' + ( toDate.getDate())).slice(-2) }`;
      
      // ********************* Filter: note average of 7 or greater; English language; popularity desc; release time = 2 weeks ago ----------------------- //
      const apiurl = `${url}/discover/movie?primary_release_date.gte=${ dateGreaterThan }&primary_release_date.lte=${ dateLessThan }&api_key=${apikey}&vote_average.gte=7&language=en-EN&sort_by=popularity.desc&include_video=true`;

      return new Promise((resolve) => {
 
        axios
        .get(apiurl)
        .then((resp) => {
            commit("setTrending", resp.data.results)
            console.log(resp.data.results)
          })
          .catch((e) => {
            console.info(e);
            commit('loadingError', "The answer is taking too long. There may have been an error with the database. Please reload the website.")
          });
      })
    },
    getTrailers({commit}) {
      const fromDate = new Date();
      const toDate = new Date();
  
      const dateGreaterThan = `2020-${ ('0' + (fromDate.getMonth() + 1 )).slice(-2) }-${ ('0' + ( fromDate.getDate() - 13)).slice(-2) }`;
      const dateLessThan = `${ toDate.getFullYear() }-${ ('0' + (toDate.getMonth() + 1 )).slice(-2) }-${ ('0' + ( toDate.getDate())).slice(-2) }`;
      
      // ********************* Filter: note average of 7 or greater; English language; popularity desc; release time = 2 weeks ago ----------------------- //
      const latestMovies = `${url}/discover/movie?primary_release_date.gte=${ dateGreaterThan }&primary_release_date.lte=${ dateLessThan }&api_key=${apikey}&vote_average.gte=6&language=en-EN&sort_by=popularity.desc&include_video=true`;

      return new Promise((resolve) => {
        axios
          .get(latestMovies)
          .then((resp) => {
            
            commit("setMovie1", resp.data.results[0])
            commit("setMovie2", resp.data.results[1])
            commit("setMovie3", resp.data.results[2])
            commit("setMovie4", resp.data.results[3])
            commit("setMovie5", resp.data.results[4])
            commit("setMovie6", resp.data.results[5])
            
            const ID_1 = resp.data.results[0].id;
            const ID_2 = resp.data.results[1].id;
            const ID_3 = resp.data.results[2].id;
            const ID_4 = resp.data.results[3].id;
            const ID_5 = resp.data.results[4].id;
            const ID_6 = resp.data.results[5].id;


            const movieURL1 = `https://api.themoviedb.org/3/movie/${ID_1}/videos?api_key=${apikey}&language=en-US`;
            const movieURL2 = `https://api.themoviedb.org/3/movie/${ID_2}/videos?api_key=${apikey}&language=en-US`;
            const movieURL3 = `https://api.themoviedb.org/3/movie/${ID_3}/videos?api_key=${apikey}&language=en-US`;
            const movieURL4 = `https://api.themoviedb.org/3/movie/${ID_4}/videos?api_key=${apikey}&language=en-US`;
            const movieURL5 = `https://api.themoviedb.org/3/movie/${ID_5}/videos?api_key=${apikey}&language=en-US`;
            const movieURL6 = `https://api.themoviedb.org/3/movie/${ID_6}/videos?api_key=${apikey}&language=en-US`;
  
            
            axios
            .get(movieURL1)  
            .then((resp) => {
                let videoKey = resp.data.results[0].key;
                let video1 = "https://www.youtube.com/embed/" + videoKey;
                commit("setTrailer1", video1)
              })
              .catch((e) => {
                console.log("Trailer movie 1 " + e);
                commit("setMovieError1", "Sorry. This video is no available.");
                 
              });
            axios
              .get(movieURL2)
              .then((resp) => {
                let videoKey = resp.data.results[0].key;              
                let video2 = "https://www.youtube.com/embed/" + videoKey;
                commit("setTrailer2", video2)
              })
              .catch((e) => {
                console.log("Trailer movie 2 " + e);
                commit("setMovieError2", "Sorry. This video is no available.");
              });
            axios
              .get(movieURL3)
              .then((resp) => {
                let videoKey = resp.data.results[0].key;              
                let video3 = "https://www.youtube.com/embed/" + videoKey;
                commit("setTrailer3", video3)
              })
              .catch((e) => {
                console.log("Trailer movie 3 " + e);      
                  commit("setMovieError3", "Sorry. This video is no available.");
              });
            axios
              .get(movieURL4)
              .then((resp) => {
                let videoKey = resp.data.results[0].key;              
                let video4 = "https://www.youtube.com/embed/" + videoKey;
                commit("setTrailer4", video4)        
              })
              .catch((e) => {
                console.log("Trailer movie 4 " + e);    
                  commit("setMovieError4", "Sorry. This video is no available.");
              });
            axios
              .get(movieURL5)
              .then((resp) => {
                let videoKey = resp.data.results[0].key;              
                let video5 = "https://www.youtube.com/embed/" + videoKey;
                commit("setTrailer5", video5)
              })
              .catch((e) => {
                console.log("Trailer movie 5 " + e);
                  commit("setMovieError5", "Sorry. This video is no available.");
              });
            axios
              .get(movieURL6)
              .then((resp) => {
                let videoKey = resp.data.results[0].key;              
                let video6 = "https://www.youtube.com/embed/" + videoKey;
                commit("setTrailer6", video6)
              })
              .catch((e) => {
                console.log("Trailer movie 6 " + e);
                  commit("setMovieError6", "Sorry. This video is no available.");
              });
          })
          .catch((e) => {
            console.info("Global trailer errors: " + e);
          });
    
      });
    },
  getMoviesByYear({commit}) {
    const year = "";
    const movies2020 = `${url}/discover/movie?year=${year}&api_key=${apikey}&sort_by=popularity.desc&page=1`;
    
    return new Promise((resolve) => {
      axios
      .get(movies2020)
      .then((resp) => {
        commit("setMoviesByYear", resp.data.results)
      })
      .catch((e) => {
        console.info(e);
        commit('loadingError', "The answer is taking too long. There may have been an error with the database. Please reload the website.")
      });
    })
  },
  },
  modules: {
  }
})


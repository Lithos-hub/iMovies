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
    movies2010: [],
    movies2011: [],
    movies2012: [],
    movies2013: [],
    movies2014: [],
    movies2015: [],
    movies2016: [],
    movies2017: [],
    movies2018: [],
    movies2019: [],
    movies2020: [],
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
    setAction(state, payload) {
      state.action = payload;
      state.genre = "Action";
    },
    setAdventure(state, payload) {
      state.adventure = payload;
            state.genre = "Adventure";
    },
    setAnimation(state, payload) {
      state.animation = payload;
            state.genre = "Animation / Animes";
    },
    setComedy(state, payload) {
      state.comedy = payload;
            state.genre = "Comedy";
    },
    setCrime(state, payload) {
      state.crime = payload;
            state.genre = "Crime / Noir";
    },
    setDocumentary(state, payload) {
      state.documentary = payload;
            state.genre = "Documentaries";
    },
    setDramatic(state, payload) {
      state.dramatic = payload;
            state.genre = "Dramatic";
    },
    setFantasy(state, payload) {
      state.fantasy = payload;
            state.genre = "Fantasy";
    },
    setHistory(state, payload) {
      state.history = payload;
            state.genre = "Historic movies";
    },
    setHorror(state, payload) {
      state.horror = payload;
            state.genre = "Horror";
    },
    setMusical(state, payload) {
      state.musical = payload;
            state.genre = "Musical";
    },
    setRomantic(state, payload) {
      state.romantic = payload;
            state.genre = "Romantic";
    },
    setScifi(state, payload) {
      state.scifi = payload;
            state.genre = "Sci-fi";
    },
    setThriller(state, payload) {
      state.thriller = payload;
            state.genre = "Thrillers";
    },
    setWar(state, payload) {
      state.war = payload;
            state.genre = "War Movies";
    },
    setWestern(state, payload) {
      state.western = payload;
            state.genre = "Westerns";
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
    setMovies2010(state, payload) {
      state.movies2010 = payload;
    },
    setMovies2011(state, payload) {
      state.movies2011 = payload;
    },
    setMovies2012(state, payload) {
      state.movies2012 = payload;
    },
    setMovies2013(state, payload) {
      state.movies2013 = payload;
    },
    setMovies2014(state, payload) {
      state.movies2014 = payload;
    },
    setMovies2015(state, payload) {
      state.movies2015 = payload;
    },
    setMovies2016(state, payload) {
      state.movies2016 = payload;
    },
    setMovies2017(state, payload) {
      state.movies2017 = payload;
    },
    setMovies2018(state, payload) {
      state.movies2018 = payload;
    },
    setMovies2019(state, payload) {
      state.movies2019 = payload;
    },
    setMovies2020(state, payload) {
      state.movies2020 = payload;
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
  
      const dateGreaterThan = `${ fromDate.getFullYear() }-${ ('0' + (fromDate.getMonth() + 1 )).slice(-2) }-${ ('0' + ( fromDate.getDate() - 13)).slice(-2) }`;
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
  
      const dateGreaterThan = `${ fromDate.getFullYear() }-${ ('0' + (fromDate.getMonth() + 1 )).slice(-2) }-${ ('0' + ( fromDate.getDate() - 13)).slice(-2) }`;
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
            // const ID_7 = resp.data.results[6].id;
            // const ID_8 = resp.data.results[7].id;
            // const ID_9 = resp.data.results[8].id;
            // const ID_10 = resp.data.results[9].id;
            // const ID_11 = resp.data.results[10].id;
            // const ID_12 = resp.data.results[11].id;
            // const ID_13 = resp.data.results[12].id;
            // const ID_14 = resp.data.results[13].id;
            // const ID_15 = resp.data.results[14].id;
            // const ID_16 = resp.data.results[15].id;
            // const ID_17 = resp.data.results[16].id;
            // const ID_18 = resp.data.results[17].id;
            // const ID_19 = resp.data.results[18].id;
            // const ID_20 = resp.data.results[19].id;

            
            // MOVIES HAVE BEEN SAVED IN MOVIES2020 ARRAY
            // WE NEED THE ID OF EACH MOVIE IN ORDER TO GET THE YOUTUBE KEY OF THEM

            const movieURL1 = `https://api.themoviedb.org/3/movie/${ID_1}/videos?api_key=${apikey}&language=en-US`;
            const movieURL2 = `https://api.themoviedb.org/3/movie/${ID_2}/videos?api_key=${apikey}&language=en-US`;
            const movieURL3 = `https://api.themoviedb.org/3/movie/${ID_3}/videos?api_key=${apikey}&language=en-US`;
            const movieURL4 = `https://api.themoviedb.org/3/movie/${ID_4}/videos?api_key=${apikey}&language=en-US`;
            const movieURL5 = `https://api.themoviedb.org/3/movie/${ID_5}/videos?api_key=${apikey}&language=en-US`;
            const movieURL6 = `https://api.themoviedb.org/3/movie/${ID_6}/videos?api_key=${apikey}&language=en-US`;
            // const movieURL7 = `https://api.themoviedb.org/3/movie/${ID_7}/videos?api_key=${apikey}&language=en-US`;
            // const movieURL8 = `https://api.themoviedb.org/3/movie/${ID_8}/videos?api_key=${apikey}&language=en-US`;
            // const movieURL9 = `https://api.themoviedb.org/3/movie/${ID_9}/videos?api_key=${apikey}&language=en-US`;
            // const movieURL10 = `https://api.themoviedb.org/3/movie/${ID_10}/videos?api_key=${apikey}&language=en-US`;
            // const movieURL11 = `https://api.themoviedb.org/3/movie/${ID_11}/videos?api_key=${apikey}&language=en-US`;
            // const movieURL12 = `https://api.themoviedb.org/3/movie/${ID_12}/videos?api_key=${apikey}&language=en-US`;
            // const movieURL13 = `https://api.themoviedb.org/3/movie/${ID_13}/videos?api_key=${apikey}&language=en-US`;
            // const movieURL14 = `https://api.themoviedb.org/3/movie/${ID_14}/videos?api_key=${apikey}&language=en-US`;
            // const movieURL15 = `https://api.themoviedb.org/3/movie/${ID_15}/videos?api_key=${apikey}&language=en-US`;
            // const movieURL16 = `https://api.themoviedb.org/3/movie/${ID_16}/videos?api_key=${apikey}&language=en-US`;
            // const movieURL17 = `https://api.themoviedb.org/3/movie/${ID_17}/videos?api_key=${apikey}&language=en-US`;
            // const movieURL18 = `https://api.themoviedb.org/3/movie/${ID_18}/videos?api_key=${apikey}&language=en-US`;
            // const movieURL19 = `https://api.themoviedb.org/3/movie/${ID_19}/videos?api_key=${apikey}&language=en-US`;
            // const movieURL20 = `https://api.themoviedb.org/3/movie/${ID_20}/videos?api_key=${apikey}&language=en-US`;

            // WE CALL AGAIN TO THE MOVIEDB API TO GET EACH YOUTUBE FULL LINK, AND THEN, WE'LL GOING TO PUSH THEM INTO THE videosURL ARRAY
            // I'M SORRY ABOUT THE CODE REPEAT, BUT I DON'T KNOW HOW IT COULD BE DONE BY ANOTHER WAY. WE HAVE TO CALL THE API EACH TIME WE WANT TO GET EACH VIDEO URL
           
            
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
            // axios
            //   .get(movieURL7)
            //   .then((resp) => {
            //     let videoKey = resp.data.results[0].key;              
            //     let video7 = "https://www.youtube.com/embed/" + videoKey;
            //     commit("setTrailer", video7)
            //   })
            //   .catch((e) => {
            //     console.info(e);
            //     this.messageError = "Video no available";
            //     console.log(this.messageError);
            //   });
            // axios
            //   .get(movieURL8)
            //   .then((resp) => {
            //     let videoKey = resp.data.results[0].key;              
            //     let video8 = "https://www.youtube.com/embed/" + videoKey;
            //     commit("setTrailer", video8)
            //   })
            //   .catch((e) => {
            //     console.info(e);
            //     this.messageError = "Video no available";
            //     console.log(this.messageError);
            //   });
            //   // axios
            //   // .get(movieURL9)
            //   // .then((resp) => {
            //   //   let videoKey = resp.data.results[0].key;              
            //   //   let video9 = "https://www.youtube.com/embed/" + videoKey;
            //   //   commit("setTrailer", video9)
            //   // })
            //   // .catch((e) => {
            //   //   console.info(e);
            //   //   this.messageError = "Video no available";
            //   //   console.log(this.messageError);
            //   // });
            // axios
            //   .get(movieURL10)
            //   .then((resp) => {
            //     let videoKey = resp.data.results[0].key;              
            //     let video10 = "https://www.youtube.com/embed/" + videoKey;
            //     commit("setTrailer", video10)
            //   })
            //   .catch((e) => {
            //     console.info(e);
            //     this.messageError = "Video no available";
            //     console.log(this.messageError);
            //   });
            // axios
            //   .get(movieURL11)
            //   .then((resp) => {
            //     let videoKey = resp.data.results[0].key;              
            //     let video11 = "https://www.youtube.com/embed/" + videoKey;
            //     commit("setTrailer", video11)
            //   })
            //   .catch((e) => {
            //     console.info(e);
            //     this.messageError = "Video no available";
            //     console.log(this.messageError);
            //   });
            // axios
            //   .get(movieURL12)
            //   .then((resp) => {
            //     let videoKey = resp.data.results[0].key;              
            //     let video12 = "https://www.youtube.com/embed/" + videoKey;
            //     commit("setTrailer", video12)
            //   })
            //   .catch((e) => {
            //     console.info(e);
            //     this.messageError = "Video no available";
            //     console.log(this.messageError);
            //   });
            // axios
            //   .get(movieURL13)
            //   .then((resp) => {
            //     let videoKey = resp.data.results[0].key;              
            //     let video13 = "https://www.youtube.com/embed/" + videoKey;
            //     commit("setTrailer", video13)
            //   })
            //   .catch((e) => {
            //     console.info(e);
            //     this.messageError = "Video no available";
            //     console.log(this.messageError);
            //   });
            // axios
            //   .get(movieURL14)
            //   .then((resp) => {
            //     let videoKey = resp.data.results[0].key;              
            //     let video14 = "https://www.youtube.com/embed/" + videoKey;
            //     commit("setTrailer", video14)
            //   })
            //   .catch((e) => {
            //     console.info(e);
            //     this.messageError = "Video no available";
            //     console.log(this.messageError);
            //   });
            // axios
            //   .get(movieURL15)
            //   .then((resp) => {
            //     let videoKey = resp.data.results[0].key;              
            //     let video15 = "https://www.youtube.com/embed/" + videoKey;
            //     commit("setTrailer", video15)
            //   })
            //   .catch((e) => {
            //     console.info(e);
            //     this.messageError = "Video no available";
            //     console.log(this.messageError);
            //   });
            // axios
            //   .get(movieURL16)
            //   .then((resp) => {
            //     let videoKey = resp.data.results[0].key;              
            //     let video16 = "https://www.youtube.com/embed/" + videoKey;
            //     commit("setTrailer", video16)
            //   })
            //   .catch((e) => {
            //     console.info(e);
            //     this.messageError = "Video no available";
            //     console.log(this.messageError);
            //   });
            // axios
            //   .get(movieURL17)
            //   .then((resp) => {
            //     let videoKey = resp.data.results[0].key;              
            //     let video17 = "https://www.youtube.com/embed/" + videoKey;
            //     commit("setTrailer", video17)
            //   })
            //   .catch((e) => {
            //     console.info(e);
            //     this.messageError = "Video no available";
            //     console.log(this.messageError);
            //   });
            // axios
            //   .get(movieURL18)
            //   .then((resp) => {
            //     let videoKey = resp.data.results[0].key;              
            //     let video18 = "https://www.youtube.com/embed/" + videoKey;
            //     commit("setTrailer", video18)
            //   })
            //   .catch((e) => {
            //     console.info(e);
            //     this.messageError = "Video no available";
            //     console.log(this.messageError);
            //   });
            // axios
            //   .get(movieURL19)
            //   .then((resp) => {
            //     let videoKey = resp.data.results[0].key;              
            //     let video19 = "https://www.youtube.com/embed/" + videoKey;
            //     commit("setTrailer", video19)
            //   })
            //   .catch((e) => {
            //     console.info(e);
            //     this.messageError = "Video no available";
            //     console.log(this.messageError);
            //   });
            // axios
            //   .get(movieURL20)
            //   .then((resp) => {
            //     let videoKey = resp.data.results[0].key;              
            //     let video20 = "https://www.youtube.com/embed/" + videoKey;
            //     commit("setTrailer", video20)
            //   })
            //   .catch((e) => {
            //     this.messageError = "Video no available";
            //     console.log(this.messageError);
            //     console.log(e);
            //   });
          })
          .catch((e) => {
            console.info("Global trailer errors: " + e);
          });
    
      });
    },

  // **************************** RANKING MOVIES, YEARS 2010-2020 **************************** //
  getMovies2010({commit}) {
    const movies2010 = `${url}/discover/movie?year=2010&api_key=${apikey}&sort_by=popularity.desc&page=1`;
    
    return new Promise((resolve) => {
      axios
      .get(movies2010)
      .then((resp) => {
        commit("setMovies2010", resp.data.results)
      })
      .catch((e) => {
        console.info(e);
        commit('loadingError', "The answer is taking too long. There may have been an error with the database. Please reload the website.")
      });
    })
  },
  getMovies2011({commit}) {
    const movies2011 = `${url}/discover/movie?year=2011&api_key=${apikey}&sort_by=popularity.desc&page=1`;
    
    return new Promise((resolve) => {
      axios
      .get(movies2011)
      .then((resp) => {
        commit("setMovies2011", resp.data.results)
      })
      .catch((e) => {
        console.info(e);
        commit('loadingError', "The answer is taking too long. There may have been an error with the database. Please reload the website.")
      });
    })
  },
  getMovies2012({commit}) {
    const movies2012 = `${url}/discover/movie?year=2012&api_key=${apikey}&sort_by=popularity.desc&page=1`;
    
    return new Promise((resolve) => {
      axios
      .get(movies2012)
      .then((resp) => {
        commit("setMovies2012", resp.data.results)
      })
      .catch((e) => {
        console.info(e);
        commit('loadingError', "The answer is taking too long. There may have been an error with the database. Please reload the website.")
      });
    })
  },
  getMovies2013({commit}) {
    const movies2013 = `${url}/discover/movie?year=2013&api_key=${apikey}&sort_by=popularity.desc&page=1`;
    
    return new Promise((resolve) => {
      axios
      .get(movies2013)
      .then((resp) => {
        commit("setMovies2013", resp.data.results)
      })
      .catch((e) => {
        console.info(e);
        commit('loadingError', "The answer is taking too long. There may have been an error with the database. Please reload the website.")
      });
    })
  },
  getMovies2014({commit}) {
    const movies2014 = `${url}/discover/movie?year=2014&api_key=${apikey}&sort_by=popularity.desc&page=1`;
    
    return new Promise((resolve) => {
      axios
      .get(movies2014)
      .then((resp) => {
        commit("setMovies2014", resp.data.results)
      })
      .catch((e) => {
        console.info(e);
        commit('loadingError', "The answer is taking too long. There may have been an error with the database. Please reload the website.")
      });
    })
  },
  getMovies2015({commit}) {
    const movies2015 = `${url}/discover/movie?year=2015&api_key=${apikey}&sort_by=popularity.desc&page=1`;
    
    return new Promise((resolve) => {
      axios
      .get(movies2015)
      .then((resp) => {
        commit("setMovies2015", resp.data.results)
      })
      .catch((e) => {
        console.info(e);
        commit('loadingError', "The answer is taking too long. There may have been an error with the database. Please reload the website.")
      });
    })
  },
  getMovies2016({commit}) {
    const movies2016 = `${url}/discover/movie?year=2016&api_key=${apikey}&sort_by=popularity.desc&page=1`;
    
    return new Promise((resolve) => {
      axios
      .get(movies2016)
      .then((resp) => {
        commit("setMovies2016", resp.data.results)
      })
      .catch((e) => {
        console.info(e);
        commit('loadingError', "The answer is taking too long. There may have been an error with the database. Please reload the website.")
      });
    })
  },
  getMovies2017({commit}) {
    const movies2017 = `${url}/discover/movie?year=2017&api_key=${apikey}&sort_by=popularity.desc&page=1`;
    
    return new Promise((resolve) => {
      axios
      .get(movies2017)
      .then((resp) => {
        commit("setMovies2017", resp.data.results)
      })
      .catch((e) => {
        console.info(e);
        commit('loadingError', "The answer is taking too long. There may have been an error with the database. Please reload the website.")
      });
    })
  },
  getMovies2018({commit}) {
    const movies2018 = `${url}/discover/movie?year=2018&api_key=${apikey}&sort_by=popularity.desc&page=1`;
    
    return new Promise((resolve) => {
      axios
      .get(movies2018)
      .then((resp) => {
        commit("setMovies2018", resp.data.results)
      })
      .catch((e) => {
        console.info(e);
        commit('loadingError', "The answer is taking too long. There may have been an error with the database. Please reload the website.")
      });
    })
  },
  getMovies2019({commit}) {
    const movies2019 = `${url}/discover/movie?year=2019&api_key=${apikey}&sort_by=popularity.desc&page=1`;
    
    return new Promise((resolve) => {
      axios
      .get(movies2019)
      .then((resp) => {
        commit("setMovies2019", resp.data.results)
      })
      .catch((e) => {
        console.info(e);
        commit('loadingError', "The answer is taking too long. There may have been an error with the database. Please reload the website.")
      });
    })
  },
  getMovies2020({commit}) {
    const movies2020 = `${url}/discover/movie?year=2020&api_key=${apikey}&sort_by=popularity.desc&page=1`;
    
    return new Promise((resolve) => {
      axios
      .get(movies2020)
      .then((resp) => {
        commit("setMovies2020", resp.data.results)
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


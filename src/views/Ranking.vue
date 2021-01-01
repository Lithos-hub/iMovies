<template>
  <div>
    <SectionTitle :sectionName="name" />

    <v-sheet class="section-subtitle" elevation="10"
      >The most popular films of the last decade</v-sheet
    >
    <div class="text-center" id="years-menu-btn">
    <v-btn icon @click="expand = !expand">
    <v-icon color="cyan">mdi-menu</v-icon>
    </v-btn>
    </div>
<v-expand-transition>
    <v-row id="years-menu" v-show="expand">
      <v-col class="year-col" v-on:click="year = '2010'" @click="getMoviesByYear()">
        2010
      </v-col>  
      <v-col class="year-col" v-on:click="year = '2011'" @click="getMoviesByYear()">
        2011
      </v-col>  
      <v-col class="year-col" v-on:click="year = '2012'" @click="getMoviesByYear()">
        2012
      </v-col>  
      <v-col class="year-col" v-on:click="year = '2013'" @click="getMoviesByYear()">
        2013
      </v-col>  
      <v-col class="year-col" v-on:click="year = '2014'" @click="getMoviesByYear()">
        2014
      </v-col>  
      <v-col class="year-col" v-on:click="year = '2015'" @click="getMoviesByYear()">
        2015
      </v-col>  
      <v-col class="year-col" v-on:click="year = '2016'" @click="getMoviesByYear()">
        2016
      </v-col>  
      <v-col class="year-col" v-on:click="year = '2017'" @click="getMoviesByYear()">
        2017
      </v-col>  
      <v-col class="year-col" v-on:click="year = '2018'" @click="getMoviesByYear()">
        2018
      </v-col>  
      <v-col class="year-col" v-on:click="year = '2019'" @click="getMoviesByYear()">
        2019
      </v-col>  
      <v-col class="year-col" v-on:click="year = '2020'" @click="getMoviesByYear()">
        2020
      </v-col>  
    </v-row>
</v-expand-transition>

    <v-tabs class="bar-tabs" centered background-color="transparent">
      <v-tabs-slider color="cyan"></v-tabs-slider>
    <v-tab active-class="cyan--text" class="white--text tab" v-on:click="year = '2010'" @click="getMoviesByYear()">2010</v-tab>
    <v-tab active-class="cyan--text" class="white--text tab" v-on:click="year = '2011'" @click="getMoviesByYear()">2011</v-tab>
    <v-tab active-class="cyan--text" class="white--text tab" v-on:click="year = '2012'" @click="getMoviesByYear()">2013</v-tab>
    <v-tab active-class="cyan--text" class="white--text tab" v-on:click="year = '2013'" @click="getMoviesByYear()">2012</v-tab>
    <v-tab active-class="cyan--text" class="white--text tab" v-on:click="year = '2014'" @click="getMoviesByYear()">2014</v-tab>
    <v-tab active-class="cyan--text" class="white--text tab" v-on:click="year = '2015'" @click="getMoviesByYear()">2015</v-tab>
    <v-tab active-class="cyan--text" class="white--text tab" v-on:click="year = '2016'" @click="getMoviesByYear()">2016</v-tab>
    <v-tab active-class="cyan--text" class="white--text tab" v-on:click="year = '2017'" @click="getMoviesByYear()">2017</v-tab>
    <v-tab active-class="cyan--text" class="white--text tab" v-on:click="year = '2018'" @click="getMoviesByYear()">2018</v-tab>
    <v-tab active-class="cyan--text" class="white--text tab" v-on:click="year = '2019'" @click="getMoviesByYear()">2019</v-tab>
    <v-tab active-class="cyan--text" class="white--text tab" v-on:click="year = '2020'" @click="getMoviesByYear()">2020</v-tab>
  </v-tabs>

        <div class="moviesColumns" v-if="panelExpanded">
          <v-row no-gutters>
            <v-col lg="3" xs="6" v-for="(item, i) in moviesByYear" :key="'B' + i">
              <div class="fadeIn">
              <img :src="url + item.poster_path" class="movie-img"/>
              <h3 class="movie-title">{{ item.original_title }}</h3>
              </div>
            </v-col>
          </v-row>
        </div>
  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "Ranking",
  components: {
    SectionTitle,
  },
  data() {
    return {
      name: "Ranking",
      url: "https://image.tmdb.org/t/p/original",
      year: '',
      expand: false,
      errorMessage: "",
      moviesByYear: [],
      panelExpanded: false,
    };
  },
  methods: {
    getMoviesByYear() {
      const url = "https://api.themoviedb.org/3";
      const apikey = "c9a3e87b703c630c13d5ea61ef62c7b6";
      let year = this.year;
      const moviesUrl = `${url}/discover/movie?year=${year}&api_key=${apikey}&sort_by=popularity.desc&page=1`;


        return new Promise((resolve) => {
          axios
      .get(moviesUrl)
      .then((resp) => {
        this.panelExpanded = true;
        this.moviesByYear = resp.data.results;
      })
      .catch((e) => {
        console.info(e);
        this.errorMessage = "The answer is taking too long. There may have been an error with the database. Please reload the website.";
      });
    })
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

.fadeIn {
  animation: fadeIn 1s ease;
}

@keyframes fadeIn {
  from{opacity: 0};
  to{opacity: 1}
}

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  .section-subtitle {
    font-family: $style3;
    font-size: 1em;
    text-align: center;
    margin-bottom: 20px;
    letter-spacing: 4px;
    background: url("../assets/img/background5.jpg");
    background-repeat: repeat;
    color: rgb(255, 212, 212) !important;
    text-shadow: 0px 0px 10px $secondary;
    animation: move 2s ease-in-out;
  }

  @keyframes move {
    from {
      margin-left: -3000px;
      opacity: 0;
    }
    to {
      margin-left: 0px;
      opacity: 1;
    }
  }

  .year {
    text-align: center;
  }


  .header {
    align-self: center !important;
    font-family: $style3;
    font-weight: lighter;
    font-size: 6em !important;
    background-color: $dark2 !important;
    color: $secondary;

    &:hover {
      color: white;
      transition: color 1s;
    }

    &:focus {
      outline: none;
    }
  }

  .moviesColumns {
    text-align: center;
    background: $dark2;
    color: white;
    text-shadow: 0px 0px 3px $secondary, 0px 0px 5px red;
    margin-bottom: 100px;
  }

  .movie-img {
    width: 150px;
    padding: 15px;
    height: auto;
    margin: 0 auto;
  }

  .movie-title {
    font-weight: lighter;
    font-size: 14px;
  }

  .bar-tabs {
    display: none;
  }

  #years-menu-btn {
    display: block;
  }

  #years-menu {
    margin: 10px;
    text-align: center;
  }

  .year-col {
    margin: 5px;  
    border-radius: 20px;
    color: $dark2;
    font-weight: bold;
    background: $primary;
    font-family: $style3;
  
  &:hover {
  cursor: pointer;

    }
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  .section-subtitle {
    font-family: $style3;
    font-size: 2em;
    text-align: center;
    margin-bottom: 20px;
    letter-spacing: 4px;
    background: url("../assets/img/background5.jpg");
    background-repeat: repeat;
    color: rgb(255, 212, 212) !important;
    text-shadow: 0px 0px 10px $secondary;
    animation: move 2s ease-in-out;
  }

  @keyframes move {
    from {
      margin-left: -3000px;
      opacity: 0;
    }
    to {
      margin-left: 0px;
      opacity: 1;
    }
  }


  .year {
    text-align: center;
  }

  .header {
    align-self: center !important;
    font-family: $style3;
    font-weight: lighter;
    font-size: 8em !important;
    background-color: $dark2 !important;
    color: $secondary;

    &:hover {
      color: white;
      transition: color 1s;
    }

    &:focus {
      outline: none;
    }
  }

  .moviesColumns {
    text-align: center;
    background: $dark2;
    letter-spacing: 5px;
    color: white;
    text-shadow: 0px 0px 3px $secondary, 0px 0px 5px red;
    margin-bottom: 100px;
  }

  .movie-img {
    width: 200px;
    margin: 20px;
    padding: 0px;
    height: auto;
    border-radius: 30px !important;
    box-shadow: 0px 5px 10px black;
  }

  .movie-title {
    font-weight: lighter;
    font-size: 1em;
  }

  .bar-tabs {
    display: block;
  }

  #years-menu-btn {
    display: none;
  }

}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  .section-subtitle {
    font-family: $style3;
    font-size: 2em;
    text-align: center;
    margin-bottom: 20px;
    letter-spacing: 4px;
    background: url("../assets/img/background5.jpg");
    background-repeat: repeat;
    color: rgb(255, 212, 212) !important;
    text-shadow: 0px 0px 10px $secondary;
    animation: move 2s ease-in-out;
  }

  @keyframes move {
    from {
      margin-left: -3000px;
      opacity: 0;
    }
    to {
      margin-left: 0px;
      opacity: 1;
    }
  }

  .year {
    text-align: center;
  }

  .header {
    align-self: center !important;
    font-family: $style3;
    font-weight: lighter;
    font-size: 8em !important;
    background-color: $dark2 !important;
    color: $secondary;

    &:hover {
      color: white;
      transition: color 1s;
    }

    &:focus {
      outline: none;
    }
  }

  .moviesColumns {
    text-align: center;
    background: $dark2;
    color: white;
    text-shadow: 0px 0px 3px $secondary, 0px 0px 5px red;
    margin-bottom: 100px;
  }

  .movie-img {
   width: 300px;
    margin: 20px;
    padding: 0px;
    height: auto;
    border-radius: 30px !important;
    box-shadow: 0px 5px 10px black;
  }

  .movie-title {
    font-weight: lighter;
    font-size: 1.5em;
  }

  .bar-tabs {
    display: block;
  }

  #years-menu-btn {
    display: none;
  }
}
</style>

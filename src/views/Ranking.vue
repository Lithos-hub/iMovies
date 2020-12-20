<template>
  <div>
    <SectionTitle :sectionName="name" />

    <v-sheet class="section-subtitle" elevation="10"
      >The most popular films of the last decade</v-sheet
    >

    <v-expansion-panels class="expansion-panels" tile focusable>
      <!-- *********************** 2010 *********************** -->
      <v-expansion-panel>
        <v-expansion-panel-header class="header" expand-icon="">
          <span class="year">2010</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="content">
          <v-row no-gutters>
            <v-col lg="3" xs="6" v-for="(item, i) in movies2010" :key="i">
              <img :src="url + item.poster_path" class="movie-img" />
              <h3 class="movie-title">{{ item.original_title }}</h3>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- *********************** 2011 *********************** -->
      <v-expansion-panel>
        <v-expansion-panel-header class="header" expand-icon="">
          <span class="year">2011</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="content">
          <v-row no-gutters>
            <v-col lg="3" xs="6" v-for="(item, i) in movies2011" :key="i">
              <img :src="url + item.poster_path" class="movie-img" />
              <h3 class="movie-title">{{ item.original_title }}</h3>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- *********************** 2012 *********************** -->
      <v-expansion-panel>
        <v-expansion-panel-header class="header" expand-icon="">
          <span class="year">2012</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="content">
          <v-row no-gutters>
            <v-col lg="3" xs="6" v-for="(item, i) in movies2012" :key="i">
              <img :src="url + item.poster_path" class="movie-img" />
              <h3 class="movie-title">{{ item.original_title }}</h3>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- *********************** 2013 *********************** -->
      <v-expansion-panel>
        <v-expansion-panel-header class="header" expand-icon="">
          <span class="year">2013</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="content">
          <v-row no-gutters>
            <v-col lg="3" xs="6" v-for="(item, i) in movies2013" :key="i">
              <img :src="url + item.poster_path" class="movie-img" />
              <h3 class="movie-title">{{ item.original_title }}</h3>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- *********************** 2014 *********************** -->
      <v-expansion-panel>
        <v-expansion-panel-header class="header" expand-icon="">
          <span class="year">2014</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="content">
          <v-row no-gutters>
            <v-col lg="3" xs="6" v-for="(item, i) in movies2014" :key="i">
              <img :src="url + item.poster_path" class="movie-img" />
              <h3 class="movie-title">{{ item.original_title }}</h3>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- *********************** 2015 *********************** -->
      <v-expansion-panel>
        <v-expansion-panel-header class="header" expand-icon="">
          <span class="year">2015</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="content">
          <v-row no-gutters>
            <v-col lg="3" xs="6" v-for="(item, i) in movies2015" :key="i">
              <img :src="url + item.poster_path" class="movie-img" />
              <h3 class="movie-title">{{ item.original_title }}</h3>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- *********************** 2016 *********************** -->
      <v-expansion-panel>
        <v-expansion-panel-header class="header" expand-icon="">
          <span class="year">2016</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="content">
          <v-row no-gutters>
            <v-col lg="3" xs="6" v-for="(item, i) in movies2016" :key="i">
              <img :src="url + item.poster_path" class="movie-img" />
              <h3 class="movie-title">{{ item.original_title }}</h3>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- *********************** 2017 *********************** -->
      <v-expansion-panel>
        <v-expansion-panel-header class="header" expand-icon="">
          <span class="year">2017</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="content">
          <v-row no-gutters>
            <v-col lg="3" xs="6" v-for="(item, i) in movies2017" :key="i">
              <img :src="url + item.poster_path" class="movie-img" />
              <h3 class="movie-title">{{ item.original_title }}</h3>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- *********************** 2018 *********************** -->
      <v-expansion-panel>
        <v-expansion-panel-header class="header" expand-icon="">
          <span class="year">2018</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="content">
          <v-row no-gutters>
            <v-col lg="3" xs="6" v-for="(item, i) in movies2018" :key="i">
              <img :src="url + item.poster_path" class="movie-img" />
              <h3 class="movie-title">{{ item.original_title }}</h3>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- *********************** 2019 *********************** -->
      <v-expansion-panel>
        <v-expansion-panel-header class="header" expand-icon="">
          <span class="year">2019</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="content">
          <v-row no-gutters>
            <v-col lg="3" xs="6" v-for="(item, i) in movies2019" :key="i">
              <img :src="url + item.poster_path" class="movie-img" />
              <h3 class="movie-title">{{ item.original_title }}</h3>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- *********************** 2020 *********************** -->
      <v-expansion-panel>
        <v-expansion-panel-header class="header" expand-icon="">
          <span class="year">2020</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="content">
          <v-row no-gutters>
            <v-col lg="3" xs="6" v-for="(item, i) in movies2020" :key="i">
              <img :src="url + item.poster_path" class="movie-img" />
              <h3 class="movie-title">{{ item.original_title }}</h3>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import { mapState, mapActions } from "vuex";

export default {
  name: "Ranking",
  components: {
    SectionTitle,
  },
  data() {
    return {
      name: "Ranking",
      url: "https://image.tmdb.org/t/p/original",
    };
  },
  computed: {
    ...mapState([
      "movies2010",
      "movies2011",
      "movies2012",
      "movies2013",
      "movies2014",
      "movies2015",
      "movies2016",
      "movies2017",
      "movies2018",
      "movies2019",
      "movies2020",
    ]),
  },
  methods: {
    ...mapActions([
      "getMovies2010",
      "getMovies2011",
      "getMovies2012",
      "getMovies2013",
      "getMovies2014",
      "getMovies2015",
      "getMovies2016",
      "getMovies2017",
      "getMovies2018",
      "getMovies2019",
      "getMovies2020",
    ]),
  },
  created() {
    this.getMovies2010();
    this.getMovies2011();
    this.getMovies2012();
    this.getMovies2013();
    this.getMovies2014();
    this.getMovies2015();
    this.getMovies2016();
    this.getMovies2017();
    this.getMovies2018();
    this.getMovies2019();
    this.getMovies2020();
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  .section-subtitle {
    font-family: $style3;
    font-size: 1.5em;
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

  .content {
    text-align: center;
    background: $dark2;
    color: $secondary;
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

  .content {
    text-align: center;
    background: $dark2;
    color: $secondary;
  }

  .movie-img {
    width: 300px;
    padding: 20px;
    height: auto;
    margin: 0 auto;
  }

  .movie-title {
    font-weight: lighter;
    font-size: 1em;
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

  .content {
    text-align: center;
    background: $dark2;
    color: $secondary;
  }

  .movie-img {
    width: 300px;
    padding: 20px;
    height: auto;
    margin: 0 auto;
  }

  .movie-title {
    font-weight: lighter;
    font-size: 1.5em;
  }
}
</style>

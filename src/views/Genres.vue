<template>
  <div>
    <SectionTitle :sectionName="name" />

    <v-sheet class="section-subtitle" elevation="10">Movies per genre</v-sheet>

    <div class="error-sheet-container" v-if="loadingError">
      <v-sheet dark class="error-sheet" height="100%" width="100%" elevation="10">
        {{ loadingError }}
      </v-sheet>
    </div>

    <div v-if="loadingGenre" width="100%" class="snackbar">
      <span class="loadingData-text"> Loading data... </span>
      <v-progress-circular
        :size="40"
        color="white"
        indeterminate
        class="spinner"
      ></v-progress-circular>
    </div>

    <div id="genres-container">
      <v-row no-gutters>
        <v-col cols="12">
          <!-- ********************* ACTION BUTTON ********************* -->
          <v-btn
            id="actionBtn"
            class="genre-btn img1"
            v-on:click="[(genre = '28')], [(genreTitle = 'action')]"
            @click="getMovies()"
            dark
            block
            tile
          >
            Action
          </v-btn>
          <!-- ********************* ADVENTURE BUTTON ********************* -->

          <v-btn
            color="green"
            class="genre-btn img2"
            v-on:click="[(genre = '12')], [(genreTitle = 'adventure')]"
            @click="getMovies()"
            dark
            block
            tile
          >
            Adventure
          </v-btn>
          <!-- ********************* ANIMATION BUTTON ********************* -->
          <v-btn
            color="orange"
            class="genre-btn img3"
            v-on:click="[(genre = '16')], [(genreTitle = 'animation')]"
            @click="getMovies()"
            dark
            block
            tile
          >
            Animation
          </v-btn>
          <!-- ********************* COMEDY BUTTON ********************* -->
          <v-btn
            color="purple"
            class="genre-btn img4"
            v-on:click="[(genre = '35')], [(genreTitle = 'comedy')]"
            @click="getMovies()"
            dark
            block
            tile
          >
            Comedy
          </v-btn>
          <!-- ********************* CRIME BUTTON ********************* -->
          <v-btn
            color="secondary"
            class="genre-btn img5"
            v-on:click="[(genre = '80')], [(genreTitle = 'crime')]"
            @click="getMovies()"
            dark
            block
            tile
          >
            Crime
          </v-btn>
          <!-- ********************* DOCUMENTARY BUTTON ********************* -->
          <v-btn
            color="pink"
            class="genre-btn img6"
            v-on:click="[(genre = '99')], [(genreTitle = 'documentary')]"
            @click="getMovies()"
            dark
            block
            tile
          >
            Documentary
          </v-btn>
          <!-- ********************* DRAMATIC BUTTON ********************* -->
          <v-btn
            color="yellow darken-4"
            class="genre-btn img7"
            v-on:click="[(genre = '18')], [(genreTitle = 'dramatic')]"
            @click="getMovies()"
            dark
            block
            tile
          >
            Dramatic
          </v-btn>
          <!-- ********************* FANTASY BUTTON ********************* -->
          <v-btn
            color="blue"
            class="genre-btn img8"
            v-on:click="[(genre = '14')], [(genreTitle = 'fantasy')]"
            @click="getMovies()"
            dark
            block
            tile
          >
            Fantasy
          </v-btn>
          <!-- ********************* HISTORY BUTTON ********************* -->
          <v-btn
            color="brown"
            class="genre-btn img9"
            v-on:click="[(genre = '36')], [(genreTitle = 'history')]"
            @click="getMovies()"
            dark
            block
            tile
          >
            History
          </v-btn>
          <!-- ********************* HORROR BUTTON ********************* -->
          <v-btn
            color="gray"
            class="genre-btn img10"
            v-on:click="[(genre = '27')], [(genreTitle = 'horror')]"
            @click="getMovies()"
            dark
            block
            tile
          >
            Horror
          </v-btn>
          <!-- ********************* MUSICAL BUTTON ********************* -->
          <v-btn
            color="cyan"
            class="genre-btn img11"
            v-on:click="[(genre = '10402')], [(genreTitle = 'musical')]"
            @click="getMovies()"
            dark
            block
            tile
          >
            Musical
          </v-btn>
          <!-- ********************* ROMANTIC BUTTON ********************* -->
          <v-btn
            color="error"
            class="genre-btn img12"
            v-on:click="[(genre = '10749')], [(genreTitle = 'romantic')]"
            @click="getMovies()"
            dark
            block
            tile
          >
            Romantic
          </v-btn>
          <!-- ********************* SCI-FI BUTTON ********************* -->
          <v-btn
            color="blue"
            class="genre-btn img13"
            v-on:click="[(genre = '878')], [(genreTitle = 'sci-fi')]"
            @click="getMovies()"
            dark
            block
            tile
          >
            Sci-fi
          </v-btn>
          <!-- ********************* THRILLER BUTTON ********************* -->
          <v-btn
            color="orange"
            class="genre-btn img14"
            v-on:click="[(genre = '53')], [(genreTitle = 'thriller')]"
            @click="getMovies()"
            dark
            block
            tile
          >
            Thriller
          </v-btn>
          <!-- ********************* WAR BUTTON ********************* -->
          <v-btn
            color="red"
            class="genre-btn img15"
            v-on:click="[(genre = '10752')], [(genreTitle = 'war')]"
            @click="getMovies()"
            dark
            block
            tile
          >
          </v-btn>

          <!-- ********************* WESTERN BUTTON ********************* -->
          <v-btn
            color="indigo"
            class="genre-btn img16"
            v-on:click="[(genre = '37')], [(genreTitle = 'western')]"
            @click="getMovies()"
            dark
            block
            tile
          >
            Western
          </v-btn>
        </v-col>
        <!-- ********************* GO UP BUTTON ********************* -->
        <a href="#" class="go_up_trigger">
          <v-btn color="secondary" class="go-up-btn" @click="go_up()">Go up!</v-btn>
        </a>
      </v-row>

      <!--********************************** DIALOG MOVIES ********************************** -->
      <div v-for="(item, i) in movies_array" :key="i">
        <v-row>
          <v-dialog v-model="genreDialog" v-if="genreDialog" class="movie-genres-dialog">
            <v-card>
              <v-toolbar tile elevation="10" dark color="secondary">
                <v-btn icon dark @click="genreDialog = false" class="close-dialog-btn">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title class="card-genre-title">{{
                  genreTitle
                }}</v-toolbar-title>
              </v-toolbar>
              <v-row no-gutters class="text-center">
                <div v-for="(item, i) in movies_array" :key="i">
                  <v-col lg="12" xs="12" class="d-flex">
                    <v-sheet width="80%" id="genre-sheet">
                      <v-card-title id="genre-title"
                        >{{ item.title }}
                        <span id="genre-date">{{ item.release_date }}</span></v-card-title
                      >
                    </v-sheet>
                  </v-col>
                  <v-col lg="12" xs="12">
                    <img
                      :src="url + item.poster_path"
                      width="200"
                      class="movie-img-dialog"
                    />
                    <p class="lead" id="genre-overview">
                      {{ item.overview }}
                      <br />
                      <span id="no-overview" v-if="item.overview.length <= 0">{{
                        no_overview
                      }}</span>
                    </p>
                  </v-col>
                  <hr class="error" />
                </div>
              </v-row>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import axios from "axios";

export default {
  name: "Genres",
  components: {
    SectionTitle,
  },
  data() {
    return {
      name: "Genres",
      genreDialog: false,
      url: "https://image.tmdb.org/t/p/original",
      no_overview: "We sorry. This movie has not overview available.",
      loadingGenre: false,
      loadingError: "",
      movies_array: [],
      movieTitle: "",
      genre: "",
    };
  },
  methods: {
    getMovies() {
      const url = "https://api.themoviedb.org/3";
      const apikey = "c9a3e87b703c630c13d5ea61ef62c7b6";
      const genre = this.genre;

      const movieurl = `${url}/discover/movie?&api_key=${apikey}&sort_by=popularity.desc&page=1&with_genres=${genre}`;

      return new Promise((resolve) => {
        this.loadingGenre = true;
        this.genreDialog = false;
        axios
          .get(movieurl)
          .then((resp) => {
            this.loadingGenre = false;
            this.genreDialog = true;
            this.movies_array = resp.data.results;

            console.log(resp.data.results);
          })
          .catch((e) => {
            console.info(e);
            this.loadingError =
              "Something wrong happened :( There may have been an error with the database. Please reload the website.";
          });
      });
    },
    go_up() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  #genres-container {
    position: relative;
    width: 100%;
    margin-bottom: 50px;
  }

  .genre-btn {
    letter-spacing: 0px;
    height: 350px !important;
    font-size: 3em;
    text-shadow: 0px 0px 10px black;
    margin-bottom: 20px;
    transition: 0.5s;
    animation: fadeIn ease 2s;
    justify-content: flex-end;
    filter: grayscale(0);
  }

  .movie-genres-dialog {
    z-index: 99999;
  }

  .close-dialog-btn:focus {
    outline: none;
  }

  .card-genre-title {
    font-size: 2em;
    text-transform: uppercase;
    letter-spacing: 20px;
    text-align: right;
    font-family: $style3;
  }

  .snackbar {
    background-image: url("../assets/img/gradient1.jpg");
    background-position: center;
    background-size: auto;
    text-align: center;
    position: fixed;
    bottom: 0px;
    width: 100%;
    z-index: 99999999;
    box-shadow: 0px -20px 20px black;
    animation: 2s motion ease-in-out infinite alternate-reverse;

    &:hover {
      text-shadow: none;
    }

    .loadingData-text {
      font-size: 1em;
    }

    .spinner {
      display: block;
      margin: 0 auto;
      justify-content: center;
      margin-bottom: 10px;
      margin-top: 10px;
    }
  }

  .img1 {
    background: url("../assets/img/actionimg.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img2 {
    background: url("../assets/img/adventureimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img3 {
    background: url("../assets/img/animationimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img4 {
    background: url("../assets/img/comedyimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img5 {
    background: url("../assets/img/crimeimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img6 {
    background: url("../assets/img/documentaryimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img7 {
    background: url("../assets/img/dramaticimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img8 {
    background: url("../assets/img/fantasyimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img9 {
    background: url("../assets/img/historyimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img10 {
    background: url("../assets/img/horrorimg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img11 {
    background: url("../assets/img/musicalimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img12 {
    background: url("../assets/img/romanticimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img13 {
    background: url("../assets/img/scifiimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img14 {
    background: url("../assets/img/thrillerimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img15 {
    background: url("../assets/img/warimg.jpg");
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img16 {
    background: url("../assets/img/westernimg.jpg");
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  .go-up-btn {
    position: relative;
    margin: 0;
    width: 100%;
    bottom: 0px;
    height: 100px !important;
    font-size: 5em;
    &:focus {
      outline: none;
    }
  }

  .go_up_trigger {
    text-decoration: none;
  }

  #genre-title {
    font-size: 18px;
    font-family: $style3;
  }
  #genre-date {
    position: absolute;
    right: 20px;
    color: $primary;
  }

  #genre-overview {
    padding: 0px;
    font-size: 20px;
    text-align: justify;
    display: block;
    width: 100%;
    margin-top: 20px;
  }

  .movie-img-dialog {
    height: auto;
    width: 250px;
    border-radius: 15px;
    display: inline;
    margin-top: 50px;
    mask-image: linear-gradient(to top right, transparent 49.5%, white 50.5%),
      linear-gradient(to top left, transparent 49.5%, white 50.5%),
      linear-gradient(white, white), linear-gradient(white, white);
    mask-size: 70% 25%, 25% 25%, 70% 70%, 25% 40%;
    mask-position: bottom left, bottom right, top right, top left;
    mask-repeat: no-repeat;
  }

  .section-subtitle {
    font-family: $style3;
    font-size: 2em;
    text-align: center;
    margin-bottom: 20px;
    letter-spacing: 4px;
    background: url("../assets/img/background6.jpg");
    background-repeat: repeat;
    color: white !important;
    text-shadow: 0px 0px 6px rgb(43, 123, 209);
    animation: move 2s ease-in-out;
  }

  @keyframes move {
    from {
      margin-left: -5000px;
      opacity: 0;
    }
    to {
      margin-left: 0px;
      opacity: 1;
    }
  }

  @keyframes motion {
    0% {
      background-position: top;
    }

    100% {
      background-position: bottom;
    }

    0% {
      background-position: top;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  #genres-container {
    position: relative;
    width: 100%;
    margin-bottom: 50px;
  }

  .genre-btn {
    letter-spacing: 40px;
    height: 350px !important;
    font-size: 3em;
    text-shadow: 0px 0px 10px black;
    margin-bottom: 20px;
    transition: 0.5s;
    animation: fadeIn ease 2s;
    justify-content: flex-end;
    filter: grayscale(1);

    &:focus {
      outline: none;
    }

    &:hover {
      color: white;
      text-shadow: 0px 0px 10px cyan, 0px 0px 3px cyan;
      font-size: 6em;
      letter-spacing: 50px;
      filter: none;
    }
  }

  .movie-genres-dialog {
    z-index: 99999;
  }

  .close-dialog-btn:focus {
    outline: none;
  }

  .card-genre-title {
    font-size: 4em;
    text-transform: uppercase;
    letter-spacing: 20px;
    text-align: right;
    font-family: $style3;
  }

  .snackbar {
    text-align: center;
    position: fixed;
    bottom: 0px;
    width: 100%;
    z-index: 99999999;
    box-shadow: 0px -20px 20px black;
    background-image: url("../assets/img/gradient1.jpg");
    background-position: center;
    background-size: auto;
    animation: 2s motion ease-in-out infinite alternate-reverse;

    &:hover {
      text-shadow: none;
    }

    .loadingData-text {
      font-size: 2em;
    }

    .spinner {
      display: block;
      margin: 0 auto;
      justify-content: center;
      margin-bottom: 10px;
      margin-top: 10px;
    }
  }

  .img1 {
    background: url("../assets/img/actionimg.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img2 {
    background: url("../assets/img/adventureimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img3 {
    background: url("../assets/img/animationimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img4 {
    background: url("../assets/img/comedyimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img5 {
    background: url("../assets/img/crimeimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img6 {
    background: url("../assets/img/documentaryimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img7 {
    background: url("../assets/img/dramaticimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img8 {
    background: url("../assets/img/fantasyimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img9 {
    background: url("../assets/img/historyimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img10 {
    background: url("../assets/img/horrorimg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img11 {
    background: url("../assets/img/musicalimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img12 {
    background: url("../assets/img/romanticimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img13 {
    background: url("../assets/img/scifiimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img14 {
    background: url("../assets/img/thrillerimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img15 {
    background: url("../assets/img/warimg.jpg");
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img16 {
    background: url("../assets/img/westernimg.jpg");
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  .go-up-btn {
    position: relative;
    margin: 0;
    width: 100%;
    bottom: 0px;
    height: 100px !important;
    font-size: 5em;
    &:focus {
      outline: none;
    }
  }

  .go_up_trigger {
    text-decoration: none;
  }

  #genre-title {
    font-size: 2em;
    font-family: $style3;
  }
  #genre-date {
    position: absolute;
    right: 25px;
    color: $primary;
  }

  #genre-overview {
    padding: 30px;
    font-size: 20px;
    text-align: justify;
  }

  .movie-img-dialog {
    height: auto;
    width: 250px;
    border-radius: 15px;
    display: inline;
    margin-top: 50px;
    mask-image: linear-gradient(to top right, transparent 49.5%, white 50.5%),
      linear-gradient(to top left, transparent 49.5%, white 50.5%),
      linear-gradient(white, white), linear-gradient(white, white);
    mask-size: 70% 25%, 25% 25%, 70% 70%, 25% 40%;
    mask-position: bottom left, bottom right, top right, top left;
    mask-repeat: no-repeat;
  }

  .section-subtitle {
    font-family: $style3;
    font-size: 2em;
    text-align: center;
    margin-bottom: 20px;
    letter-spacing: 4px;
    background: url("../assets/img/background6.jpg");
    background-repeat: repeat;
    color: white !important;
    text-shadow: 0px 0px 6px rgb(43, 123, 209);
    animation: move 2s ease-in-out;
  }

  @keyframes move {
    from {
      margin-left: -5000px;
      opacity: 0;
    }
    to {
      margin-left: 0px;
      opacity: 1;
    }
  }

  @keyframes motion {
    0% {
      background-position: top;
    }

    100% {
      background-position: bottom;
    }

    0% {
      background-position: top;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  #genres-container {
    position: relative;
    width: 100%;
    margin-bottom: 50px;
  }

  .genre-btn {
    letter-spacing: 40px;
    height: 350px !important;
    font-size: 3em;
    text-shadow: 0px 0px 10px black;
    margin-bottom: 20px;
    transition: 0.5s;
    animation: fadeIn ease 2s;
    justify-content: flex-end;
    filter: grayscale(1);

    &:focus {
      outline: none;
    }

    &:hover {
      color: white;
      text-shadow: 0px 0px 10px cyan, 0px 0px 3px cyan;
      font-size: 10em;
      letter-spacing: 50px;
      filter: none;
    }
  }

  .movie-genres-dialog {
    z-index: 99999;
  }

  .close-dialog-btn:focus {
    outline: none;
  }

  .card-genre-title {
    font-size: 4em;
    text-transform: uppercase;
    letter-spacing: 20px;
    font-family: $style3;
  }

  .snackbar {
    text-align: center;
    position: fixed;
    bottom: 0px;
    width: 100%;
    z-index: 99999999;
    box-shadow: 0px -20px 20px black;
    background-image: url("../assets/img/gradient1.jpg");
    background-position: center;
    background-size: auto;
    animation: 2s motion ease-in-out infinite alternate-reverse;

    &:hover {
      text-shadow: none;
    }

    .loadingData-text {
      font-size: 2em;
    }

    .spinner {
      display: block;
      margin: 0 auto;
      justify-content: center;
      margin-bottom: 10px;
      margin-top: 10px;
    }
  }

  .img1 {
    background: url("../assets/img/actionimg.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img2 {
    background: url("../assets/img/adventureimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img3 {
    background: url("../assets/img/animationimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img4 {
    background: url("../assets/img/comedyimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img5 {
    background: url("../assets/img/crimeimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img6 {
    background: url("../assets/img/documentaryimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img7 {
    background: url("../assets/img/dramaticimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img8 {
    background: url("../assets/img/fantasyimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img9 {
    background: url("../assets/img/historyimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img10 {
    background: url("../assets/img/horrorimg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img11 {
    background: url("../assets/img/musicalimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img12 {
    background: url("../assets/img/romanticimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img13 {
    background: url("../assets/img/scifiimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img14 {
    background: url("../assets/img/thrillerimg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img15 {
    background: url("../assets/img/warimg.jpg");
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .img16 {
    background: url("../assets/img/westernimg.jpg");
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  .go-up-btn {
    position: relative;
    margin: 0;
    width: 100%;
    bottom: 0px;
    height: 100px !important;
    font-size: 5em;
    &:focus {
      outline: none;
    }
  }

  .go_up_trigger {
    text-decoration: none;
  }

  #genre-title {
    font-size: 3em;
    width: 100%;
    font-family: $style3;
  }
  #genre-date {
    position: absolute;
    right: 35px;
    color: $secondary;
  }

  #genre-overview {
    padding: 50px;
    font-size: 2em;
    text-align: justify;
  }

  .section-subtitle {
    font-family: $style3;
    font-size: 2em;
    text-align: center;
    margin-bottom: 20px;
    letter-spacing: 4px;
    background: url("../assets/img/background6.jpg");
    background-repeat: repeat;
    color: white !important;
    text-shadow: 0px 0px 6px rgb(43, 123, 209);
    animation: move 2s ease-in-out;
  }

  .movie-img-dialog {
    height: auto;
    width: 400px;
    display: inline;
    text-align: center;
    border-radius: 15px;
    margin-top: 50px;
    mask-image: linear-gradient(to top right, transparent 49.5%, white 50.5%),
      linear-gradient(to top left, transparent 49.5%, white 50.5%),
      linear-gradient(white, white), linear-gradient(white, white);
    mask-size: 70% 25%, 25% 25%, 70% 70%, 25% 40%;
    mask-position: bottom left, bottom right, top right, top left;
    mask-repeat: no-repeat;
  }

  @keyframes move {
    from {
      margin-left: -5000px;
      opacity: 0;
    }
    to {
      margin-left: 0px;
      opacity: 1;
    }
  }

  @keyframes motion {
    0% {
      background-position: top;
    }

    100% {
      background-position: bottom;
    }

    0% {
      background-position: top;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>

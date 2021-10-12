<template>
  <div id="popular-view">
    <SectionTitle :sectionSubtitle="subtitle" />

    <v-row>
      <v-col />
      <v-col cols="1">
        <v-text-field
        elevation-10
        v-model="year"
        type="number"
        filled
        dark
        color="cyan"
        width="auto"
        label="Write a year"
        class="rounded-0"
        @change="getMoviesByYear({year, page}); checkYear()">
        </v-text-field>
      </v-col>
      <v-col />
    </v-row>

    <h3 class="error--text text-center" v-if="incorrectYear">The first 'movie' was made in 1878 and it's called <i class="cyan--text">The Horse in Motion </i>or<i class="cyan--text"> Sallie Gardner at a Gallop</i>. <br> So, try with another year!</h3>
    
    <v-container>
      <div class="moviesColumns">
        <v-row no-gutters>
          <v-col
            md="3"
            xs="12"
            v-for="(item, i) in moviesByYear"
            :key="'B' + i"
          >
            <div class="fadeIn my-5">
                  <!-- MOVIE IMAGE AND DYNAMIC ICONS -->
                    <h3 id="movie-title">
                      {{ item.title }}
                    </h3>
                    <v-img
                      id="movie-img"
                      max-width="300px"
                      height="100%"
                      max-height="400px"
                      :src="item.poster_path !== null ? `${imageURL + item.poster_path}` : no_image"
                      :lazy-src="loadingIMG"
                      class="mb-5 mx-auto elevation-10"
                      @click="showDetails(item)"
                    >
                      <!-- <div
                        v-for="(id_watched, i) in arrWatchedIDS"
                        :key="'C' + i"
                      >
                        <v-icon
                          v-if="id_watched === item.id"
                          class="eye-icon-img"
                          >mdi-eye</v-icon
                        >
                      </div>
                      <div
                        v-for="(id_favorite, i) in arrFavoriteIDS"
                        :key="'D' + i"
                      >
                        <v-icon
                          v-if="id_favorite === item.id"
                          class="heart-icon-img"
                          >mdi-heart</v-icon
                        >
                      </div>
                      <div
                        v-for="(id_toWatch, i) in arrToWatchIDS"
                        :key="'E' + i"
                      >
                        <v-icon
                          v-if="id_toWatch === item.id"
                          class="plus-icon-img"
                          >mdi-star-shooting</v-icon
                        >
                      </div>
                      <div v-for="(rated, i) in arrRatedIDS" :key="'F' + i">
                        <div class="rate-img" v-if="rated.id === item.id">
                          {{ rated.rate }}
                        </div>
                      </div> -->
                      <div id="showDetails-text">
                        <p>Show details</p>
                      </div>
                    </v-img>
                    <v-btn
                      class="mx-auto d-block"
                      width="100%"
                      max-width="300px"
                      outlined
                      color="purple"
                      large
                      tile
                      @click="showAddToDialog(true); setAddMovie(item)"
                      dark
                      id="add-to-btn"
                      >
                      <span class="white--text">Add to My Movies</span>
                  </v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <v-container v-if="loadingScroll" fluid id="loading-container">
      <v-progress-circular
      id="loading-scroll"
      :size="100"
      color="cyan"
      indeterminate
    ></v-progress-circular>
    </v-container>
  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import { mapActions, mapState } from 'vuex';

export default {
  name: "Ranking",
  components: {
    SectionTitle,
  },
  data() {
    return {
      subtitle: "Popular movies by year",
      userID: null,
      year: '',
      incorrectYear: false,
      category: "",
      rateDialog: false,
      expand: false,
      value: 0,
      userData: [],
      page: 1
    };
  },
  created(){
    this.getRandomYear()
  },
  mounted() {
    this.getMoviesByYear({ year: this.year, page: this.page });
    this.infiniteScroll();
  },
  computed: {
    ...mapState(['moviesByYear', 'moviesID', 'no_image', 'imageURL', 'loadingScroll', 'loadingIMG'])
  },
  methods: {
    ...mapActions(['getMoviesByYear']),
    showDetails(item) {
      this.$router.push(`/movie/${item.id}`);
    },
    getRandomYear() {
        let max = new Date().getFullYear();
        let min = 1878;
        let random = Math.floor(Math.random() * (max - min + 1) + min);
        this.year = random
    },
    checkYear () {
      this.year < 1878 ? this.incorrectYear = true : this.incorrectYear = false
    },
    infiniteScroll () {
      let counter = 1
      let reachedBottom = false
      window.onscroll = () => {
        let sum = window.innerHeight + window.pageYOffset
        if (sum === document.body.offsetHeight) {
          reachedBottom = true
          counter++
          console.log(counter)
          this.page = counter
          this.getMoviesByYear({ year: this.year, page: this.page })
          reachedBottom = false
          setTimeout(() => {
            if (!reachedBottom) {
              document.body.scrollTop = window.pageYOffset / 1.25
              document.documentElement.scrollTop = window.pageYOffset / 1.25
            }
          }, 500)
        }
        }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";
@import "src/scss/app";

#popular-view {
  overflow-y: scroll;
  overflow-x: hidden;
}

#showDetails-text {
  position: absolute;
  text-align: center;
  width: 90%;
  left: 50%;
  top: 90%;
  transform: translate(-50%, -50%);
  color: cyan;
  text-shadow: none;
  font-weight: bold;
  text-transform: uppercase;
  filter: none;
  background: $dark;
  padding: 1em;
  opacity: 0;
  transition: all 0.3s ease-out;
  font-size: 1em;
  box-shadow: inset 0 0 10px black;
}

#movie-title {
  background: #090909;
  max-width: 300px;
  padding: 1em;
  margin: 0 auto;
  font-size: 16px;
  text-align: center;
  text-shadow: 0px 0px 2px white,  0px 0px 4px magenta, 0px 0px 8px red;
  color: white;
  min-height: 70px;
}

#movie-img {
  transition: all 0.3s ease-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);

    #showDetails-text {
      opacity: 1;
    }
  }
}
.eye-icon-img {
  color: white !important;
  text-shadow: none !important;
  background: #2196f3;
  padding: 10px;
  font-size: 30px;
  border-radius: 0px 10px 0px 0px;
  position: absolute;
  bottom: 0px;
  left: 0px;
}
.heart-icon-img {
  color: $secondary !important;
  text-shadow: none !important;
  background: white;
  padding: 10px;
  font-size: 30px;
  border-radius: 10px 0px 0px 0px;
  position: absolute;
  bottom: 0px;
  right: 0px;
}

.plus-icon-img {
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 10px;
  font-size: 30px;
  border-radius: 0px 0px 10px 0px;
  background: #404ea7;
  color: white;
  text-shadow: none;
}
.rate-img {
  color: rgb(0, 247, 255) !important;
  text-shadow: none !important;
  background: #2c112e;
  font-size: 20px;
  font-family: $style2;
  letter-spacing: 0px;
  width: 50%;
  border-radius: 0px 0px 0px 10px;
  text-align: center;
  position: absolute;
  top: 0px;
  right: 0px;
}

.rate-input {
  font-size: 1em;
  height: 100%;
  width: 100%;
  padding: 100px;
  border: 2px solid $primary;
  border-radius: 10px;

  &:focus {
    outline: none;
  }
}

#loading-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: $dark;
  height: 120px;
}

#loading-scroll {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

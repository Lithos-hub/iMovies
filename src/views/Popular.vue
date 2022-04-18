<template>
  <div class="popular-view">
    <SectionTitle :title="sectionTitle" />

    <!-- ADD TO MY MOVIES DIALOG -->
    <AddToDialog
      v-if="addToDialog"
      @force-update="getStoragedMovies()"
    />

    <v-row>
      <v-col />
      <v-col class="text-center cyan--text" :cols="isUsingMobile ? '8' : '2'">
        <small>
          {{ $t('view-popular.writeYear') }}
        </small>
        <v-text-field
        elevation-10
        v-model="year"
        type="number"
        filled
        dark
        color="cyan"
        class="rounded-0 centered-input"
        @change="checkAndSave(); getMoviesByYear({year, page})">
        </v-text-field>
      </v-col>
      <v-col />
    </v-row>

    <h3 class="error--text text-center" v-if="incorrectYear">
      {{ $t('view-popular.message1') }}
      <i class="cyan--text">{{ $t('view-popular.message2') }}</i>
      {{ $t('view-popular.message3') }}
      <i class="cyan--text">{{ $t('view-popular.message4') }}</i>
      <br> 
      <br> 
      {{ $t('view-popular.message5') }}
    </h3>
    <h3 class="error--text text-center" v-if="tooBigYear">
      {{ $t('view-popular.noMovies')}} {{ parseInt(capturedYear).toLocaleString('es-ES') }} 
    </h3>
    
    <v-container>
        <v-row>
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
                      min-height="400px"
                      max-height="400px"
                      :src="item.poster_path !== null ? `${imageURL + item.poster_path}` : no_image"
                      :lazy-src="loadingIMG"
                      class="mb-5 mx-auto elevation-10"
                      @click="showDetails(item)">
                      <div class="favourite-badge">
                        <div v-if="favouriteMovies.some(movie => movie.id === item.id)">
                          <v-icon id="favourite-badge" color="red" class="movie-badge">mdi-heart</v-icon>
                        </div>
                        <div v-if="watchedMovies.some(movie => movie.id === item.id)">
                          <v-icon id="watched-badge" color="primary" class="movie-badge">mdi-eye</v-icon>
                        </div>
                        <div v-if="wishListMovies.some(movie => movie.id === item.id)">
                          <v-icon id="wishlist-badge" color="amber" class="movie-badge">mdi-star-shooting</v-icon>
                        </div>
                        <div v-if="ratedMovies.some(movie => movie.id === item.id)">
                          <v-icon id="rated-badge" color="green" class="movie-badge">mdi-numeric</v-icon>
                        </div>
                      </div>
                      <div id="showDetails-text">
                        <p>{{ $t('view-popular.showDetails') }}</p>
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
                      <span class="white--text">{{ $t('app-buttons.add') }}</span>
                  </v-btn>
            </div>
          </v-col>
        </v-row>
    </v-container>

    <LoadingData v-if="loadingData" />

  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import LoadingData from "../components/LoadingData";
import AddToDialog from '../components/AddToDialog.vue'
import { mapActions, mapState } from 'vuex';
import Services from "../services/services";
export default {
  name: "Ranking",
  components: {
    SectionTitle,
    AddToDialog,
    LoadingData
  },
  data() {
    return {
      sectionTitle: this.$t('comp-sectionTitle.popular'),
      year: '',
      incorrectYear: false,
      tooBigYear: false,
      value: 0,
      page: 1,
      capturedYear: ''
    };
  },
  created () {
    this.comebackFromDetails ? this.getSavedYear() : this.getRandomYear()
  },
  mounted() {
    Services.hasVisitedTheSection("popular");
    this.getMoviesByYear({ year: this.year, page: this.page });
    if (this.$route.path === '/popular') { 
      this.infiniteScroll();
    }
  },
  computed: {
    ...mapState([
      'moviesByYear', 
      'moviesID', 
      'no_image', 
      'imageURL', 
      'loadingData', 
      'loadingIMG', 
      'addToDialog',
      'comebackFromDetails',
      'favouriteMovies',
      'watchedMovies',
      'wishListMovies',
      'ratedMovies']),
    isUsingMobile() {
      return this.$vuetify.breakpoint.xs;
    },
  },
  methods: {
    ...mapActions(['getMoviesByYear', 'showAddToDialog', 'setAddMovie']),
    getSavedYear() {
      let storagedYear = localStorage.getItem('popularYear');
      this.year = storagedYear
    },
    showDetails(item) {
      this.$router.push(`/movie/${item.id}`);
    },
    getRandomYear() {
        let max = new Date().getFullYear();
        let min = 1878;
        let random = Math.floor(Math.random() * (max - min + 1) + min);
        this.year = random
        localStorage.setItem('popularYear', this.year)
    },
    checkAndSave () {
      this.year < 1878 ? this.incorrectYear = true : this.incorrectYear = false
      this.year > 2030 ? this.tooBigYear = true : this.tooBigYear = false
      this.capturedYear = this.year
      if (this.year !== '') {
        localStorage.setItem('popularYear', this.year)
      }
    },
    infiniteScroll () {
      window.onscroll = () => {
        let view = document.querySelector('.popular-view')
        if (window.innerHeight + window.pageYOffset >= view.offsetHeight) {
          this.page++
          this.getMoviesByYear({ year: this.year, page: this.page })
        }
      }
    },
    getStoragedMovies () {
      this.$store.dispatch('getAllStoragedMovies')
    }
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

#favourite-badge {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 0px 0px 10px 0px;
}
#watched-badge {
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 0px 0px 0px 10px;
}
#wishlist-badge {
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 0px 10px 0px 0px;
}
#rated-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 10px 0px 0px 0px;
}

</style>

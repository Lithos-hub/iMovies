<template>
  <div>
    <v-container>
      <Spinner v-if="isLoading" />
      <h1>{{ $t("view-userDetails.userDetails") }}</h1>
      <v-divider class="cyan"></v-divider>
      <v-container fluid v-if="!isLoading">
        <div class="d-flex justify-space-between">
          <div class="d-flex justify-start">
            <div>
              <v-img
                :src="userDetailsData.avatar"
                width="200"
                height="200"
                aspect-ratio="1"
                class="mr-auto"
              ></v-img>
            </div>
            <div class="d-block ml-5">
              <div class="cyan--text">
                {{ $t("view-userDetails.username") }}
                <span class="white--text"> {{ userDetailsData.userName }}</span>
              </div>
              <div class="cyan--text">
                {{ $t("view-userDetails.birthday") }}
                <span class="white--text">{{ userDetailsData.birthday }}</span>
              </div>
              <div class="cyan--text">
                {{ $t("view-userDetails.from") }}
                <span class="white--text">{{ country }}</span>
              </div>
              <div class="cyan--text">
                {{ $t("view-userDetails.friendsSince") }}
                <span class="white--text">{{ formatFriendshipDate() }}</span>
              </div>
              <div class="cyan--text mt-5">
                <v-btn fab color="white" @click="sendMessage"
                  ><v-icon color="primary">mdi-forum</v-icon></v-btn
                >
              </div>
            </div>
          </div>
          <div>
            <v-btn tile color="cyan" outlined @click="comeback">Volver</v-btn>
          </div>
        </div>
        <div class="d-flex text-h5 ma-5 cyan--text">
          {{ $t("view-userDetails.favouriteGenres") }}
        </div>
        <div class="d-flex justify-start">
          <div
            class="genre-wrapper"
            v-for="(genre, i) in userDetailsData.favouriteGenres"
            :key="i"
          >
            <div class="fav-genre">{{ formatGenre(genre) }}</div>
          </div>
        </div>
        <div class="d-flex text-h5 ma-5 cyan--text">
          {{ $t("view-userDetails.savedMovies") }}
        </div>
        <div v-for="(item, i) in userMoviesData" :key="i">
          <h3 class="mb-5 white--text text-center" v-if="item.movies.length">
            {{ $t(`view-userDetails.${item.category}`) }}
          </h3>
          <v-row>
            <v-col v-for="(movie, i) in item.movies" :key="i" cols="3">
              <router-link :to="`/movie/${movie.id}`" class="movie-link">
                <v-card
                  height="auto"
                  tile
                  class="elevation-10 movie-card indigo darken-4 white--text"
                >
                  <v-card-title class="justify-center">
                    {{ movie.title }}
                  </v-card-title>
                  <v-card-text>
                    <v-img
                      :key="reUpdateComponentKey"
                      :src="
                        movie.backdrop_path !== undefined
                          ? imageURL + movie.backdrop_path
                          : movie.poster_path !== undefined
                          ? imageURL + movie.poster_path
                          : no_image
                      "
                      :class="movie.backdrop_path ? 'movie__img--backdrop-path' : 'movie__img--poster-path'"
                    />
                  </v-card-text>
                </v-card>
              </router-link>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { db } from "../../firebase";
import Spinner from "../components/Spinner";
import axios from "axios";
export default {
  components: {
    Spinner,
  },
  data() {
    return {
      userDocID: this.$route.params.id,
      country: "",
      userMoviesData: [
        {
          category: "favouriteData",
          movies: [],
        },
        {
          category: "watchedData",
          movies: [],
        },
        {
          category: "wishListData",
          movies: [],
        },
        {
          category: "ratedData",
          movies: [],
        },
      ],
    };
  },
  computed: {
    ...mapState([
      "userDetailsData",
      "isLoading",
      "friendshipDate",
      "imageURL",
      "no_image",
      "reUpdateComponentKey",
    ]),
  },
  created() {
    this.getAllMyFriends();
  },
  mounted() {
    this.getUserData();
    this.userMoviesData.map(
      (movie) => (movie.movies = this.getSavedMovies(movie.category))
    );
  },
  methods: {
    ...mapActions(["getAllMyFriends"]),
    comeback () {
      this.$router.go(-1);
    },
    async getUserData() {
      const userdocID = this.userDocID || this.$route.params.id;
      const USER_REF = await db.doc(`userData/${userdocID}`).get();
      let userData = USER_REF.data();
      this.computeCodeToCountry(userData.country);
      await this.$store.dispatch("getUserDetailsData", {
        data: userData,
        id: this.userDocID,
      });
      this.userMoviesData.map(
      (movie) => (movie.movies = this.getSavedMovies(movie.category))
    );
    },
    getSavedMovies(category) {
      const { favouriteData, watchedData, wishListData, ratedData } =
        this.userDetailsData;
      let data = {
        ["favouriteData"]: favouriteData.moviesList,
        ["watchedData"]: watchedData.moviesList,
        ["wishListData"]: wishListData.moviesList,
        ["ratedData"]: ratedData.moviesList,
      };
      console.log("User movies ==> ", data[category]);
      return data[category];
    },
    sendMessage() {
      this.$store.commit("setChatIsActivated", true);
      this.$store.commit("setUserToChat", this.$route.params.id);
    },
    computeCodeToCountry(code) {
      let apiURL = `https://restcountries.com/v3.1/alpha/${code}`;
      let spa, eng;
      axios.get(apiURL).then((res) => {
        let data = res.data[0];
        eng = data.name.common;
        let {
          translations: {
            spa: { common },
          },
        } = data;
        spa = common;
      });
      this.country = this.$i18n.locale === "es-ES" ? spa : eng;
    },
    formatFriendshipDate() {
      const [day, month, year] = this.friendshipDate.split("-");
      console.log(this.friendshipDate);

      // TODO: Continuar

      const months = {
        1: this.$t(`months.january`),
        2: this.$t(`months.february`),
        3: this.$t(`months.march`),
        4: this.$t(`months.april`),
        5: this.$t(`months.may`),
        6: this.$t(`months.june`),
        7: this.$t(`months.july`),
        8: this.$t(`months.august`),
        9: this.$t(`months.september`),
        10: this.$t(`months.october`),
        11: this.$t(`months.november`),
        12: this.$t(`months.december`),
      };

      return `${day} de ${months[month]} de ${year}`;
    },
    formatGenre(genre) {
      let genres = {
        ["28"]: this.$t("genres.action"),
        ["12"]: this.$t("genres.adventure"),
        ["16"]: this.$t("genres.animation"),
        ["35"]: this.$t("genres.comedy"),
        ["80"]: this.$t("genres.crime"),
        ["99"]: this.$t("genres.documentary"),
        ["18"]: this.$t("genres.drama"),
        ["10751"]: this.$t("genres.family"),
        ["14"]: this.$t("genres.fantasy"),
        ["36"]: this.$t("genres.history"),
        ["27"]: this.$t("genres.horror"),
        ["10402"]: this.$t("genres.music"),
        ["9648"]: this.$t("genres.mystery"),
        ["10749"]: this.$t("genres.romance"),
        ["878"]: this.$t("genres.sci-fi"),
        ["10770"]: this.$t("genres.tv"),
        ["53"]: this.$t("genres.thriller"),
        ["10752"]: this.$t("genres.war"),
        ["37"]: this.$t("genres.western"),
      };
      return genres[genre];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";
@import "src/scss/app";

.fav-genre {
  text-align: center;
  padding: 10px;
  padding-inline: 30px;
  min-width: 150px;
  margin-inline: 10px;
  background: $gradient_1;
  border-radius: 15px;
}

.genre-wrapper {
  min-width: 100px;
}

.movie__img--backdrop-path {
  width: auto;
  max-width: 50vh;
  margin: 0 auto;
}

.movie__img--poster-path {
  max-width: 20vh;
  max-height: 40vh;
  margin: 0 auto;
}

.movie-link {
  transition: all 0.3s ease-out;
  text-decoration: none;
}
.movie-card {
  transition: all 0.3s ease-out;
  &:hover {
    transform: scale(1.15);
  }
}
.movie-card {
  width: auto;
  max-width: 50vh;
  height: auto;
  background: linear-gradient(to right, rgb(33, 33, 33), rgb(0, 20, 56));
  margin-bottom: 100px;
  box-shadow: 0px 10px 10px black;
  margin: 20px;
}
</style>

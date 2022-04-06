<template>
  <div>
    <v-container>
      <Spinner v-if="isLoading" />
      <h1>User details</h1>
      <v-divider class="cyan"></v-divider>
      <v-container fluid v-if="!isLoading">
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
              Username:
              <span class="white--text"> {{ userDetailsData.userName }}</span>
            </div>
            <div class="cyan--text">
              Cumpleaños: <span class="white--text">{{ userDetailsData.birthday }}</span>
            </div>
            <div class="cyan--text">
              De:
              <span class="white--text">{{ country }}</span>
            </div>
            <div class="cyan--text">
              Amigos desde: <span class="white--text">{{ formatFriendshipDate(friendshipDate) }}</span>
            </div>
            <div class="cyan--text mt-5">
              <v-btn fab color="white" @click="sendMessage"
                ><v-icon color="primary">mdi-forum</v-icon></v-btn
              >
            </div>
          </div>
        </div>
        <div class="d-flex text-h5 ma-5 cyan--text">
          Géneros favoritos:
        </div>
        <div class="d-flex justify-start">
          <div class="genre-wrapper" v-for="(genre, i) in userDetailsData.favouriteGenres" :key="i">
            <div class="fav-genre">{{ formatGenre(genre) }}</div>
          </div>
        </div>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
      country: '',
      reRenderComponent: 0,
    };
  },
  computed: {
    ...mapState(["userDetailsData", "isLoading", "friendshipDate"]),
  },
  created() {
    this.getUserData();
    console.log(this.userDetailsData)
  },
  methods: {
    async getUserData() {
      const USER_REF = await db.doc(`userData/${this.userDocID}`).get();
      let userData = USER_REF.data();
      this.computeCodeToCountry(userData.country);
      this.$store.dispatch("getUserDetailsData", {
        data: userData,
        id: this.userDocID,
      });
    },
    sendMessage() {
      this.$store.commit("setChatIsActivated", true);
      this.$store.commit("setUserToChat", this.$route.params.id);
    },
    async computeCodeToCountry(code) {
      let apiURL = `https://restcountries.com/v3.1/alpha/${code}`;
      let spa, eng;
      await axios
      .get(apiURL)
      .then((res) => {
          let data = res.data[0];
          eng = data.name.common;
          let {
            translations: {
              spa: { common },
            },
          } = data;
            spa = common;
      });
      this.country = this.$i18n.locale === 'es-ES' ? spa : eng;
    },
    formatFriendshipDate (date) {
      console.log(date)
      const [day, month, year] = date.split('-');

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
      }

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

<style lang="scss">
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

</style>

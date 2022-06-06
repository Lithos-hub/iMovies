<template>
  <div>
    <v-row class="register justify-center">
      <v-col lg="11">
        <v-card class="pa-5" dark>
          <v-row>
            <v-col cols="12" lg="6" md="6" sm="12">
                <h5 class="text-h5 text-center cyan--text">
                  {{ $t("view-register.create") }}
                </h5>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="12">
                <v-btn tile to="/" class="btn-gradient2 mb-5" block>
                  {{ $t("view-register.comeback") }}</v-btn
                >
            </v-col>
          </v-row>
          <v-divider class="cyan my-1"></v-divider>
          <v-form ref="form" v-model="valid">
            <div v-if="avatar !== ''" class="mt-5">
              <v-btn
                id="avatar-remove-btn"
                fab
                width="20"
                height="20"
                color="error"
                @click="avatar = ''"
              >
                <v-icon color="white" size="18"> mdi-close </v-icon>
              </v-btn>
              <v-img
                :src="avatar"
                width="120"
                height="120"
                class="avatar ma-5 ma-auto"
              ></v-img>
            </div>
            <v-row>
              <v-col cols="12" lg="6" md="6" sm="12">
                <v-text-field
                  required
                  color="cyan"
                  :rules="nameRules"
                  type="text"
                  v-model="username"
                  :label="$t('view-register.username')"
                  counter="15"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6" sm="12">
                <v-text-field
                  required
                  color="cyan"
                  :rules="emailRules"
                  type="email"
                  v-model="email"
                  :label="$t('view-register.email')"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="6" md="6" sm="12">
                <v-text-field
                  required
                  color="cyan"
                  :rules="[passwordRules.required, passwordRules.length]"
                  type="password"
                  v-model.trim="password"
                  :label="$t('view-register.password')"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6" sm="12">
                <v-text-field
                  required
                  color="cyan"
                  :rules="[passwordRules.match, passwordRules.required]"
                  type="password"
                  v-model.trim="repassword"
                  :label="$t('view-register.repeat')"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col class="pa-0 ma-0">
                <v-select
                  v-model="favouriteGenres"
                  item-text="text"
                  item-value="value"
                  multiple
                  chips
                  dark
                  color="cyan"
                  deletable-chips
                  prepend-icon="mdi-movie-open"
                  :items="genresList"
                  :label="$t('view-register.favouriteGenres')"
                ></v-select>
                <v-menu
                  ref="menu"
                  v-model="birthdayMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateFormatted"
                      :label="$t('view-register.birthday')"
                      prepend-icon="mdi-calendar"
                      readonly
                      color="cyan"
                      v-bind="attrs"
                      v-on="on"
                      @blur="date = parseDate(dateFormatted)"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    locale="es-es"
                    :active-picker.sync="activePicker"
                    color="gradient-background-1"
                    :max="
                      new Date(
                        Date.now() - new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .substr(0, 10)
                    "
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col class="mt-3" cols="12" lg="6" md="6" sm="12">
                <small
                  >{{ $t("view-register.country") }}:
                  <span class="cyan--text ml-3">{{
                    selectedCountry
                  }}</span></small
                >
                <v-list
                  id="country-list"
                  class="mt-5"
                  :key="renderComponentKey"
                >
                  <v-list-item-group color="white">
                    <v-list-item v-if="loadingCountries">
                      <v-progress-circular
                        indeterminate
                        color="cyan"
                        size="30"
                        width="2"
                        class="mx-auto"
                      ></v-progress-circular>
                    </v-list-item>
                    <v-list-item
                      v-else
                      v-for="(country, i) in countriesList"
                      :key="i"
                      @click="selectCountry(country)"
                      active-class="primary"
                    >
                      <v-list-item-title class="d-flex justify-space-around"
                        ><div
                          :class="`my-auto ${country.color || 'white'}--text`"
                        >
                          {{
                            $i18n.locale === "es-ES"
                              ? country.text.spa
                              : country.text.eng
                          }}
                        </div>
                        <v-img
                          class="flag-image ml-auto"
                          :src="country.flag"
                          max-width="40px"
                          height="auto"
                          aspect-ratio="1"
                        ></v-img
                      ></v-list-item-title>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>

            <v-dialog v-model="avatarDialog" width="800" persistent>
              <template v-slot:activator="{ on, attrs }">
                <div class="text-center">
                  <v-btn
                    color="green"
                    tile
                    width="250px"
                    class="my-5"
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ $t("view-register.choose") }}
                  </v-btn>
                </div>
              </template>

              <v-card>
                <v-card-title
                  class="headline gradient-background-1 white--text shadow-text"
                >
                  {{ $t("view-register.choose") }}
                </v-card-title>
                <v-container fluid class="pa-5">
                  <v-row>
                    <v-col
                      lg="2"
                      cols="4"
                      v-for="(url, i) in avatar_imgs"
                      class="text-center"
                      :key="i"
                    >
                      <v-avatar
                        size="100"
                        id="avatar-img"
                        @click="selectAvatar(url)"
                      >
                        <v-img :src="url" aspect-ratio="1"></v-img>
                      </v-avatar>
                    </v-col>
                  </v-row>
                </v-container>
                <v-card-actions>
                  <v-btn
                    tile
                    block
                    color="secondary"
                    @click="avatarDialog = false"
                    >{{ $t("view-register.close") }}</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>

            <div class="text-center">
              <v-btn
                :loading="loadingCreate"
                :disabled="loadingCreate"
                block
                class="btn-gradient1"
                @click="validate"
              >
                {{ $t("view-register.register") }}
              </v-btn>
            </div>
          </v-form>
        </v-card>
        <div v-if="registered" id="signin-success-wrapper">
          <div id="signin-success-content">
            <v-alert class="mt-5 text-center success-alert">
              {{ $t("view-register.success") }}</v-alert
            >
            <h4 class="cyan--text mt-5 text-center">
              {{ $t("view-register.comingback") }}
              <v-progress-circular
                :size="50"
                color="cyan"
                class="d-block mx-auto mt-5"
                indeterminate
              ></v-progress-circular>
            </h4>
          </div>
        </div>
      </v-col>
    </v-row>
    <div v-if="snackbarObject.snackbar">
      <Snackbar
        :snackbar-color="snackbarObject.snackbarColor"
        :snackbar-text="snackbarObject.snackbarText"
      />
    </div>
  </div>
</template>

<script>
import Snackbar from "../components/Snackbar";
import axios from "axios";
import { mapActions, mapState } from "vuex";
import { auth, db, storage } from "../../firebase.js";

export default {
  components: {
    Snackbar,
  },
  data() {
    return {
      renderComponentKey: 0,
      avatarDialog: false,
      valid: false,
      fb_user: null,
      loadingCreate: false,
      username: "",
      email: "",
      password: "",
      repassword: "",
      avatar: "",
      cityName: "",
      selectedCountry: "",
      dateFormatted: "",
      registered: false,
      countryCode: null,
      loadingCountries: false,
      countriesList: [],
      nameRules: [
        (v) => !!v || this.$t("view-register.nameRequired"),
        (v) => v.length < 15 || this.$t("view-register.maximum"),
      ],
      emailRules: [
        (v) => !!v || this.$t("view-register.emailRequired"),
        (v) => /.+@.+\..+/.test(v) || this.$t("view-register.emailInvalid"),
      ],
      passwordRules: {
        required: (v) => !!v || this.$t("view-register.passwordRequired"),
        length: (v) => v.length >= 8 || this.$t("view-register.passwordLength"),
        match: (v) =>
          v === this.password || this.$t("view-register.passwordMatch"),
      },
      avatar_imgs: [],
      activePicker: null,
      date: null,
      birthdayMenu: false,
      favouriteGenres: [],
      genresList: [
        { value: "28", text: this.$t("genres.action") },
        { value: "12", text: this.$t("genres.adventure") },
        { value: "16", text: this.$t("genres.animation") },
        { value: "35", text: this.$t("genres.comedy") },
        { value: "80", text: this.$t("genres.crime") },
        { value: "99", text: this.$t("genres.documentary") },
        { value: "18", text: this.$t("genres.drama") },
        { value: "10751", text: this.$t("genres.family") },
        { value: "14", text: this.$t("genres.fantasy") },
        { value: "36", text: this.$t("genres.history") },
        { value: "27", text: this.$t("genres.horror") },
        { value: "10402", text: this.$t("genres.music") },
        { value: "9648", text: this.$t("genres.mystery") },
        { value: "10749", text: this.$t("genres.romance") },
        { value: "878", text: this.$t("genres.sci-fi") },
        { value: "10770", text: this.$t("genres.tv") },
        { value: "53", text: this.$t("genres.thriller") },
        { value: "10752", text: this.$t("genres.war") },
        { value: "37", text: this.$t("genres.western") },
      ],
    };
  },
  computed: {
    ...mapState(["snackbarObject", "user"]),
  },
  mounted() {
    this.getAvatarsImages();
    this.searchAllCountries();
  },
  watch: {
    birthdayMenu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
  methods: {
    ...mapActions(["showSnackbar"]),
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("-");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    checkPasswords() {
      this.password === this.repassword
        ? ""
        : this.$t("view-register.passwordMatch");
    },
    selectCountry(name) {
      this.selectedCountry =
        this.$i18n.locale === "es-ES" ? name.text.spa : name.text.eng;
      this.countryCode = name.code;
      const countryListHTML = document.querySelector("#country-list");
      countryListHTML.addEventListener("mouseleave", (e) => {
        countryListHTML.scrollTo(0, 0);
        this.countriesList[0] = {
          text: name.text,
          flag: name.flag,
          color: "cyan",
        };
        setTimeout(() => {
          this.renderComponentKey += 1;
        }, 250);
      });
    },
    async searchAllCountries() {
      this.loadingCountries = true;
      let apiURL = "https://restcountries.com/v3.1/all";
      await axios
        .get(apiURL)
        .then((res) => {
          this.countriesList.push({
            text: "",
            flag: "",
          });
          for (let country of res.data) {
            let {
              cca2,
              flags: { png },
              translations: {
                spa: { common },
              },
            } = country;
            this.countriesList.push({
              code: cca2,
              text: {
                spa: common,
                eng: country.name.common,
              },
              flag: png,
            });
          }
          if (this.$i18n.locale === "en-EN") {
            this.countriesList.sort((a, b) =>
              a.text.eng.localeCompare(b.text.eng)
            );
          } else {
            this.countriesList.sort((a, b) =>
              a.text.spa.localeCompare(b.text.spa)
            );
          }
          this.loadingCountries = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingCountries = false;
        });
    },
    validate() {
      this.loadingCreate = true;
      const USERNAME = this.username;
      const EMAIL = this.email;
      const PASSWORD = this.password;
      const AVATAR = this.avatar;
      const BIRTHDAY = this.dateFormatted;
      const COUNTRY = this.countryCode;
      const FAVOURITE_GENRES = this.favouriteGenres;

      this.valid = this.$refs.form.validate();

      if (!this.valid) {
        this.showSnackbar({
          text: this.$t("view-register.formularioInvalido"),
          color: "red",
        });
        this.loadingCreate = false;
      } else {
        let users = [];

        db.collection("userData")
          .get()
          .then((snapshot) => {
            for (let user of snapshot.docs) {
              users.push({
                username: user.data().userName,
                email: user.data().userEmail,
              });
            }
            let userExists = users.find((user) => user.username === USERNAME);
            if (userExists) {
              this.showSnackbar({
                text: this.$t("view-register.userExists"),
                color: "red",
              });
              this.loadingCreate = false;
            } else {
              // Firebase auth service
              auth
                .createUserWithEmailAndPassword(EMAIL, PASSWORD)
                .then((userCredential) => {
                  this.$store.commit("setUser", userCredential.user);
                  // When signed in, we store the user with its ID, userName, and avatar in Firestore
                  const addUser = async () => {
                    try {
                      // ? First, we will save the user in the "userData" collection
                      // ? with the unique ID generated by firestore (docID)
                      const USER_DATA_REF = db.collection("userData").doc();
                      const newID = USER_DATA_REF.id;
                      this.$store.commit("setDocID", newID);
                      localStorage.setItem("docID", newID);
                      await USER_DATA_REF.set({
                        docID: newID,
                        userID: userCredential.user.uid,
                        userName: USERNAME,
                        userEmail: EMAIL,
                        avatar: AVATAR,
                        birthday: BIRTHDAY,
                        country: COUNTRY,
                        favouriteGenres: FAVOURITE_GENRES,
                      });
                      await this.$store.dispatch("updateProfile", {
                        userName: USERNAME,
                        userEmail: "",
                        userPassword: "",
                        userAvatar: AVATAR,
                      });
                      await this.createSubCollection();
                      this.registered = !this.registered;
                      this.loadingCreate = false;
                      setTimeout(() => {
                        this.$router.push("/home");
                      }, 3000);
                    } catch (e) {
                      console.error(e);
                      this.loadingCreate = false;
                    }
                  };
                  addUser();
                })
                .catch((error) => {
                  console.log("Catched!", error);
                  this.showSnackbar({
                    text: this.$t("view-register.userExists"),
                    color: "red",
                  });
                  this.loadingCreate = false;
                });
            }
          });
      }
    },
    async createSubCollection() {
      const myDocID = localStorage.getItem("docID");
      await db.doc(`userData/${myDocID}/myMovies/favouriteMovies`).set({
        moviesList: [],
      });
      await db.doc(`userData/${myDocID}/myMovies/watchedMovies`).set({
        moviesList: [],
      });
      await db.doc(`userData/${myDocID}/myMovies/wishListMovies`).set({
        moviesList: [],
      });
      await db.doc(`userData/${myDocID}/myMovies/ratedMovies`).set({
        moviesList: [],
      });
      await db.doc(`userData/${myDocID}/triviaQuestions/resolved`).set({
        questions: [],
      });
      await db.doc(`userData/${myDocID}/rewards/achievements`).set({
        codes: [],
      });
      await db.doc(`userData/${myDocID}/iMovies-Sections/sections`).set({
        visited: [],
      });
      await db.doc(`userData/${myDocID}/mySocialRequests/accepted`).set({
        acceptedList: [],
      });
      await db.doc(`userData/${myDocID}/mySocialRequests/rejected`).set({
        rejectedList: [],
      });
      await db.doc(`userData/${myDocID}/mySocialRequests/sended`).set({
        sendedList: [],
      });
      await db.doc(`userData/${myDocID}/mySocialRequests/received`).set({
        receivedList: [],
      });
    },
    async getAvatarsImages() {
      let pathReference = storage.ref("avatars");
      let arr = [];
      await pathReference
        .listAll()
        .then((res) => {
          res.items.forEach((item) => {
            item.getDownloadURL().then(async (url) => {
              arr.push(url);
            });
          });
          this.avatar_imgs = arr;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectAvatar(url) {
      this.avatar = url;
      this.avatarDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";
@import "src/scss/app";

.register {
  position: absolute;
  padding-block: 2em;
  inset: 0;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.btn-gradient1 {
  background: $gradient_1;
  color: white !important;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
  border-radius: 5px;
  font-size: 18px;
  width: 150px;
}

.btn-gradient2 {
  background: $gradient_2;
  color: white !important;
}

.success-alert {
  background: $gradient_success;
  color: white !important;
}

#avatar-img {
  transition: 0.5s;

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
}

.avatar {
  border-radius: 50%;
  border: 2px solid white;
}

#avatar-remove-btn {
  position: absolute;
  right: 42%;
  top: 20%;
  transform: translate(50%, -50%);

  &:focus {
    outline: none;
  }
}

#signin-success-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #151515;
}

#signin-success-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#country-list {
  height: 60px;
  overflow-y: scroll;
  border-bottom: 1px solid white;
  transition: all 0.3s ease-in-out;
  background: #303030;

  &:hover {
    height: 250px !important;
  }
}

.flag-image {
  border-radius: 100%;
  padding: 0;
  margin: 0;
}
</style>

<template>
  <div>
    <v-row class="register">
      <v-col></v-col>
      <v-col lg="8" md="10" cols="10">
        <v-card class="pa-5" dark>
          <div class="d-flex justify-space-between">
            <div>
              <h5 class="text-left text-h4 cyan--text">
                {{ $t("view-register.create") }}
              </h5>
            </div>
            <div>
              <v-btn tile to="/" class="btn-gradient2 mb-5" width="250px">
                {{ $t("view-register.comeback") }}</v-btn
              >
            </div>
          </div>
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
              <v-col cols="6">
                <v-text-field
                  required
                  :rules="nameRules"
                  type="text"
                  v-model="username"
                  :label="$t('view-register.username')"
                  counter="15"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  required
                  :rules="emailRules"
                  type="email"
                  v-model="email"
                  :label="$t('view-register.email')"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  required
                  :rules="[passwordRules.required, passwordRules.length]"
                  type="password"
                  v-model.trim="password"
                  :label="$t('view-register.password')"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  required
                  :rules="[passwordRules.match, passwordRules.required]"
                  type="password"
                  v-model.trim="repassword"
                  :label="$t('view-register.repeat')"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col class="mt-auto">
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
              <v-col>
                <!-- <v-combobox
                  v-model="cityName"
                  item-text="text"
                  item-value="text"
                  chips
                  append-icon="mdi-map-marker"
                  :label="$t('view-register.country')"
                  @input="searchCityName(cityName)"
                /> -->
                <small class="pb-2 ma-0">{{ $t('view-register.country') }}: <span class="cyan--text ml-3">{{ selectedCountry }}</span></small>
                <v-list id="country-list" class="mt-5">
                  <v-list-item-group color="white">
                  <v-list-item v-for="(country, i) in countriesList" :key="i" @click="selectCountry(country)" active-class="primary">
                    <v-list-item-title class="d-flex justify-space-around"><div class="my-auto">{{ country.text }}</div> <v-img class="flag-image ml-auto" :src="country.flag" max-width="40px" height="auto" aspect-ratio="1"></v-img></v-list-item-title>
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
      <v-col></v-col>
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
    menu(val) {
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
    selectCountry (name) {
      this.selectedCountry = name.text
    },
    // async searchCityName(name) {
    //   let apiURL = `https://restcountries.com/v3.1/name/${name}`
    //   await axios.get(apiURL).then((res) => {
    //     let data = res.data
    //     for (let country of data) {
    //       let { 
    //         translations: {
    //           spa: {
    //             common
    //           }
    //         }
    //       } = country
    //       this.countriesList.push(common)
    //     }
    //     this.$forceUpdate()
    //   });
    // },
    async searchAllCountries () {
      let apiURL = 'https://restcountries.com/v3.1/all'
      await axios.get(apiURL).then((res) => {
        for (let country of res.data) {
          let { 
            flags: {
              png
            },
            translations: {
              spa: {
                common
              }
            }
          } = country
          this.countriesList.push({
            text: common,
            flag: png
          })
        }
      })
    },
    validate() {
      this.loadingCreate = true;
      const USERNAME = this.username;
      const EMAIL = this.email;
      const PASSWORD = this.password;
      const AVATAR = this.avatar;

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
                  let user = userCredential.user;
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
                        userID: user.uid,
                        userName: USERNAME,
                        userEmail: EMAIL,
                        avatar: AVATAR,
                      });
                      await this.$store.dispatch("updateProfile", {
                        userName: USERNAME,
                        userEmail: null,
                        userPassword: null,
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
      await db.doc(`userData/${myDocID}/iMovies-Sections/sections`).set({
        visited: [],
      });
      await db.doc(`userData/${myDocID}/myFriends/accepted`).set({
        acceptedList: [],
      });
      await db.doc(`userData/${myDocID}/myFriends/rejected`).set({
        rejectedList: [],
      });
      await db.doc(`userData/${myDocID}/myFriends/sended`).set({
        sendedList: [],
      });
      await db.doc(`userData/${myDocID}/myFriends/requestInbox`).set({
        requestsList: [],
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
  margin-bottom: 20px;
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

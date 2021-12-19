<template>
  <div>
    <v-row class="register">
      <v-col></v-col>
      <v-col lg="8" md="10" cols="10">
        <v-card class="pa-5" dark>
          <div class="text-center">
            <v-btn to="/" class="btn-gradient2 mb-5" width="250px">
              {{ $t("view-register.comeback") }}</v-btn
            >
            <h5 class="text-center">
              {{ $t("view-register.create") }}
            </h5>
          </div>
          <v-divider></v-divider>

          <v-form ref="form" v-model="valid">
            <div v-if="avatar !== ''">
              <v-img
                :src="avatar"
                width="120"
                height="120"
                class="avatar ma-5 ma-auto"
              ></v-img>
            </div>

            <v-text-field
              required
              :rules="nameRules"
              type="text"
              v-model="username"
              :label="$t('view-register.username')"
              counter="15"
            ></v-text-field>
            <v-text-field
              required
              :rules="emailRules"
              type="email"
              v-model="email"
              :label="$t('view-register.email')"
            ></v-text-field>
            <v-text-field
              required
              :rules="[passwordRules.required, passwordRules.length]"
              type="password"
              v-model.trim="password"
              :label="$t('view-register.password')"
            ></v-text-field>
            <v-text-field
              required
              :rules="[passwordRules.match, passwordRules.required]"
              type="password"
              v-model.trim="repassword"
              :label="$t('view-register.repeat')"
            ></v-text-field>

            <v-dialog v-model="avatarDialog" width="800" persistent>
              <template v-slot:activator="{ on, attrs }">
                <div class="text-center">
                  <v-btn
                    color="green"
                    rounded
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
              <v-btn color="darken-1" class="btn-gradient1" @click="validate">
                {{ $t("view-register.register") }}
              </v-btn>
            </div>
          </v-form>
        </v-card>
        <div v-if="registered">
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
      username: "",
      email: "",
      password: "",
      repassword: "",
      avatar: "",
      registered: false,
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
    };
  },
  computed: {
    ...mapState(["snackbarObject", "user"]),
  },
  mounted () {
    this.getAvatarsImages()
  },
  methods: {
    ...mapActions(["showSnackbar"]),
    checkPasswords() {
      this.password === this.repassword
        ? ""
        : this.$t("view-register.passwordMatch");
    },
    validate() {
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
            } else {
              // Firebase auth service
                auth
                .createUserWithEmailAndPassword(EMAIL, PASSWORD)
                .then((userCredential) => {
                  let user = userCredential.user;
                  // When signed in, we store the user with its ID, userName, and avatar in Firestore
                  const addUser = async () => {
                    try {
                      // First, we will save the user in the "userData" collection
                      await db.collection("userData").add({
                        userID: user.uid,
                        userName: USERNAME,
                        userEmail: EMAIL,
                        avatar: AVATAR,
                        myMovies: {
                          favourite: [],
                          watched: [],
                          wishlist: [],
                          rated: [],
                        },
                      });
                      await this.$store.dispatch('updateProfile', {
                        userName: USERNAME,
                        userEmail: null,
                        userPassword: null,
                        userAvatar: AVATAR,
                      })

                      this.registered = !this.registered;
                      setTimeout(() => {
                        this.$router.push("/home");
                      }, 3000);
                    } catch (e) {
                      console.error(e);
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
                });
            }
          });
      }
    },
    async getAvatarsImages () {
      let pathReference = storage.ref("avatars");
      let arr = []
      await pathReference
      .listAll()
      .then((res) => {
        res.items.forEach((item) => {
          item.getDownloadURL().then(async (url) => {
            arr.push(url)
          })
        })
        this.avatar_imgs = arr
      })
      .catch((err) => {
        console.log(err)
      })
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
  position: relative;
  padding-block: 5em;
  inset: 0;
  justify-content: center;
  align-items: center;
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
</style>

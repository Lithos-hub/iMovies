<template>
  <div>
    <v-row class="register">
      <v-col></v-col>
      <v-col lg="8" md="10" cols="10">
        <v-card class="pa-5" dark>
          <div class="text-center">
          <v-btn to="/" class="btn-gradient2 mb-5" width="250px">
          {{ $t("view-register.comeback") }}</v-btn>
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
              counter="10"
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

            <v-dialog v-model="dialog" width="800" persistent>
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
                <v-card-title class="headline primary darken-2 white--text">
                  {{ $t("view-register.choose") }}
                </v-card-title>
                <v-container fluid class="pa-5">
                  <v-row>
                    <v-col lg="2" v-for="(item, i) in avatar_imgs" :key="i">
                      <v-avatar
                        size="100"
                        id="avatar-img"
                        @click="selectAvatar(item)"
                      >
                        <v-img :src="item" aspect-ratio="1"></v-img>
                      </v-avatar>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-dialog>

            <div class="text-center">
              <v-btn
                color="darken-1"
                class="btn-gradient1"
                @click="validate"
                >
                {{ $t('view-register.register') }}
               </v-btn
              >
            </div>

          </v-form>
        </v-card>
        <div v-show="registered">
          <v-alert class="mt-5 text-center success-alert"
            >
            {{ $t('view-register.success') }}</v-alert
          >
          <h4 class="cyan--text mt-5 text-center">
            {{ $t('view-register.comingback') }}
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
        :snackbar-text="snackbarObject.snackbarText" />
    </div>
  </div>
</template>

<script>
import Snackbar from "../components/Snackbar";
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    Snackbar
  },
  data() {
    return {
      dialog: false,
      valid: false,
      username: "",
      email: "",
      password: "",
      repassword: "",
      avatar: "",
      registered: false,
      nameRules: [
        (v) => !!v || this.$t('view-register.nameRequired'),
        (v) => v.length < 11 || this.$t('view-register.maximum')
      ],
      emailRules: [
        (v) => !!v || this.$t('view-register.emailRequired'),
        (v) => /.+@.+\..+/.test(v) || this.$t('view-register.emailInvalid'),
      ],
      passwordRules: {
        required: (v) => !!v || this.$t('view-register.passwordRequired'),
        length: (v) => v.length >= 8 || this.$t('view-register.passwordLength'),
        match: (v) => v === this.password || this.$t('view-register.passwordMatch')
      },
      avatar_imgs: [
        require("../assets/avatars/godfather1.jpg"),
        require("../assets/avatars/godfather2.jpg"),
        require("../assets/avatars/interstellar1.jpg"),
        require("../assets/avatars/interstellar2.jpg"),
        require("../assets/avatars/jurassicpark1.jpg"),
        require("../assets/avatars/jurassicpark2.jpg"),
        require("../assets/avatars/lotr1.jpg"),
        require("../assets/avatars/lotr2.jpg"),
        require("../assets/avatars/matrix1.jpg"),
        require("../assets/avatars/matrix2.png"),
        require("../assets/avatars/potter1.jpg"),
        require("../assets/avatars/potter2.jpg"),
        require("../assets/avatars/runner1.jpg"),
        require("../assets/avatars/runner2.jpeg"),
        require("../assets/avatars/spiderman1.png"),
        require("../assets/avatars/spiderman2.jpeg"),
        require("../assets/avatars/starwars1.jpg"),
        require("../assets/avatars/starwars2.jpg"),
        require("../assets/avatars/wick1.jpg"),
        require("../assets/avatars/wick2.jpg"),
      ],
    };
  },
  computed: {
    ...mapState(["snackbarObject", "user"]),
  },
  methods: {
    ...mapActions(["showSuccess", "showError"]),
    checkPasswords () {
      this.password === this.repassword ? '' : this.$t('view-register.passwordMatch')
    },
    validate() {
      // First, we check if the user already exists
      let storage = JSON.parse(localStorage.getItem("storageUserDATA")) || [];
        if (storage) {
          for (let user of storage) {
            if (
              user.userEmail === this.email ||
              user.userName === this.username
            ) {
              this.valid = false;
              this.showError("That user already exists!");
            } else {
              this.valid = true;
            }
          }
        }
      
      this.valid = this.$refs.form.validate()
      if (this.valid) {

        let userData = {
          id: storage.length,
          userName: this.username,
          userEmail: this.email,
          userPassword: this.password,
          userAvatar: this.avatar,
          toWatchMovies: [],
          watchedMovies: [],
          favoriteMovies: [],
          ratedMovies: [],
        };

        storage.push(userData);
        localStorage.setItem("storageUserDATA", JSON.stringify(storage));

        this.$store.commit("setUser", userData);

        this.registered = !this.registered;
          setTimeout(() => {
            this.$router.push("/");
          }, 3000);


      } else {
        this.showError('Formulario inválido')
      }
    },
    selectAvatar(item) {
      this.avatar = item;
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss">
@import "src/scss/variables";

.register {
  position: absolute;
  inset: 0;
  justify-content: center;
  align-items: center;
}

.btn-gradient1 {
  background: $gradient_btn1;
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
  background: $gradient_btn2;
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

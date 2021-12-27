<template>
  <div>
    <!-- <v-img src="../assets/img/favicon.jpg" id="background"></v-img> -->
    <v-row :class="displayCols ? 'access' : ''">
      <v-col v-if="displayCols"></v-col>
      <v-col lg="6">
        <v-card
          color="white"
          elevation="10"
          class="transparent"
          width="100%"
          height="100%"
          dark
        >
          <v-card-title id="card-title">
            {{ $t("view-access.welcome") }}
          </v-card-title>
          <v-card-text class="pa-5">
            <v-row>
              <v-col cols="12" class="text-center">
                  <form @submit.prevent="login(email, password)">
                    <v-text-field
                      required
                      id="email-input"
                      :rules="emailRules"
                      v-model="email"
                      :label="$t('view-access.email')"
                      filled
                      type="email"
                      color="cyan darken-1"
                    ></v-text-field>

                    <v-text-field
                      required
                      id="pass-input"
                      v-model.trim="password"
                      :label="$t('view-access.password')"
                      filled
                      type="password"
                      color="cyan darken-1"
                    ></v-text-field>

                    <v-alert
                      dense
                      v-if="formAlert"
                      :color="validUser ? 'success darken-1' : 'red darken-1'"
                      >{{
                        validUser
                          ? $t("view-access.accessSuccess")
                          : $t("view-access.accessError")
                      }}</v-alert
                    >

                    <v-btn
                      :loading="loading"
                      :disabled="email === '' || password.length < 8"
                      type="submit"
                      block
                      class="gradient-btn1"
                      >{{ $t("view-access.enter") }}</v-btn
                    >
                  </form>

                  <v-divider></v-divider>
                  <p class="mt-2 green--text">
                    {{ $t("view-access.notAccount") }}
                  </p>
                  <v-btn block class="mb-2 gradient-btn2" to="/register">{{
                    $t("view-access.register")
                  }}</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="displayCols"></v-col>
    </v-row>
    <div class="language-selector">
      <v-menu open-on-hover offset-y top class="language-menu">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            tile
            width="200px"
            large
            class="language-btn"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-earth</v-icon>
          </v-btn>
        </template>
        <v-list dark width="200px">
          <v-list-item class="text-center">
            <v-list-item-title
              class="language-menu-item"
              id="esp-option"
              @click="changeLanguage('es-ES'), refresh()"
              ><span>ESP</span></v-list-item-title
            >
          </v-list-item>
          <v-list-item class="text-center">
            <v-list-item-title
              class="language-menu-item"
              id="eng-option"
              @click="changeLanguage('en-EN'), refresh()"
              ><span>ENG</span></v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { auth } from "../../firebase.js";

export default {
  data() {
    return {
      loader: null,
      loading: false,
      validUser: false,
      formAlert: false,
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || this.$t("view-access.emailRequired"),
        (v) => /.+@.+\..+/.test(v) || this.$t("view-access.emailInvalid"),
      ],
    };
  },
  computed: {
    ...mapState(["snackbarObject", "user"]),
    displayCols() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return false;
        case "sm":
          return false;
        case "md":
          return true;
        case "lg":
          return true;
        case "xl":
          return true;
      }
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },
  methods: {
    ...mapActions(["showSnackbar", "changeLanguage"]),
    refresh() {
      this.$router.go(0);
    },
    async login(email, password) {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.formAlert = true;
          this.validUser = true;
          this.loader = "loading";
          this.$store.commit("setAuthStatus", true);
          this.$store.commit("setUser", auth.currentUser);
          setTimeout(() => {
            this.$router.push("/home");
          }, 2500);
        })
        .catch(() => {
          this.formAlert = true;
          this.validUser = false;
          this.loader = null;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";
@import "src/scss/app";

// ** COMMON

#background {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}

.access {
  position: relative;
  margin-block: 5%;
}

.info-icon {
  background: linear-gradient(
    25deg,
    rgb(255, 199, 126),
    rgb(206, 130, 30),
    rgb(214, 52, 52),
    rgb(196, 17, 213)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  font-size: 30px;
}

#card-title {
  background: linear-gradient(
    25deg,
    rgb(153, 35, 27),
    rgb(218, 159, 50),
    rgb(247, 94, 255),
    rgb(0, 110, 255)
  );
  color: white;
  font-size: 2em;
  justify-content: center;
}

#card-default {
  background: linear-gradient(
    25deg,
    rgb(255, 199, 126),
    rgb(206, 130, 30),
    rgb(214, 52, 52),
    rgb(196, 17, 213)
  );
}

#card-default-icon {
  font-size: 8em;
  color: white;
}

#card-default-text {
  color: white;
  text-shadow: 0px 0px 10px black;
}

h4 {
  font-size: 18px;
  font-family: $style2;
  background: linear-gradient(
    25deg,
    rgb(136, 174, 255),
    rgb(51, 123, 255),
    rgb(183, 75, 255),
    rgb(48, 217, 255)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: brightness(2);
}

h3 {
  font-family: $style1;
}

h5 {
  color: black;
  font-size: 15px;
}

#card-default {
  transition: 0.3s;

  &:hover {
    transform: scale(1.2);
    cursor: pointer;
    box-shadow: 0px 0px 10px white;
  }
}

.gradient-btn1 {
  background: $gradient_3;
}

.gradient-btn2 {
  background: $gradient_4;
}

.language-btn {
  background: linear-gradient(
    25deg,
    rgb(0, 118, 208),
    rgb(81, 175, 213),
    rgb(46, 163, 162)
  );
}

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  .language-selector {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }

  #card-default-icon {
    font-size: 5em;
    color: white;
  }

  #card-default {
    margin-bottom: 3em;
  }
}

// ******* LAPTOP AND DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  .language-selector {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .language-menu-item {
    cursor: pointer;
    margin: 0 auto;
    padding-inline: 2em;

    span {
      opacity: 0;
    }

    &:hover {
      background: transparent !important;
      color: cyan !important;

      span {
        opacity: 1;
      }
    }
  }

  #esp-option {
    transition: all 0.3s ease-out;
    margin: 0 auto;
    padding: 1em;
    max-width: 70px;
    background: url("../assets/img/spanish-icon.jpg") no-repeat;
    background-size: contain;
    background-position: center;
  }
  #eng-option {
    transition: all 0.3s ease-out;
    margin: 0 auto;
    padding: 1em;
    max-width: 70px;
    background: url("../assets/img/english-icon.jpg") no-repeat;
    background-size: contain;
    background-position: center;
  }
}
</style>

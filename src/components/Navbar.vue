<template>
  <div id="navbar">
    <v-app-bar
      color="secondary darken-2"
      dark
      class="overflow-hidden justify-content-between"
      width="100%"
      elevation="10"
      app
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <div id="username-toolbar">
        <v-progress-circular class="mx-auto" size="30" width="2" color="cyan" indeterminate v-if="isLoadingDynamicUserData"></v-progress-circular>
        <div v-else>
        {{ $t("navbar.user") }}
        <span class="cyan--text">@{{ user.displayName }}</span>
        </div>
      </div>

      <div class="mx-auto">
        <router-link to="/home" class="router-link-default">
          <div class="brand-title">iMovies</div>
        </router-link>
      </div>

      <small v-if="!isUsingMobile" class="white--text mr-3"
        >{{ $t("navbar.lang") }}
        <span class="cyan--text">{{ i18Lang }}</span></small
      >
      <v-menu bottom offset-y v-model="langMenu">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="pink lighten-3"
            fab
            icon
            outlined
            width="100ox"
            small
            class="mr-2"
            v-bind="attrs"
            v-on="on"
            @click="langMenu = true"
          >
            <v-icon class="language-icon"> mdi-earth </v-icon>
          </v-btn>
        </template>
        <v-row no-gutters class="d-flex">
          <v-col>
            <v-list class="lang-list pa-0">
              <v-list-item
                class="ma-0 pa-0"
                @click="
                  changeLanguage('es-ES');
                  refresh();
                "
              >
                <v-list-item-title class="px-5 language-menu-item"
                  ><span class="white--text">{{
                    $t("navbar.esp")
                  }}</span></v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-col>
          <v-col>
            <v-list class="lang-list pa-0">
              <v-list-item
                class="ma-0 pa-0"
                @click="
                  changeLanguage('en-EN');
                  refresh();
                "
              >
                <v-list-item-title class="px-5 language-menu-item"
                  ><span class="white--text">{{
                    $t("navbar.eng")
                  }}</span></v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-menu>

      <v-btn
        outlined
        :tile="!isUsingMobile"
        :fab="isUsingMobile"
        max-width="150px"
        small
        color="red darken-1"
        class="mr-2"
        @click="logout()"
      >
        {{ displayText ? $t("navbar.logout") : "" }}
        <v-icon>mdi-account-cancel</v-icon>
      </v-btn>
      <div>
        <v-btn
          icon
          :small="isUsingMobile"
          :outlined="isUsingMobile"
          :tile="!isUsingMobile"
          :fab="isUsingMobile"
          :width="isUsingMobile ? '' : '100%'"
          :class="isUsingMobile ? 'px-0' : 'px-5'"
          href="https://github.com/Lithos-hub/VUEJS-iMovies"
          target="_blank"
        >
          <v-icon :class="isUsingMobile ? 'ma-0' : 'mr-2'"> mdi-github </v-icon>
          <div v-if="!isUsingMobile" id="version-info" class="ml-2">
            <p>v{{ major }}.{{ minor }}.{{ patch }}</p>
          </div>
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      color="secondary darken-2"
      dark
      app
      width="220px"
    >
      <v-list dense nav>
        <v-list-item-group v-model="group" active-class="black">
          <v-img
            v-if="user.photoURL !== undefined"
            :src="user.photoURL"
            width="90"
            height="90"
            class="avatar ma-5 ma-auto"
          />
          <h5 class="username-drawer text-center my-2">@{{ user.displayName }}</h5>

          <v-list-item to="/home">
            <v-list-item-icon>
              <v-icon class="nav-icons">mdi-home</v-icon>
              <v-list-item-title class="nav-links">{{
                $t("navbar.home")
              }}</v-list-item-title>
            </v-list-item-icon>
          </v-list-item>

          <v-divider></v-divider>

          <div v-for="(item, i) in navbarItems" :key="i">
            <v-list-item
              v-if="isDefault && item.visibleToDefaultUser"
              :to="item.to"
            >
              <v-list-item-icon>
                <v-icon class="nav-icons"> {{ item.icon }} </v-icon>
                <v-list-item-title class="nav-links">
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item
              v-if="!isDefault"
              :to="item.to"
              @click="setComingFromDetails"
            >
              <v-list-item-icon>
                <v-icon class="nav-icons"> {{ item.icon }} </v-icon>
                <v-list-item-title class="nav-links">
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-icon>
            </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>

      <div id="drawer-below-section">
        <v-divider v-if="!isUsingMobile"></v-divider>
        <p id="developedBy">
          {{ date }} <v-icon size="17">mdi-copyright</v-icon>
          {{ $t("navbar.developed") }}<br />
          <a
            href="https://carlosseguragarciaweb.com"
            style="text-decoration: none"
          >
            <small id="developerName">Carlos Segura García</small>
            <p id="visit-my-website">{{ $t("navbar.goTo") }}</p>
          </a>
        </p>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import i18n from "@/plugins/i18n";
import { auth } from "../../firebase.js";

export default {
  data() {
    return {
      date: new Date().getFullYear(),
      id: null,
      major: 2,
      minor: 0,
      patch: 0,
      group: null,
      drawer: false,
      langMenu: false,
      navbarItems: [
        {
          visibleToDefaultUser: false,
          to: "/account",
          text: this.$t("navbar.account"),
          icon: "mdi-account",
        },
        {
          visibleToDefaultUser: false,
          to: "/search",
          text: this.$t("navbar.search"),
          icon: "mdi-magnify",
        },
        {
          visibleToDefaultUser: false,
          to: "/myMovies",
          text: this.$t("navbar.mymovies"),
          icon: "mdi-star",
        },
        {
          visibleToDefaultUser: false,
          to: "/trending",
          text: this.$t("navbar.trending"),
          icon: "mdi-table",
        },
        {
          visibleToDefaultUser: true,
          to: "/trailers",
          text: this.$t("navbar.trailers"),
          icon: "mdi-video-vintage",
        },
        {
          visibleToDefaultUser: true,
          to: "/genres",
          text: this.$t("navbar.genres"),
          icon: "mdi-shape",
        },
        {
          visibleToDefaultUser: false,
          to: "/popular",
          text: this.$t("navbar.ranking"),
          icon: "mdi-format-list-numbered",
        },
        {
          visibleToDefaultUser: true,
          to: "/changelog",
          text: this.$t("navbar.changelog"),
          icon: "mdi-lead-pencil",
        },
        {
          visibleToDefaultUser: true,
          to: "/about",
          text: this.$t("navbar.about"),
          icon: "mdi-information-variant",
        },
      ],
    };
  },
  computed: {
    ...mapState(["isDefault", "user", "isLoadingDynamicUserData"]),
    displayText() {
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
    i18Lang() {
      return i18n.locale.split("-")[0].toUpperCase();
    },
    isUsingMobile() {
      return this.$vuetify.breakpoint.xs;
    },
  },
  methods: {
    ...mapActions(["changeLanguage"]),
    logout() {
      let userStorage = JSON.parse(localStorage.getItem("user"));

      const userData = {};

      this.$store.commit("setDefault", false);
      this.$store.commit("setUser", userData);
      localStorage.setItem("user", JSON.stringify(userData));

      if (userStorage.userName === "defaultUser") {
        this.$router.push("/");
      } else {
        auth
          .signOut()
          .then(() => {
            const userData = {};

            this.$store.commit("setDefault", false);
            this.$store.commit("setUser", userData);
            localStorage.setItem("user", JSON.stringify(userData));

            this.$router.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    refresh() {
      this.$router.go(0);
    },
    setComingFromDetails() {
      this.$store.commit("setComesFromDetails", false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

* {
  color: $primary;
  font-family: $style2;
}

.language-icon {
  background: $gradient_1;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

#username-toolbar {
  position: absolute;
  left: 5%;
  color: $primary;
  font-weight: lighter;
}

.username-drawer {
  background: $gradient_2;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: brightness(3);
}

#drawer-below-section {
  position: absolute;
  left: 50%;
  bottom: 0%;
  transform: translate(-50%, 0%);
  width: 100%;
}

#visit-my-website {
  opacity: 0;
  transition: 0.5s;
  margin-top: 0px;
  text-transform: uppercase;
}

#developerName {
  color: cyan;
  transition: 0.5s;
  opacity: 1;
  text-transform: uppercase;
}

#developedBy:hover {
  #developerName {
    color: white;
  }

  #visit-my-website {
    opacity: 1;
    color: white;
    margin-top: 10px;
    letter-spacing: 2px;
  }
}

.avatar {
  border-radius: 50%;
  border: 2px solid $primary;
}

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  #username-toolbar {
    display: none;
  }

  .username-drawer {
    font-size: 12px;
  }

  .nav-icons {
    font-size: 1em !important;
    padding-block: 5px;
    padding-right: 50px;
  }
  .nav-links {
    font-size: 15px !important;
    text-align: right !important;
    position: absolute;
    right: 10px;
  }

  .router-link-default {
    text-decoration: none;
  }

  .router-link-nav {
    text-decoration: none;
    width: 100%;
  }

  #developedBy {
    position: relative;
    text-align: center;
    margin-top: 40px;
    letter-spacing: 2px;
    font-size: 12px;
    font-family: $style2;
  }

  #version-info {
    position: relative;
    padding-top: 15px;
    right: 0px;
  }

  .lang-list {
    border: 1px solid pink !important;
    background: $gradient_1 !important;
  }

  .language-menu-item {
    text-shadow: 2px 2px 2px black;
    padding: 1em;
    cursor: pointer;
    padding-inline: 2em;
    transition: all 0.3s ease-out;

    &:hover {
      background: $dark2 !important;
      color: aqua !important;
    }
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  #username-toolbar {
    display: block;
  }

  .brand-title {
    font-size: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .nav-icons {
    font-size: 14px !important;
    padding-block: 5px;
    padding-right: 50px;
  }
  .nav-links {
    font-size: 14px !important;
    text-align: right !important;
    position: absolute;
    right: 10px;
  }

  .router-link-default {
    text-decoration: none;
  }

  .router-link-nav {
    text-decoration: none;
    width: 100%;
  }

  #developedBy {
    position: relative;
    text-align: center;
    margin-top: 40px;
    letter-spacing: 2px;
    font-size: 13px;
    font-family: $style2;
  }

  #version-info {
    position: relative;
    padding-top: 15px;
    right: 5px;
  }

  #csg-link {
    transition: 0.5s;

    &:hover {
      color: white;
      transform: scale(1.1);
    }
  }

  .lang-list {
    border: 1px solid pink !important;
    background: $gradient_1 !important;
  }

  .language-menu-item {
    text-shadow: 2px 2px 2px black;
    padding: 1em;
    cursor: pointer;
    padding-inline: 2em;
    transition: all 0.3s ease-out;

    &:hover {
      background: $dark2 !important;
      color: aqua !important;
    }
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  #username-toolbar {
    display: block;
  }

  .username-drawer {
    font-size: 18px;
  }

  .brand-title {
    font-size: 25px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .nav-icons {
    font-size: 16px !important;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-right: 50px;
  }
  .nav-links {
    font-size: 16px !important;
    text-align: right !important;
    position: absolute;
    right: 10px;
  }

  .router-link-default {
    text-decoration: none;
  }

  .router-link-nav {
    text-decoration: none;
    width: 100%;
  }

  #developedBy {
    position: relative;
    text-align: center;
    color: white;
    margin-top: 40px;
    letter-spacing: 2px;
    font-size: 15px;
    font-family: $style3;
  }

  #version-info {
    position: relative;
    padding-top: 15px;
    right: 5px;
  }

  #csg-link {
    transition: 0.5s;

    &:hover {
      color: white;
      transform: scale(1.1);
    }
  }

  .lang-list {
    border: 1px solid pink !important;
    background: $gradient_1 !important;
  }

  .language-menu-item {
    text-shadow: 2px 2px 2px black;
    padding: 1em;
    cursor: pointer;
    padding-inline: 2em;
    transition: all 0.3s ease-out;

    &:hover {
      background: $dark2 !important;
      color: aqua !important;
    }
  }
}
</style>

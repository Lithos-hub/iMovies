<template>
  <div id="navbar">
    <v-app-bar
      color="secondary darken-2"
      dark
      dense
      class="overflow-hidden justify-content-between"
      width="100%"
      elevation="10"
      app
    >
      <v-app-bar-nav-icon
        width="30"
        height="30"
        @click="drawer = true"
      ></v-app-bar-nav-icon>

      <div id="username-toolbar">
        <v-progress-circular
          class="mx-auto"
          size="30"
          width="2"
          color="cyan"
          indeterminate
          v-if="isLoadingDynamicUserData"
        ></v-progress-circular>
        <div v-else>
          {{ $t("navbar.user") }}
          <span class="cyan--text">@{{ user.displayName }}</span>
        </div>
      </div>

      <!-- // ** Notifications button ** // -->
      <v-menu bottom offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ml-2" small fab icon v-bind="attrs" v-on="on">
            <div
              v-if="!notifications.every((noti) => noti.isRead)"
              id="notification-wrapper"
            >
              <div id="notification-dot"></div>
              <v-icon color="white">mdi-bell</v-icon>
            </div>
            <v-icon v-else color="white">mdi-bell</v-icon>
          </v-btn>
        </template>
        <v-card min-width="350" class="mx-auto text-left" tile dark>
          <v-toolbar class="gradient-background-1" dark dense>
            <v-toolbar-title class="white--text"
              >Notificaciones</v-toolbar-title
            >
          </v-toolbar>
          <v-list
            three-line
            id="notifications-list"
            v-if="notifications.length"
          >
            <div v-for="(item, i) in notifications" :key="i">
              <v-list-item
                :class="item.isRead ? 'just-read' : 'not-read'"
                @click="item.isRead = true"
              >
                <v-icon v-if="!item.avatar"
                  class="notification-icon mr-5"
                  size="30"
                  color="white"
                  >{{ item.icon }}</v-icon
                >
                <v-img v-else class="notification-avatar" :src="item.avatar" max-width="70" height="70"></v-img>
                <v-list-item-content>
                  <!-- <v-icon id="notifications-eye" color="white">{{
                    item.isRead ? "mdi-eye-off" : "mdi-eye"
                  }}</v-icon> -->
                  <v-list-item-title class="pa-0 ma-0 cyan--text">{{
                    item.title
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider
                v-if="i < notifications.length - 1"
                inset
                class="notifications-divider ma-0 pa-0"
              ></v-divider>
            </div>
          </v-list>
          <v-list v-else>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-center red--text"
                  >No tienes notificaciones</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>

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
            small
            class="mr-2"
            v-bind="attrs"
            v-on="on"
            @click="langMenu = true"
          >
            <v-icon class="language-icon"> mdi-earth </v-icon>
          </v-btn>
        </template>
        <div class="d-block">
          <div>
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
          </div>
          <div>
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
          </div>
        </div>
      </v-menu>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mr-2"
            depressed
            icon
            fab
            v-on="on"
            v-bind="attrs"
            outlined
            small
            :color="chatIsActivated ? 'white' : 'primary'"
            @click="showChat"
          >
            <v-icon :color="chatIsActivated ? 'white' : 'cyan'">
              mdi-message-text
            </v-icon>
          </v-btn>
        </template>
        <span class="white--text">{{ $t("navbar.showChat") }}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mr-2"
            depressed
            icon
            fab
            v-on="on"
            v-bind="attrs"
            outlined
            small
            color="red darken-1"
            @click="logout"
          >
            <v-icon color="red"> mdi-account-cancel </v-icon>
          </v-btn>
        </template>
        <span class="white--text">{{ $t("navbar.logout") }}</span>
      </v-tooltip>
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
            width="70"
            height="70"
            class="avatar ma-5 ma-auto"
          />
          <h5 class="username-drawer text-center my-2">
            @{{ user.displayName }}
          </h5>

          <v-list-item to="/home">
            <v-list-item-icon>
              <v-icon class="nav-icons">mdi-home</v-icon>
              <v-list-item-title class="nav-links">{{
                $t("navbar.home")
              }}</v-list-item-title>
            </v-list-item-icon>
          </v-list-item>

          <div v-for="(item, i) in navbarItems" :key="i">
            <v-list-item :to="item.to" @click="setComingFromDetails">
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
        <div>
          <v-btn
            icon
            large
            :small="isUsingMobile"
            :outlined="isUsingMobile"
            :tile="!isUsingMobile"
            :fab="isUsingMobile"
            :width="isUsingMobile ? '' : '100%'"
            :class="isUsingMobile ? 'px-0' : 'px-2'"
            href="https://github.com/Lithos-hub/VUEJS-iMovies"
            target="_blank"
          >
            <v-icon :class="isUsingMobile ? 'ma-0' : 'mr-2'">
              mdi-github
            </v-icon>
            <div v-if="!isUsingMobile" id="version-info" class="ml-2">
              <p>v{{ major }}.{{ minor }}.{{ patch }}</p>
            </div>
          </v-btn>
        </div>
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
      minor: 3,
      patch: 0,
      group: null,
      drawer: false,
      langMenu: false,
      navbarItems: [
        {
          to: "/trivia",
          text: this.$t("navbar.trivia") + " (Beta)",
          icon: "mdi-gamepad-variant",
        },
        {
          to: "/account",
          text: this.$t("navbar.account"),
          icon: "mdi-account",
        },
        {
          to: "/community",
          text: this.$t("navbar.community"),
          icon: "mdi-account-group",
        },
        {
          to: "/search",
          text: this.$t("navbar.search"),
          icon: "mdi-magnify",
        },
        {
          to: "/myMovies",
          text: this.$t("navbar.mymovies"),
          icon: "mdi-star",
        },
        {
          to: "/trending",
          text: this.$t("navbar.trending"),
          icon: "mdi-table",
        },
        {
          to: "/trailers",
          text: this.$t("navbar.trailers"),
          icon: "mdi-video-vintage",
        },
        {
          to: "/genres",
          text: this.$t("navbar.genres"),
          icon: "mdi-shape",
        },
        {
          to: "/popular",
          text: this.$t("navbar.ranking"),
          icon: "mdi-format-list-numbered",
        },
        {
          to: "/changelog",
          text: this.$t("navbar.changelog"),
          icon: "mdi-lead-pencil",
        },
        {
          to: "/about",
          text: this.$t("navbar.about"),
          icon: "mdi-information-variant",
        },
      ],
    };
  },
  computed: {
    ...mapState([
      "user",
      "isLoadingDynamicUserData",
      "showingFriends",
      "chatIsActivated",
      "hasNotifications",
      "notifications"
    ]),
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
      const userData = {};

      this.$store.commit("setUser", userData);

      auth
        .signOut()
        .then(() => {
          const userData = {};
          this.$store.commit("setUser", userData);
          this.$store.commit("setMessagesListener", () => {});
          this.$router.push("/");
          localStorage.clear();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    refresh() {
      this.$router.go(0);
    },
    setComingFromDetails() {
      this.$store.commit("setcomebackFromDetails", false);
    },
    showChat() {
      let activeChat = this.chatIsActivated;
      this.$store.commit("setChatIsActivated", !activeChat);
      this.$store.commit('setIsShowingFriends', true)
    },
    showChat() {
      let activeChat = this.chatIsActivated;
      this.$store.commit("setChatIsActivated", !activeChat);
      this.$store.commit('setIsShowingFriends', true)
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
  margin-left: 5em;
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

#notification-wrapper {
  position: relative;
}
#notification-dot {
  position: absolute;
  top: 25%;
  right: 20%;
  transform: translate(50%, -50%);
  background: #ff3737;
  border: 1px solid #151515;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  z-index: 99999;
}
.notifications-divider {
  min-width: 350px !important;
}
#notifications-list {
  min-width: 400px;
  width: auto;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 350px;
}
#notifications-eye {
  position: absolute;
  right: 20px;
}
.not-read {
  background: rgb(43, 71, 122);
  backdrop-filter: blur(5px);
}
.notification-icon {
  background: $gradient_1;
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0px 5px 10px #303030;
}

.notification-avatar {
  padding: 10px;
  border-radius: 50%;
  margin-right: 10px;
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
    letter-spacing: 2px;
    font-size: 10px;
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
    letter-spacing: 2px;
    font-size: 12px;
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

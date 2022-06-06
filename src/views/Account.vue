<template>
  <div class="account">
    <!-- DIALOGS -->
    <v-dialog v-model="changesDialog" persistent max-width="500px">
      <v-sheet color="secondary" height="auto" width="auto" class="pa-5">
        <v-form ref="form" lazy-validation v-model="valid">
          <v-text-field
            class="account__input"
            v-if="isEditingName"
            v-model="newName"
            dark
            filled
            :rules="nameRules"
            type="text"
            counter="15"
            color="cyan"
            :label="$t('view-account.username')"
          ></v-text-field>
          <div class="d-flex" v-if="isEditingPass">
            <v-text-field
              class="account__input"
              v-model="newPassword"
              dark
              filled
              :type="show ? 'password' : 'text'"
              :rules="passwordRules"
              height="100%"
              color="cyan"
              :label="$t('view-account.password')"
            ></v-text-field>
            <v-btn
              height="100%"
              depressed
              tile
              color="transparent"
              class="pa-5"
              @click="show = !show"
              ><v-icon color="cyan">mdi-eye</v-icon></v-btn
            >
          </div>
          <v-text-field
            class="account__input"
            v-if="isEditingEmail"
            v-model="newEmail"
            dark
            filled
            :rules="emailRules"
            type="email"
            color="cyan"
            :label="$t('view-account.email')"
          ></v-text-field>
          <v-row no-gutters class="pa-0">
            <v-col>
              <v-btn
                :loading="isLoading"
                dark
                block
                tile
                color="cyan"
                @click="updateProfile"
                >{{ $t("view-account.done") }}</v-btn
              >
            </v-col>
            <v-col>
              <v-btn dark block tile color="red" @click="closeDialog">{{
                $t("view-account.cancel")
              }}</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-sheet>
    </v-dialog>
    <v-dialog v-model="avatarDialog" v-if="avatarDialog" width="800" persistent>
      <v-card>
        <v-card-title
          class="headline gradient-background-1 white--text shadow-text"
        >
          {{ $t("view-register.choose") }}
        </v-card-title>
        <v-container fluid class="pa-5">
          <v-row>
            <v-col lg="2" v-for="(url, i) in avatar_imgs" :key="'A' + i">
              <v-avatar size="100" id="avatar-img" @click="selectAvatar(url)">
                <v-img :src="url" aspect-ratio="1"></v-img>
              </v-avatar>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- TABS MENU -->
    <v-tabs :vertical="!isUsingMobile" dark :height="!isUsingMobile ? 500 : ''">
      <v-tab active-class="secondary" class="cyan--text justify-start">
        <v-icon color="cyan" left> mdi-account </v-icon>
        {{ $t("view-account.profile") }}
      </v-tab>
      <v-tab active-class="secondary" class="cyan--text justify-start">
        <v-icon color="cyan" left> mdi-star </v-icon>
        {{ $t("view-account.achievements") }}
      </v-tab>
      <v-tab active-class="secondary" class="cyan--text justify-start">
        <v-icon color="cyan" left> mdi-lock </v-icon>
        {{ $t("view-account.security") }} ({{ $t("view-account.soon") }})
      </v-tab>
      <v-tab active-class="secondary" class="cyan--text justify-start">
        <v-icon color="cyan" left> mdi-palette </v-icon>
        {{ $t("view-account.appearance") }} ({{ $t("view-account.soon") }})
      </v-tab>
      <v-tab active-class="secondary" class="cyan--text justify-start">
        <v-icon color="cyan" left> mdi-bell-badge </v-icon>
        {{ $t("view-account.notifications") }} ({{ $t("view-account.soon") }})
      </v-tab>
      <!-- END TABS MENU -->
      <!-- TABS ITEMS CONTENT -->
      <!-- // ? **************** PROFILE  **************** // -->
      <v-tab-item class="profile__section" transition="fade-transition">
        <v-row no-gutters>
          <v-col cols="12" lg="6" md="6" sm="12">
            <ul style="list-style: none">
              <li :class="isUsingMobile ? 'd-block text-center my-5' : 'profile__section--list d-flex'">
                <v-icon color="primary" class="mr-5" size="30px"
                  >mdi-account</v-icon
                ><span class="font-weight-bold mr-2">{{
                  $t("view-account.username")
                }}</span>
                <span class="my-auto">@{{ user.displayName }}</span>
                <v-btn
                  color="primary"
                  tile
                  small
                  :class="isUsingMobile ? 'd-block mx-auto' : 'ml-auto'"
                  @click="
                    openDialog();
                    isEditingName = true;
                  "
                  >{{ $t("view-account.change") }}</v-btn
                >
              </li>
              <li :class="isUsingMobile ? 'd-block text-center my-5' : 'profile__section--list d-flex'">
                <v-icon color="primary" class="mr-5" size="30px">mdi-key</v-icon
                ><span class="font-weight-bold mr-2">{{
                  $t("view-account.password")
                }}</span>
                <v-btn
                  color="primary"
                  tile
                  small
                  :class="isUsingMobile ? 'd-block mx-auto' : 'ml-auto'"
                  @click="
                    openDialog();
                    isEditingPass = true;
                  "
                  >{{ $t("view-account.change") }}</v-btn
                >
              </li>
              <li :class="isUsingMobile ? 'd-block text-center my-5' : 'profile__section--list d-flex'">
                <v-icon color="primary" class="mr-5" size="30px"
                  >mdi-email</v-icon
                ><span class="font-weight-bold mr-2">{{
                  $t("view-account.email")
                }}</span>
                <span class="my-auto">{{ user.email }}</span>
                <v-btn
                  color="primary"
                  tile
                  small
                  :class="isUsingMobile ? 'd-block mx-auto' : 'ml-auto'"
                  @click="
                    openDialog();
                    isEditingEmail = true;
                  "
                  >{{ $t("view-account.change") }}</v-btn
                >
              </li>
            </ul>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="12" class="text-center">
            <v-img
              id="account-avatar"
              aspect-ratio="1"
              :src="user.photoURL"
              width="auto"
              height="auto"
              max-width="200px"
              class="avatar ma-5 ma-auto"
            />
            <v-btn
              width="auto"
              max-width="250px"
              class="mt-5"
              tile
              color="primary"
              @click="avatarDialog = true"
            >
              {{ $t("view-account.changeAvatar") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-tab-item>
      <!-- // ? **************** ACHIEVEMENTS  **************** // -->
      <v-tab-item class="achievement__section" transition="fade-transition">
        <v-row>
          <v-col>
            <div class="d-flex achievement-desc justify-center">
              <div class="square-common"></div>
                <div class="common-title">{{ $t("view-account.common") }}</div>
            </div>
          </v-col>
          <v-col>
            <div class="d-flex achievement-desc justify-center">
              <div class="square-rare"></div>
              <div class="rare-title">{{ $t("view-account.rare") }}</div>
            </div>
          </v-col>
          <v-col>
            <div class="d-flex achievement-desc justify-center">
              <div class="square-epic"></div>
              <div class="epic-title">{{ $t("view-account.epic") }}</div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="3"
            lg="3"
            md="3"
            sm="6"
            xs="12"
            v-for="(item, j) of achievementsCards"
            :key="'B' + j"
          >
            <div :class="'achievement__section ' + item.className">
              <p :class="'achievement-' + item.className">
                {{ item.title }}
              </p>
              <v-img
                class="mx-auto my-5 achieve-img"
                :src="require('../assets/img/' + item.image)"
                width="100"
                height="100"
              />
              <small>{{ item.description }}</small>
            </div>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs>
    <div v-if="snackbarObject.snackbar">
      <Snackbar
        :snackbar-color="snackbarObject.snackbarColor"
        :snackbar-text="snackbarObject.snackbarText"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Snackbar from "@/components/Snackbar.vue";
import { storage } from "../../firebase.js";
import Services from "../services/services";

export default {
  components: {
    Snackbar,
  },
  data() {
    return {
      valid: true,
      isLoading: false,
      loader: null,
      loadingName: false,
      loadingPass: false,
      loadingEmail: false,
      showPassword: false,
      changesDialog: false,
      isEditingName: false,
      isEditingPass: false,
      isEditingEmail: false,
      avatarDialog: false,
      show: false,
      newName: null,
      newEmail: null,
      newPassword: null,
      newAvatar: null,
      nameRules: [(v) => v.length < 15 || this.$t("view-register.maximum")],
      emailRules: [
        (v) => /.+@.+\..+/.test(v) || this.$t("view-register.emailInvalid"),
      ],
      passwordRules: [
        (v) => v.length >= 8 || this.$t("view-register.passwordLength"),
      ],
      avatar_imgs: [],
    };
  },
  computed: {
    ...mapState(["snackbarObject", "user", "achievementsCards"]),
    isUsingMobile() {
      return window.innerWidth < 600;
    },
  },
  mounted() {
    Services.hasVisitedTheSection("account");
    this.getAvatarsImages();
  },
  methods: {
    ...mapActions(["showSnackbar"]),
    openDialog() {
      this.changesDialog = true;
      this.newName = this.user.displayName;
      this.newEmail = this.user.email;
    },
    async updateProfile() {
      this.isLoading = true;
      this.$store.commit("setIsLoadingDynamicUserData", true);

      try {
        await this.$store.dispatch("updateProfile", {
          userName: this.newName,
          userEmail: this.newEmail,
          userPassword: this.newPassword,
          userAvatar: this.newAvatar,
        });
        this.showSnackbar({
          text: this.$t("view-account.successOnUpdating"),
          color: "success",
        });
        this.closeDialog();
        this.$store.commit("setIsLoadingDynamicUserData", false);
      } catch (error) {
        console.log('Error when updating profile => ', error)
        if (error.code === "auth/requires-recent-login") {
          this.showSnackbar({
            text: this.$t("view-account.errorOldLogin"),
            color: "error",
          });
        } else {
          this.showSnackbar({
            text: this.$t("view-account.errorOnUpdating"),
            color: "error",
          });
        }
        this.closeDialog();
        this.$store.commit("setIsLoadingDynamicUserData", false);
      }
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
      this.newAvatar = url;
      this.updateProfile();
      this.$emit("refresh");
      this.$store.dispatch("getReward", 30);
    },
    closeDialog() {
      this.isLoading = false;
      this.isEditingName = false;
      this.isEditingPass = false;
      this.isEditingEmail = false;
      this.changesDialog = false;
      this.avatarDialog = false;
      this.newName = "";
      this.newPassword = "";
      this.newEmail = "";
      this.newAvatar = "";
      this.$emit("refresh");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";
@import "src/scss/app";


.account__input {
  caret-color: aqua !important;
  color: aqua !important;
}
input {
  caret-color: aqua !important;
  color: aqua !important;
}
input::placeholder {
  caret-color: aqua !important;
  color: aqua !important;
}

#tabs-card {
  background: $dark2;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1000px;
  max-height: 100%;
  border-radius: 0;
}

#tabs-menu {
  height: 1000px;
  max-height: 100%;
}

.tabs-card-title {
  color: cyan !important;
  padding: 0;
}

#tabs {
  margin-top: auto;
  margin-bottom: auto;
}

.profile__section {
  animation: fadeIn 0.5s ease-out;
  font-size: 16px;
  padding-block: 3em;
  color: $dark2;
}

.achievement__section {
  text-align: center;
  position: relative;
  width: 100%;
  padding: 4.5em 7em;
  background: $dark2;
}

.profile__section--list {
  border-top: 1px solid lightgray;
  padding-block: 1em;
}

#account-avatar {
  box-shadow: 0px 2px 5px gray;
}

#avatar-img {
  transition: 0.5s;

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
}

.achievement__section {
  p {
    color: white;
    padding: 5px;
    font-size: 13px !important;
    border-radius: 5px 5px 0px 0px;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 3px !important;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  small {
    text-align: justify;
  }
}

.achievement-epic {
  background: $gradient_epic;
}
.achievement-rare {
  background: $gradient_rare;
}
.achievement-common {
  background: $gradient_common;
}

.achievement-desc {
  color: white;
}

.square-epic {
  width: 20px;
  height: 20px;
  background: white;
  box-shadow: 0px 0px 5px pink, 0px 0px 15px #ff7a90, 0px 0px 50px #ff3bff;
  border-radius: 2px;
  margin-right: 20px;
}
.epic-title {
  color: #e079ff;
}
.square-rare {
  width: 20px;
  height: 20px;
  background: white;
  box-shadow: 0px 0px 5px #5098d3, 0px 0px 15px #5e96ff, 0px 0px 50px #4891ff;
  border-radius: 2px;
  margin-right: 20px;
}
.rare-title {
  color: #79d9ff;
}
.square-common {
  width: 20px;
  height: 20px;
  background: white;
  box-shadow: 0px 0px 5px #b8ffaa, 0px 0px 15px #80ff91, 0px 0px 50px #0de00d;
  border-radius: 2px;
  margin-right: 20px;
}
.common-title {
  color: #79ff84;
}

.epic {
  background: white;
  box-shadow: 0px 0px 5px white, 0px 0px 15px pink, 0px 0px 50px #ff5bff;
  color: $dark2;

  .achieve-img {
    border-radius: 50%;
    box-shadow: 0px 0px 5px pink, 0px 0px 20px #ff7e93;
  }
}
.rare {
  background: white;
  box-shadow: 0px 0px 5px white, 0px 0px 15px #c0fdff, 0px 0px 50px #48e3ff;
  color: $dark2;

  .achieve-img {
    border-radius: 50%;
    box-shadow: 0px 0px 5px #c0e6ff, 0px 0px 20px #7ecbff;
  }
}
.common {
  background: white;
  box-shadow: 0px 0px 5px white, 0px 0px 15px #c0ffc8, 0px 0px 50px #4aff4a;
  color: $dark2;

  .achieve-img {
    border-radius: 50%;
    box-shadow: 0px 0px 5px #c0ffc8, 0px 0px 20px #8aff80;
  }
}
</style>

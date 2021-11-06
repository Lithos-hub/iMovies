<template>
  <div>
    <v-card id="tabs-card">
    <v-tabs vertical dark id="tabs-menu">
      <div id="tabs">
        <v-tab active-class="secondary" class="cyan--text justify-start">
          <v-icon color="cyan" left>
            mdi-account
          </v-icon>
          {{ $t('view-account.profile') }}
        </v-tab>
        <v-tab active-class="secondary" class="cyan--text justify-start">
          <v-icon color="cyan" left>
            mdi-lock
          </v-icon>
          {{ $t('view-account.security') }} (soon)
        </v-tab>
        <v-tab active-class="secondary" class="cyan--text justify-start">
          <v-icon color="cyan" left>
            mdi-palette
          </v-icon>
          {{ $t('view-account.appearance') }} (soon)
        </v-tab>
        <v-tab active-class="secondary" class="cyan--text justify-start">
          <v-icon color="cyan" left>
            mdi-bell-badge
          </v-icon>
          {{ $t('view-account.notifications') }} (soon)
        </v-tab>
      </div>
      <v-tab-item>
        <v-card flat tile dark>
          <v-card-title class="tabs-card-title">
            <h1 class="text-h2 mb-0 pt-5">{{ $t('view-account.profile') }}</h1>
          </v-card-title>
          <v-card-text>
            <div class="option-1-section">
              <v-row no-gutters>
                <v-col>
                  <ul style="list-style: none">
                    <li class="account-item-list d-flex">
                        <v-icon color="primary" class="mr-5" size="30px">mdi-account</v-icon><span class="text-h6 mr-2">{{ $t('view-account.username') }}</span>
                        <span class="my-auto">@{{ userData.userName }}</span>
                        <v-btn tile small class="ml-auto" @click="openDialog(); isEditingAlias = true;">{{ $t('view-account.change') }}</v-btn>
                    </li>
                    <li class="account-item-list d-flex">
                        <v-icon color="primary" class="mr-5" size="30px">mdi-key</v-icon><span class="text-h6 mr-2">{{ $t('view-account.password') }}</span>
                        <span class="font-italic my-auto">{{ computePass(userData.userPassword, showPassword) }}</span>
                        <v-btn dark icon tile class="ml-5" @click="showPassword = !showPassword">
                        <v-icon color="cyan">mdi-eye</v-icon>
                        </v-btn>
                        <v-btn tile small class="ml-auto" @click="openDialog(); isEditingPass = true">{{ $t('view-account.change') }}</v-btn>
                    </li>
                    <li class="account-item-list d-flex">
                        <v-icon color="primary" class="mr-5" size="30px">mdi-email</v-icon><span class="text-h6 mr-2">{{ $t('view-account.email') }}</span>
                        <span class="my-auto">{{ userData.userEmail }}</span>
                        <v-btn tile small class="ml-auto" @click="openDialog(); isEditingEmail = true">{{ $t('view-account.change') }}</v-btn>
                    </li>
                  </ul>
                </v-col>
                <v-col cols="4" class="text-center">
                     <v-img
                      id="account-avatar"
                      aspect-ratio="1"
                      v-if="userData.userAvatar !== undefined"
                      :src="userData.userAvatar"
                      width="auto"
                      height="auto"
                      max-width="200px"
                      class="avatar ma-5 ma-auto" />
                      <v-btn width="auto" max-width="250px" class="mt-5" tile color="primary" @click="avatarDialog = true">
                        {{ $t('view-account.changeAvatar') }}
                      </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
  <v-dialog
    v-model="changesDialog"
    persistent
    max-width="500px"
    >
    <v-sheet color="secondary" height="auto" width="auto" class="pa-5">
      <v-form ref="form" lazy-validation v-model="valid">
          <v-text-field
          class="account-input"
          v-if="isEditingAlias"
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
          class="account-input"
          v-model="newPassword"
          dark
          filled
          :type="show ? 'password' : 'text'"
          :rules="[passwordRules.length]"
          height="100%"
          color="cyan"
          :label="$t('view-account.password')"
          ></v-text-field>
          <v-btn height="100%" depressed tile color="transparent" class="pa-5" @click="show = !show"><v-icon color="cyan">mdi-eye</v-icon></v-btn>
          </div>
          <v-text-field
          class="account-input"
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
              <v-btn :disabled="!valid" dark block tile color="cyan" v-if="isEditingAlias" @click="changeAUsername">{{ $t('view-account.done') }}</v-btn>
              <v-btn :disabled="!valid" dark block tile color="cyan" v-if="isEditingPass" @click="changePassword">{{ $t('view-account.done') }}</v-btn>
              <v-btn :disabled="!valid" dark block tile color="cyan" v-if="isEditingEmail" @click="changeEmail">{{ $t('view-account.done') }}</v-btn>
          </v-col>
          <v-col>
              <v-btn dark block tile color="red" @click="closeDialog">{{ $t('view-account.cancel') }}</v-btn>
          </v-col>
      </v-row>
      </v-form>
    </v-sheet>
  </v-dialog>
  <v-dialog v-model="avatarDialog" v-if="avatarDialog" width="800" persistent>
      <v-card>
        <v-card-title class="headline gradient-background-1 white--text shadow-text">
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
    <div v-if="snackbarObject.snackbar">
      <Snackbar
        :snackbar-color="snackbarObject.snackbarColor"
        :snackbar-text="snackbarObject.snackbarText" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Snackbar from '@/components/Snackbar.vue';

export default {
  components: {
    Snackbar,
  },
  data() {
    return {
      valid: true,
      loadingName: false,
      loadingPass: false,
      loadingEmail: false,
      showPassword: false,
      changesDialog: false,
      isEditingAlias: false,
      isEditingPass: false,
      isEditingEmail: false,
      avatarDialog: false,
      show: false,
      user: {},
      newName: '',
      newPassword: '',
      newEmail: '',
      newAvatar: '',
      nameRules: [
        (v) => v.length < 15 || this.$t('view-register.maximum')
      ],
      emailRules: [
        (v) => /.+@.+\..+/.test(v) || this.$t('view-register.emailInvalid'),
      ],
      passwordRules: {
        length: (v) => v.length >= 8 || this.$t('view-register.passwordLength'),
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
    ...mapState(['userID', 'userData', 'snackbarObject'])
  },
  methods: {
    ...mapActions(['showSnackbar']),
    computePass(pass, show) {
      let string = ''
      if (!show) {
        for (let char of pass) {
          string += char.replace(char, '•')
        }
      } else {
        string = pass
      }
      return string
    },
    openDialog () {
      this.changesDialog = true
      this.newName = this.userData.userName
      this.newPassword = this.userData.userPassword
      this.newEmail = this.userData.userEmail
    },
    changeAUsername () {
      this.$refs.form.validate()

      let storage = JSON.parse(localStorage.getItem("storageUserDATA")) || [];
      let existedUser = storage.filter(user => user.userName === this.newName);

      if (this.valid) {
        if (!existedUser.length) { 
        this.loadingName = true
          setTimeout(() => {
            let userData = JSON.parse(localStorage.getItem("storageUserDATA")) || [];
            userData[this.userID].userName = this.newName
            localStorage.setItem("storageUserDATA", JSON.stringify(userData));
            this.$store.commit("saveUserData", userData[this.userID]);
            this.closeDialog()
          }, 500)
        } else {
          this.showSnackbar({ text: this.$t('view-account.usernameExist'), color: "error" })
        }
      }
    },
    changePassword () {
      this.$refs.form.validate()

      if (this.valid) {
        this.loadingPass = true
          setTimeout(() => {
            let userData = JSON.parse(localStorage.getItem("storageUserDATA")) || [];
            userData[this.userID].userPassword = this.newPassword
            localStorage.setItem("storageUserDATA", JSON.stringify(userData));
            this.$store.commit("saveUserData", userData[this.userID]);
            this.closeDialog()
          }, 500)
        }
    },
    changeEmail () {
      this.$refs.form.validate()

      let storage = JSON.parse(localStorage.getItem("storageUserDATA")) || [];
      let existedEmail = storage.filter(user => user.userEmail === this.newEmail);

      if (this.valid) {
        if (!existedEmail.length) { 
        this.loadingEmail = true
          setTimeout(() => {
            let userData = JSON.parse(localStorage.getItem("storageUserDATA")) || [];
            userData[this.userID].userEmail = this.newEmail
            localStorage.setItem("storageUserDATA", JSON.stringify(userData));
            this.$store.commit("saveUserData", userData[this.userID]);
            this.closeDialog()
          }, 500)
        } else {
          this.showSnackbar({ text: this.$t('view-account.emailExist'), color: "error" })
        }
      }
    },
    selectAvatar (item) {
      this.newAvatar = item
      let userData = JSON.parse(localStorage.getItem("storageUserDATA")) || [];
      userData[this.userID].userAvatar = this.newAvatar
      localStorage.setItem("storageUserDATA", JSON.stringify(userData));
      this.$store.commit("saveUserData", userData[this.userID]);
      this.avatarDialog = false
      this.$emit('refresh')
    },
    closeDialog () {
      this.isEditingAlias = false
      this.isEditingPass = false
      this.isEditingEmail = false
      this.changesDialog = false
      this.newName = ''
      this.newPassword = ''
      this.newEmail = ''
      this.newAvatar = ''
      this.$emit('refresh')
    }
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";
@import "src/scss/app";

.account-input {
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

.option-1-section {
  position: absolute;
  left: 0;
  color: black;
  top: 5em;
  font-size: 20px;
  padding: 5em;
  height: 1000px;
  max-height: 100%;
  width: 100%;
}

.account-item-list {
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

</style>

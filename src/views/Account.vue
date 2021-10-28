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
                        <v-icon color="primary" class="mr-5" size="30px">mdi-account</v-icon><span class="text-h6 mr-2">{{ $t('view-account.username') }}</span><span class="my-auto">@{{ user.userName }}</span>
                        <v-btn tile small class="ml-auto">{{ $t('view-account.change') }}</v-btn>
                    </li>
                    <li class="account-item-list d-flex">
                        <v-icon color="primary" class="mr-5" size="30px">mdi-key</v-icon><span class="text-h6 mr-2">{{ $t('view-account.password') }}</span><span class="font-italic my-auto">{{ computePass(user.userPassword, showPassword) }}</span>
                        <v-btn dark icon tile class="ml-5" @click="showPassword = !showPassword">
                        <v-icon color="cyan">mdi-eye</v-icon>
                        </v-btn>
                        <v-btn tile small class="ml-auto">{{ $t('view-account.change') }}</v-btn>
                    </li>
                    <li class="account-item-list d-flex">
                        <v-icon color="primary" class="mr-5" size="30px">mdi-email</v-icon><span class="text-h6 mr-2">{{ $t('view-account.email') }}</span><span class="my-auto">{{ user.userEmail }}</span>
                        <v-btn tile small class="ml-auto">{{ $t('view-account.change') }}</v-btn>
                    </li>
                  </ul>
                </v-col>
                <v-col cols="4" class="text-center">
                    <p class="text-h6 text-center">Avatar</p>
                     <v-img
                      id="avatar"
                      v-if="user.userAvatar !== undefined"
                      :src="user.userAvatar"
                      width="auto"
                      height="auto"
                      max-width="250px"
                      class="avatar ma-5 ma-auto" />
                      <v-btn width="auto" max-width="250px" class="mt-2" tile color="primary">
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
  </div>
</template>

<script>

export default {
  name: "Account",
  data() {
    return {
      user: {},
      showPassword: false,
    };
  },
  created() {
    this.setUser();
  },
  methods: {
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
    setUser() {
      this.isDefault = this.$store.getters.defaultUser;
      if (!this.isDefault) {
        const userStorageData =
          JSON.parse(localStorage.getItem("storageUserDATA")) || [];
        const userid = JSON.parse(localStorage.getItem("USERID")) || {};

        this.user = userStorageData[userid.id];
      } else {
        this.user.userName = "DefaultUser";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";
@import "src/scss/app";

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

#avatar {
  box-shadow: 0px 2px 5px gray;
}
</style>

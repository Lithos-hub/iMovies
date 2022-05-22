<template>
  <div>
    <SectionTitle :title="sectionTitle" />
    <Spinner v-if="isLoading" />
    <div v-else>
      <!-- SEARCH USER -->
      <v-container>
        <v-row>
          <v-text-field
            v-model="user"
            filled
            :label="$t('view-community.searchUser')"
            dark
            @change="searchUser"
          ></v-text-field>
        </v-row>
      </v-container>
      <v-container v-if="!isSearchingUser && !isLoading">
        <!-- MY FRIENDSHIP REQUESTS -->
        <div class="primary--text text-h4">
          {{ $t("view-community.friendshipRequests") }}
        </div>
        <v-divider class="primary mb-5"></v-divider>
        <v-row class="ml-5" v-if="!myFriendshipRequests.length">
          <p class="red--text">
            {{ $t("view-community.NofriendshipRequests") }}
          </p>
        </v-row>
        <v-row v-else>
          <v-col
            cols="2"
            class="card-col my-5"
            v-for="(user, i) in myFriendshipRequests"
            :key="i"
          >
            <div class="card-wrapper">
              <div class="card-inner">
                <div class="user-card pa-1 pb-3" width="150">
                  <v-img
                    :src="user.avatar"
                    width="140"
                    height="auto"
                    class="mx-auto rounded"
                  />
                  <v-card-text class="pa-0 mt-2 text-h5 text-center">
                    {{ user.userName }}
                  </v-card-text>
                </div>
                <div class="card-back pa-2" width="150">
                  <p class="text-h6 text-center primary--text pb-5">
                    ¿Aceptar?
                  </p>
                  <div class="d-flex justify-center">
                    <div>
                      <v-btn
                        color="success"
                        fab
                        small
                        depressed
                        class="mx-2"
                        @click="acceptRequest(user)"
                        ><v-icon color="white">mdi-check</v-icon></v-btn
                      >
                    </div>
                    <div>
                      <v-btn
                        color="red"
                        fab
                        small
                        depressed
                        class="mx-2"
                        @click="rejectRequest(user)"
                        ><v-icon color="white">mdi-cancel</v-icon></v-btn
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
        <!-- MY FRIENDSHIP LIST -->
        <div class="primary--text text-h4 mt-5">
          {{ $t("view-community.myFriends") }}
        </div>
        <v-divider class="primary mb-5"></v-divider>
        <v-row v-if="myFriendsList.length">
          <v-col
            lg="2"
            md="4"
            sm="6"
            xs="12"
            v-for="(friend, i) in myFriendsList"
            :key="i"
          >
            <v-card
              class="friend-card gradient-background-1 white--text pa-0"
              width="220"
              @click="goToUserDetails(friend)"
            >
              <v-img
                :src="friend.avatar"
                width="220"
                height="200"
                class="mx-auto"
              ></v-img>
              <v-card-title class="text-h5 justify-center">
                {{ friend.userName }}
              </v-card-title>
              <v-card-text class="white pt-3">
                <v-row class="text-center">
                  <v-col>
                    <v-icon size="40" color="red">mdi-heart</v-icon>
                    <span class="mx-2 text-h5">{{
                      friend.userMovies.favourites
                    }}</span>
                  </v-col>
                  <v-col>
                    <v-icon size="40" color="primary">mdi-eye</v-icon>
                    <span class="mx-2 text-h5">{{
                      friend.userMovies.watched
                    }}</span>
                  </v-col>
                </v-row>
                <v-row class="text-center">
                  <v-col>
                    <v-icon size="40" color="amber">mdi-star-shooting</v-icon>
                    <span class="mx-2 text-h5">{{
                      friend.userMovies.wishlist
                    }}</span>
                  </v-col>
                  <v-col>
                    <v-icon size="40" color="green"
                      >mdi-sort-numeric-variant</v-icon
                    >
                    <span class="mx-2 text-h5">{{
                      friend.userMovies.rated
                    }}</span>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <!-- GLOBAL USERS LIST -->
        <div class="primary--text text-h4 mt-5">
          {{ $t("view-community.users") }}
        </div>
        <v-divider class="primary mb-5"></v-divider>
        <v-list class="pa-0" v-if="iMoviesUsersList.length">
          <v-list-item
            class="d-flex justify-space-between user-list-item"
            v-for="(user, i) in iMoviesUsersList"
            :key="i"
          >
            <!-- USER INDEX -->
            <div class="user-index mr-2 text-h5">{{ i + 1 }}</div>
            <!-- USER AVATAR -->
            <v-list-item-avatar size="70">
              <v-img :src="user.avatar"></v-img>
            </v-list-item-avatar>
            <!-- USER ALIAS -->
            <v-list-item-title
              class="text-h6 ml-5 d-flex justify-space-between"
            >
              <div class="my-auto">
                {{ user.userName }}
              </div>
            </v-list-item-title>
            <!-- USER BUTTON -->
            <!-- <div class="red--text text-center mr-auto">
                <small class="my-auto">{{ justRejected(user.docID) ? 'Este usuario ha rechazado tu solicitud de amistad' : '' }}</small>
              </div> -->
            <div
              v-if="
                !myFriendsList.some((friend) => friend.docID === user.docID)
              "
            >
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    :color="computedRequestColor(user.docID)"
                    fab
                    v-bind="justRejected(user.docID) ? attrs : null"
                    v-on="justRejected(user.docID) ? on : null"
                    depressed
                    @click="
                      justRejected(user.docID) ? null : sendFriendRequest(user)
                    "
                  >
                    <v-icon color="white">
                      {{ computedRequestIcon(user.docID) }}
                    </v-icon>
                  </v-btn>
                </template>
                <span class="my-auto">{{
                  $t("view-community.friendshipRejected")
                }}</span>
              </v-tooltip>
            </div>
            <div v-else>
              <v-btn color="info" fab depressed>
                <v-icon>mdi-account-check</v-icon>
              </v-btn>
            </div>
            <!-- USER MOVIES -->
            <div class="ml-auto pr-5 text-center">
              {{ $t("view-community.savedMovies") }}
              <span class="d-block">{{ user.userMovies.total }}</span>
            </div>
            <div class="d-block">
              <div class="d-flex justify-end my-2">
                <v-icon size="30" color="red">mdi-heart</v-icon>
                <span class="mx-2 text-h6">{{
                  user.userMovies.favourites
                }}</span>
                <v-icon size="30" color="primary">mdi-eye</v-icon>
                <span class="mx-2 text-h6">{{ user.userMovies.watched }}</span>
              </div>
              <div class="d-flex justify-end my-2">
                <v-icon size="30" color="amber">mdi-star-shooting</v-icon>
                <span class="mx-2 text-h6">{{ user.userMovies.wishlist }}</span>
                <v-icon size="30" color="green"
                  >mdi-sort-numeric-variant</v-icon
                >
                <span class="mx-2 text-h6">{{ user.userMovies.rated }}</span>
              </div>
            </div>
          </v-list-item>
        </v-list>
      </v-container>
      <v-container v-else-if="isSearchingUser && !isLoading">
        <v-btn
          outlined
          color="cyan"
          @click="isSearchingUser = false"
          class="mb-5 ml-9"
          tile
          >{{ $t("view-community.comeback") }}</v-btn
        >
        <v-list class="pa-0" v-if="iMoviesUsersList.length">
          <v-list-item
            class="d-flex justify-space-between user-list-item"
            v-for="(user, i) in iMoviesUsersList"
            :key="i"
          >
            <!-- USER INDEX -->
            <div class="user-index mr-2 text-h5">{{ i + 1 }}</div>
            <!-- USER AVATAR -->
            <v-list-item-avatar size="70">
              <v-img :src="user.avatar"></v-img>
            </v-list-item-avatar>
            <!-- USER ALIAS -->
            <v-list-item-title
              class="text-h6 ml-5 d-flex justify-space-between"
            >
              <div class="my-auto">
                {{ user.userName }}
              </div>
            </v-list-item-title>
            <!-- USER BUTTON -->
            <div
              v-if="
                !myFriendsList.some((friend) => friend.docID === user.docID)
              "
            >
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    :color="computedRequestColor(user.docID)"
                    fab
                    v-bind="justRejected(user.docID) ? attrs : null"
                    v-on="justRejected(user.docID) ? on : null"
                    depressed
                    @click="
                      justRejected(user.docID) ? null : sendFriendRequest(user)
                    "
                  >
                    <v-icon color="white">
                      {{ computedRequestIcon(user.docID) }}
                    </v-icon>
                  </v-btn>
                </template>
                <span class="my-auto">{{
                  $t("view-community.friendshipRejected")
                }}</span>
              </v-tooltip>
            </div>
            <div v-else>
              <v-btn color="info" fab depressed>
                <v-icon>mdi-account-check</v-icon>
              </v-btn>
            </div>
            <!-- USER MOVIES -->
            <div class="ml-auto pr-5 text-center">
              {{ $t("view-community.savedMovies") }}
              <span class="d-block">{{ user.userMovies.total }}</span>
            </div>
            <div class="d-block">
              <div class="d-flex justify-end my-2">
                <v-icon size="30" color="red">mdi-heart</v-icon>
                <span class="mx-2 text-h6">{{
                  user.userMovies.favourites
                }}</span>
                <v-icon size="30" color="primary">mdi-eye</v-icon>
                <span class="mx-2 text-h6">{{ user.userMovies.watched }}</span>
              </div>
              <div class="d-flex justify-end my-2">
                <v-icon size="30" color="amber">mdi-star-shooting</v-icon>
                <span class="mx-2 text-h6">{{ user.userMovies.wishlist }}</span>
                <v-icon size="30" color="green"
                  >mdi-sort-numeric-variant</v-icon
                >
                <span class="mx-2 text-h6">{{ user.userMovies.rated }}</span>
              </div>
            </div>
          </v-list-item>
        </v-list>
      </v-container>
    </div>
  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle.vue";
import Spinner from "../components/Spinner.vue";
import { mapState } from "vuex";
import Services from "../services/services";
export default {
  components: {
    SectionTitle,
    Spinner,
  },
  name: 'Community',
  data() {
    return {
      sectionTitle: "Community",
      user: "",
      showRejectWarning: false,
      isSearchingUser: false,
    };
  },
  computed: {
    ...mapState([
      "mySocialData",
      "mySocialRequests",
      "myFriendsList",
      "iMoviesUsersList",
      "myFriendshipRequests",
      "isLoading",
    ]),
  },
  watch: {
    isSearchingUser(val) {
      if (val === false) this.$store.dispatch("getAllUsers");
    },
  },
  mounted() {
    Services.hasVisitedTheSection("community");
    this.$store.dispatch("getFriendshipNotification");
    this.$store.dispatch("getAllUsers");
    this.$store.dispatch("getMySocialData");
    this.$store.dispatch("getMyFriendshipData");
  },
  methods: {
    searchUser() {
      this.isSearchingUser = true;
      this.$store.dispatch("getUserByName", this.user);
      this.user = "";
    },
    goToUserDetails(userData) {
      let docID = userData.docID;
      let friendshipDate = userData.friendshipDate;
      this.$router.push({ path: `/community/userDetails/${docID}` });
      this.$store.commit("setFriendshipDate", friendshipDate);
    },
    async sendFriendRequest(user) {
      let userData = {
        docID: user.docID,
        userName: user.userName,
        avatar: user.avatar,
      };
      await this.$store.dispatch("sendFriendRequest", userData);
      await this.$store.dispatch("getMyFriendshipData");
    },
    computedRequestColor(docID) {
      const MATCH_SENDED = this.mySocialRequests.sended.find(
        (user) => user.docID === docID
      );
      const MATCH_REJECTED = this.mySocialRequests.rejected.find(
        (user) => user.docID === docID
      );
      let color = "green";
      if (MATCH_SENDED) {
        color = "warning";
      } else if (MATCH_REJECTED) {
        color = "red";
      }
      return color;
    },
    computedRequestIcon(docID) {
      const MATCH_SENDED = this.mySocialRequests.sended.find(
        (user) => user.docID === docID
      );
      const MATCH_REJECTED = this.mySocialRequests.rejected.find(
        (user) => user.docID === docID
      );
      let icon = "mdi-account-plus";
      if (MATCH_SENDED) {
        icon = "mdi-account-question";
      } else if (MATCH_REJECTED) {
        this.showRejectWarning = true;
        icon = "mdi-account-remove";
      }
      return icon;
    },
    justRejected(docID) {
      const MATCH_REJECTED = this.mySocialRequests.rejected.find(
        (user) => user.docID === docID
      );
      return MATCH_REJECTED;
    },
    acceptRequest(userData) {
      this.$store.dispatch("acceptFriendshipRequest", userData);
    },
    rejectRequest(userData) {
      this.$store.dispatch("rejectFriendshipRequest", userData);
    },
  },
};
</script>

<style lang="scss">
@import "../scss/variables";

.user-list-item {
  padding-left: 0 !important;
}

.user-index {
  background: #151515;
  color: cyan;
  padding-block: 30px;
  width: 50px;
  height: 100%;
  text-align: center;
}

.friend-card {
  transition: 0.3s ease-out;

  &:hover {
    transform: scale(1.1);
  }
}

// #1

.card-wrapper {
  background-color: transparent;
  perspective: 1000px;
}

// #2

.card-inner {
  position: relative;
  transition: transform 0.6s ease-in-out;
  transform-style: preserve-3d;
  border-radius: 5px;
  box-shadow: 0px 5px 15px #151515;
  background-color: white;
  display: flex;
  justify-content: center;
}

// #3

// Back card styles
.user-card,
.card-back {
  position: absolute;
  bottom: 0;
  background-color: white;
  border-radius: 5px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

// #4

.card-back {
  transform: rotateY(180deg);
}

// #5

.card-wrapper:hover .card-inner {
  cursor: pointer;
  transform: rotateY(180deg);
}

.user-card {
  background-color: white;
  color: #151515;
  max-width: 140px;
  height: 180px;
  position: relative;
  border-radius: 5px;
  margin: 0 auto;
  justify-content: center;
  text-align: center;
  padding: auto;
}

.card-col {
  max-width: 170px;
  min-height: 180px;
}
</style>

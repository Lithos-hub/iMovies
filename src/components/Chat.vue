<template>
  <div id="chat-wrapper" class="d-flex justify-end">
    <v-card id="chat-card" v-if="isChatting">
      <v-card-title
        class="primary white--text pa-2 px-5 d-flex justify-space-between"
      >
        <small>@{{ friendName }}</small>
        <div>
          <v-btn icon small fab width="15" height="15" @click="minimizeChat"
            ><v-icon size="15" color="white">{{
              minimized ? "mdi-window-maximize" : "mdi-window-minimize"
            }}</v-icon></v-btn
          >
          <v-btn
            class="ml-3"
            icon
            small
            fab
            width="15"
            height="15"
            @click="closeChat"
            ><v-icon size="15" color="white">mdi-close</v-icon></v-btn
          >
        </div>
      </v-card-title>
      <v-card-text class="px-0 pt-1">
        <v-progress-circular
          size="50"
          color="primary"
          indeterminate
          class="centered"
          v-if="loadingMessages"
        ></v-progress-circular>
        <v-container id="conversation-container">
          <div v-if="!loadingMessages" class="conversation-wrapper fadeIn">
            <v-row
              :class="
                msg.userId === user.uid
                  ? 'd-flex justify-end'
                  : 'd-flex justify-start'
              "
              v-for="(msg, i) in chatRooms[friendDocID].messagesList"
              :key="i"
            >
              <v-col cols="12" class="text-center mr-auto py-0">
                <div class="d-block">
                  <div class="d-flex justify-center">
                    <p class="font-weight-bold mr-2 my-0">{{ msg.userName }}</p>
                    |
                    <span class="primary--text ml-2 my-0">{{
                      new Date(msg.createdAt).toLocaleString("en-UK").slice(-8)
                    }}</span>
                  </div>
                </div>
                <div>
                  <v-avatar size="40"
                    ><v-img :src="msg.avatar"></v-img
                  ></v-avatar>
                </div>
              </v-col>
              <v-col
                cols="auto"
                :class="
                  msg.userId === user.uid
                    ? 'align-center chat-conversation my-conversation d-flex'
                    : 'align-center chat-conversation user-conversation d-flex'
                "
              >
                <div>
                  {{ msg.message }}
                </div>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-card-text>
      <v-card-actions id="message-box-section" class="pa-0 ma-0 d-flex">
        <v-textarea
          id="message-inbox"
          :placeholder="$t('comp-chat.write')"
          hide-details
          no-resize
          v-model="myMessage"
          height="50px"
          filled
        >
        </v-textarea>
      </v-card-actions>
    </v-card>
    <v-card class="ml-2" id="friends-card" v-if="isChatting || showingFriends">
      <v-card-title
        class="
          gradient-background-1
          shadow-text
          white--text
          pa-2
          px-5
          d-flex
          justify-space-between
        "
      >
        <small>{{ $t("comp-chat.friends") }}</small>
        <v-btn icon @click="closeChatList">
        <v-icon class="white--text">
          mdi-close
        </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-0">
        <v-list dense class="pa-0 ma-0" :key="reRenderComponentKey">
          <div v-if="myFriendsList.length">
            <v-list-item-group>
              <v-list-item
                @click="chatWithFriend(friend)"
                v-for="(friend, i) in myFriendsList"
                :key="i"
                class="d-flex justify-space-between"
                active-class="primary lighten-4 black--text"
              >
                <div class="d-flex">
                  <v-list-item-avatar size="40">
                    <v-img :src="friend.avatar"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content class="d-flex">
                    <v-list-item-title>{{ friend.userName }}</v-list-item-title>
                    <v-list-item-subtitle class="black--text">
                      {{ friend.onlineStatus ? "Online" : "Offline" }}
                      <v-icon
                        size="10"
                        :color="friend.onlineStatus ? 'green' : 'red'"
                        class="mb-1"
                        >mdi-circle</v-icon
                      ></v-list-item-subtitle
                    >
                  </v-list-item-content>
                </div>
                <div
                  v-if="getHasNotification(friend)"
                >
                  <v-icon size="20" color="primary">mdi-message</v-icon>
                </div>
              </v-list-item>
            </v-list-item-group>
          </div>
          <div v-else>
            <v-list-item-content class="pa-2">
              <small class="red--text font-weight-bold text-center">{{
                $t("comp-chat.noFriends")
              }}</small>
            </v-list-item-content>
          </div>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      reRenderComponentKey: 0,
      minimized: false,
      friendAvatar: "",
      myMessage: "",
      friendName: "",
      friendDocID: "",
      loadingMessages: true,
      hasReadTheMessage: false,
      hasNotification: false,
    };
  },
  watch: {
    showingFriends(val) {
      if (!val) {
        this.minimized = false;
        this.$emit("minimize-chat", this.minimized);
      }
    },
    // isChatting(val) {
    //   if (val) {
    //     this.$store.dispatch("hasReadTheMessage", this.friendDocID);
    //   }
    // },
  },
  computed: {
    ...mapState(["showingFriends", "myFriendsList", "user", "chatRooms", "userToChat", "isChatting"]),
  },
  mounted() {
    this.$store.dispatch("generateChatRooms");
    this.$store.dispatch("getAllMyMessages");
    this.sendMessageListener();
    if (this.userToChat) {
      let match = this.myFriendsList.find(user => user.docID === this.userToChat)
      this.chatWithFriend(match);
    }
  },
  methods: {
    closeChatList() {
      this.$store.commit("setChatIsActivated", false)
      this.$store.commit('setIsShowingFriends', false)
    },
    minimizeChat() {
      this.minimized = !this.minimized;
      this.$emit("minimize-chat", this.minimized);
    },
    async chatWithFriend(friend) {
      this.friendName = friend.userName;
      this.isChatting = true;
      this.friendDocID = friend.docID;
      this.friendAvatar = friend.avatar;
      await this.$store.dispatch("createChatRoom", friend.docID);
      await this.$store.dispatch("getAllMyMessages");
      await this.$store.dispatch("hasReadTheMessage", this.friendDocID);
      this.loadingMessages = false;
      this.getHasNotification(friend);
      setTimeout(() => {
        let chatWrapper = document.querySelector(".conversation-wrapper");
        let chatContainer = document.querySelector("#conversation-container");
        chatContainer.scrollTo(0, chatWrapper.scrollHeight);
      }, 50);
    },
    sendMessageListener() {
      window.addEventListener("keyup", (e) => {
        if (e.key === "Enter" && this.myMessage.trim() !== "") {
          this.$store.dispatch("createMessage", {
            message: this.myMessage,
            docID: this.friendDocID,
            avatar: this.user.photoURL,
          });
          this.myMessage = "";
          // this.$store.dispatch("getMessages", this.friendDocID);
          this.$store.dispatch("getAllMyMessages");
        }
        setTimeout(() => {
          let chatWrapper = document.querySelector(".conversation-wrapper");
          let chatContainer = document.querySelector("#conversation-container");
          chatContainer.scrollTo(0, chatWrapper.scrollHeight);
        }, 50);
      });
    },
    getHasNotification(friend) {
      console.log('Friend ==> ', friend)
    },
    closeChat() {
      this.isChatting = false;
    },
  },
};
</script>

<style lang="scss">
#chat-wrapper {
  width: 400px;
  height: 350px;
  z-index: 9999999;
}
#chat-card {
  position: relative;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
}

#conversation-container {
  max-height: 355px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
}

#friends-card {
  width: 200px;
  position: relative;
  top: 0;
  right: 0;
  height: 100%;
}

.chat-conversation {
  border-radius: 15px;
  color: black;
  font-size: 12px;
  margin-block: 5px;
  margin-inline: 10px;
  width: auto;
  overflow: hidden;
  box-shadow: 1px 2px 2px #959595;

  div {
    width: 100%;
  }
}

.user-conversation {
  background: rgb(224, 255, 183);
}
.my-conversation {
  background: rgb(183, 235, 255);
}

#message-box-section {
  position: absolute;
  bottom: 0;
  width: 100%;
}

#message-send-btn {
  position: absolute;
  right: 0;
  cursor: pointer;

  &:hover {
    background: none !important;
    outline-color: none !important;
  }
}

.message-badge {
  position: absolute;
  top: 1.5em;
  right: 1.5em;
  transform: translate(50%, -50%);
  background: #ff3737;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  z-index: 99999;
}
</style>

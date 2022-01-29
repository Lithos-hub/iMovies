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
          <div
            v-if="!loadingMessages"
            class="conversation-wrapper fadeIn"
          >
            <v-row
              :class="
                msg.userId === user.uid
                  ? 'd-flex justify-end'
                  : 'd-flex justify-start'
              "
              v-for="(msg, i) in chatRooms[friendDocID].messagesList"
              :key="i"
            >
              <v-col cols="3" class="text-center mr-auto">
                <div class="d-block">
                  <div>
                    <small class="font-weight-bold">{{ msg.userName }}</small>
                  </div>
                </div>
                <div>
                  <v-avatar size="40"
                    ><v-img :src="msg.avatar"></v-img
                  ></v-avatar>
                </div>
              </v-col>
              <v-col
                cols="8"
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
          placeholder="Escribe un mensaje"
          hide-details
          v-model="myMessage"
          height="50px"
          filled
        >
        </v-textarea>
        <!-- <div id="message-send-btn" class="mr-2" @click="sendMessage">
          <v-icon color="primary">mdi-send</v-icon>
        </div> -->
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
        <small>Amigos</small>
      </v-card-title>
      <v-card-text class="pa-0">
        <v-list dense class="pa-0 ma-0">
          <div v-if="myFriendsList.length">
            <v-list-item-group>
              <v-list-item
                @click="chatWithFriend(friend)"
                v-for="(friend, i) in myFriendsList"
                :key="i"
                active-class="primary lighten-4 black--text"
              >
                <v-list-item-avatar size="40">
                  <v-img :src="friend.avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
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
              </v-list-item>
            </v-list-item-group>
          </div>
          <div v-else>
            <v-list-item-content class="pa-2">
              <small class="red--text font-weight-bold text-center"
                >Aún no has agregado a ningún usuario</small
              >
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
      isChatting: false,
      minimized: false,
      friendAvatar: "",
      myMessage: "",
      friendName: "",
      friendDocID: "",
      loadingMessages: true,
    };
  },
  watch: {
    showingFriends(val) {
      console.log("Showing friends? ", val);
      if (!val) {
        this.minimized = false;
        this.$emit("minimize-chat", this.minimized);
      }
    },
    messages(newVal, oldVal) {
      if (newVal !== oldVal) {
        setTimeout(() => {
          let chatWrapper = document.querySelector(".conversation-wrapper");
          let chatContainer = document.querySelector("#conversation-container");
          chatContainer.scrollTo(0, chatWrapper.scrollHeight);
        }, 50);
      }
    },
  },
  computed: {
    ...mapState([
      "messages",
      "showingFriends",
      "myFriendsList",
      "user",
      "chatRooms",
    ]),
  },
  mounted() {
    this.$store.dispatch("generateChatRooms");
    this.$store.dispatch("getAllMyMessages");
    this.sendMessage();
  },
  methods: {
    minimizeChat() {
      this.minimized = !this.minimized;
      this.$emit("minimize-chat", this.minimized);
    },
    async chatWithFriend(friend) {
      console.log(friend)
      this.friendName = friend.userName
      this.isChatting = true;
      this.friendDocID = friend.docID;
      this.friendAvatar = friend.avatar;
      this.$store.dispatch("createChatRoom", friend.docID);
      // this.$store.dispatch("getMessages", friend.docID);
      this.$store.dispatch("getAllMyMessages");
      this.loadingMessages = false;
      if (this.chatRooms.length) {
        setTimeout(() => {
          let chatWrapper = document.querySelector(".conversation-wrapper");
          let chatContainer = document.querySelector("#conversation-container");
          chatContainer.scrollTo(0, chatWrapper.scrollHeight);
        }, 50);
      }
      this.$forceUpdate();
    },
    sendMessage() {
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
        if (this.chatRooms.length) {
          setTimeout(() => {
            let chatWrapper = document.querySelector(".conversation-wrapper");
            let chatContainer = document.querySelector(
              "#conversation-container"
            );
            chatContainer.scrollTo(0, chatWrapper.scrollHeight);
          }, 50);
        }
      });
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
</style>

<template>
  <div id="chat-wrapper" class="d-flex justify-end" v-if="isChatting">
    <v-card id="chat-card">
      <v-card-title
        class="primary white--text pa-2 px-5 d-flex justify-space-between"
      >
        <small>Chat</small>
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
          <v-container id="conversation-container">
              <v-row class="d-flex justify-start my-2" v-for="(msg, i) in messages" :key="i">
                  <v-col cols="auto" class="user-conversation">{{ msg }}</v-col>
              </v-row>
              <!-- <v-row class="d-flex justify-end my-2">
                  <v-col class="my-conversation" cols="auto">¡Hey! Has visto la nueva de Spider-man?</v-col>
              </v-row> -->
          </v-container>
      </v-card-text>
      <v-card-actions id="message-box-section" class="pa-0 ma-0 d-flex">
        <v-text-field id="message-inbox" placeholder="Mensaje" @keydown.enter="sendMessage" hide-details v-model="myMessage" height="50px" filled>
        </v-text-field>
        <div id="message-send-btn" class="mr-2" @click="sendMessage">
            <v-icon color="primary">mdi-send</v-icon>
        </div>
      </v-card-actions>
    </v-card>
    <v-card class="ml-2" id="friends-card" v-if="isChatting || showingFriends">
      <v-card-title
        class="gradient-background-1 shadow-text white--text pa-2 px-5 d-flex justify-space-between"
      >
        <small>Amigos</small>
      </v-card-title>
      <v-card-text class="pa-0">
        <v-list dense class="pa-0 ma-0">
            <div v-if="friends.length">
          <v-list-item @click="chatWithFriend(friend)" v-for="(friend, i) in friends" :key="i">
            <v-list-item-avatar size="40">
              <v-img
                :src="friend.avatar"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ friend.userName }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ friend.isOnline ? 'Online' : 'Offline' }}
                <v-icon size="10" :color="friend.isOnline ? 'green' : 'red'" class="mb-1"
                  >mdi-circle</v-icon
                ></v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
            </div>
            <div v-else>
              <v-list-item-content class="pa-2">
                <small class="red--text font-weight-bold text-center">Aún no has agregado a ningún usuario</small>
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
      minimized: false,
      myMessage: '',
      selectedUserUID: '',
      friends: [
        {
          avatar: "https://randomuser.me/api/portraits/men/79.jpg",
          userName: "Manolo",
          isOnline: true,
          uid: 'Tomate'
        },
        {
          avatar: "https://randomuser.me/api/portraits/men/72.jpg",
          userName: "Manuel",
          isOnline: false,
          uid: 'Berenjena'
        },
        {
          avatar: "https://randomuser.me/api/portraits/women/79.jpg",
          userName: "Jesusa",
          isOnline: true,
          uid: 'Boniato'
        },
      ],
    }
  },
    watch: {
      showingFriends (val) {
        console.log('Showing friends? ', val)
        if (!val) { 
          this.minimized = false
          this.$emit("minimize-chat", this.minimized);
        }
      }
    },
  computed: {
    ...mapState(['isChatting', 'messages', 'showingFriends'])
  },
  methods: {
    minimizeChat() {
      this.minimized = !this.minimized;
      this.$emit("minimize-chat", this.minimized);
    },
    chatWithFriend(friend) {
      this.selectedUserUID = friend.uid;
      this.$store.dispatch("createChatRoom", friend.uid);
      this.$store.commit('setIsChatting', true)
    },
    sendMessage() {
      this.$store.dispatch("createMessage", { myMessage: this.myMessage, friendUid: this.selectedUserUID });
      this.myMessage = ''
      this.$store.dispatch("getMessages")
      console.log(this.messages)
    },
    closeChat() {
      this.$store.commit('setIsChatting', false)
    }
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
  width: 250px;
  height: 100%;
}

#conversation-container {
    max-height: 355px;
    overflow-y: auto;

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

.user-conversation {
    background: rgb(224, 255, 183);
    border-radius: 15px;
    color: black;
    font-size: 12px;
    margin-inline: 5px;
}
.my-conversation {
    background: rgb(183, 235, 255);
    border-radius: 15px;
    color: black;
    font-size: 12px;
    margin-inline: 5px;
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

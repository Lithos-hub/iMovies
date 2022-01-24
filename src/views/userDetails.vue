<template>
  <div>
    <v-container>
      <Spinner v-if="isLoading" />
      <h1>User details</h1>
      <v-divider class="cyan"></v-divider>
      <v-container fluid v-if="!isLoading">
        <div class="d-flex justify-start">
          <div>
            <v-img
              :src="userDetailsData.avatar"
              width="200"
              height="200"
              class="mr-auto"
            ></v-img>
          </div>
          <div class="d-block ml-5">
            <div class="cyan--text">
              Username:
              <span class="white--text">
                {{ userDetailsData.userName }}</span
              >
            </div>
            <div class="cyan--text">Cumpleaños:</div>
            <div class="cyan--text">De:</div>
            <div class="cyan--text">Amigos desde:</div>
            <div class="cyan--text mt-5">
              <v-btn fab color="white" @click="sendMessage"><v-icon color="primary">mdi-forum</v-icon></v-btn>
            </div>
          </div>
        </div>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { db } from "../../firebase";
import Spinner from "../components/Spinner";
export default {
  components: {
    Spinner,
  },
  data() {
    return {
      userDocID: this.$route.params.id,
    };
  },
  computed: {
    ...mapState(["userDetailsData", "isLoading"]),
  },
  created() {
    this.getUserData();
  },
  methods: {
    async getUserData() {
      const USER_REF = await db.doc(`userData/${this.userDocID}`).get();
      let userData = USER_REF.data();
      this.$store.dispatch("getUserDetailsData", {
        data: userData,
        id: this.userDocID,
      });
    },
    sendMessage () {
      this.$store.commit("setChatIsActivated", true);
    }
  },
};
</script>

<style lang="scss"></style>

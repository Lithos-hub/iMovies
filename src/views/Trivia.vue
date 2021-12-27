<template>
  <div>
    <div class="centered">
      <v-btn
        v-if="hasSavedGame"
        tile
        class="d-block my-5 gradient-background-2 white--text"
        width="150"
        @click="loadGame"
        >Continuar</v-btn
      >
      <v-btn
        tile
        class="d-block my-5 gradient-background-1 white--text"
        width="150"
        @click="launchFirstGame"
        >Jugar</v-btn
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      hasSavedGame: false,
    };
  },
  mounted() {
    this.getSavedGame();
  },
  methods: {
    getSavedGame() {
      this.hasSavedGame = false;
    },
    loadGame() {
      // TODO: get de ID of the last game saved
      const id = null;
      this.$router.push(`/trivia/game/${id}`);
    },
    launchFirstGame() {
      this.$router.push("/trivia/game/instructions");
    },
  },
};
</script>

<style></style>

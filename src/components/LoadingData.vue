<template>
      <v-container fluid id="loading-container">
      <v-progress-circular
      class="centered"
      :size="100"
      color="#00ffff"
      indeterminate
    ></v-progress-circular>
    <p class="centered cyan--text">Loading</p>
    </v-container>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import "src/scss/app";
@import "src/scss/variables";

#loading-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: $dark;
  height: 120px;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
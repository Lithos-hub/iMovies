<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      min-width="100%"
      class="snackbar"
      elevation="0"
      rounded="0"
      :color="snackbarColor"
    >
      <div class="snackbar-text">
        {{ snackbarText }}
      </div>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    snackbarColor: {
      type: String,
      default: 'white'
    },
    snackbarText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      snackbar: true
    }
  }
}
</script>

<style lang="scss">

.snackbar {
  position: fixed !important;
  margin: 0 auto !important;
  bottom: -10px !important;
  left: 0;
}

.snackbar-icon {
    position: fixed;
    left: 1em;
    top: 0;
}

.snackbar-text {
    text-align: center;
    font-size: 18px;
    font-weight: 300;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    justify-content: center;
    align-self: center;
    font-family: 'Roboto', sans-serif;
}

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  .snackbar-text {
    font-size: 12px;
  }
}

// ******* LAPTOP AND DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  .snackbar-text {
    font-size: 18px;
  }
}

</style>
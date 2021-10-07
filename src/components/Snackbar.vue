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
    font-size: 20px;
    position: absolute;
    inset: 0;
    padding-top: 10px;
    justify-content: center;
    align-self: center;
}

</style>
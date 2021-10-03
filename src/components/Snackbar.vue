<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      min-width="100%"
      class="snackbar ma-0 mt-auto"
      elevation="0"
      rounded="0"
      :color="snackbarColor"
    >
      <v-row>
          <v-col cols="12">
        <div class="snackbar-text">
          {{ snackbarText }}
        </div>
          </v-col>
      </v-row>
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
    font-size: 18px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

</style>
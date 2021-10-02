<template>
  <v-dialog
    v-model="show"
    class="dialog"
    overlay-opacity="10"
  >
    <v-card height="100%" class="cardDialog">
      <div class="row videoDialog">
        <v-sheet
          color="error darken-2"
          width="100%"
          height="100%"
          dark
          class="pa-5"
          v-show="messageError.length != 0"
        >
          <h1 class="video-error">{{ messageError }}</h1>
        </v-sheet>

        <iframe
          class="video"
          :src="video"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          v-show="messageError.length != 0 ? false : true"
        ></iframe>
      </div>

      <div class="closeDialog-btn">
        <v-btn color="error" block @click="closeDialog()" tile> Close </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["video", "messageError"],
  data() {
    return {
      show: true,
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
  },
};
</script>

<style lang="scss">
@import "src/scss/variables";

//****************************** MOBILE DIALOG ******************************//
@media only screen and (min-width: 360px) {
  .videoDialog {
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
  }

  .closeDialog-btn {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    padding: 0px;
  }

  .video {
    height: 600px;
  }

  .cardDialog {
    bottom: 0px;
    width: 100%;
    height: 100%;
    z-index: 999999;
    background: $dark2 !important;
  }

  .video-error {
    font-size: 1em;
    text-align: center;
  }

  .dialog {
    height: 100%;
    overflow: hidden;
  }
}

//****************************** LAPTOP DIALOG ******************************//
@media only screen and (min-width: 767px) {
  .videoDialog {
    padding: 20px;
    width: 100%;
    height: 100%;
  }

  .closeDialog-btn {
    position: relative;
    width: 100%;
    top: 0px;
    margin: 0 auto;
  }

  .video {
    height: 500px;
  }

  .cardDialog {
    width: 100%;
    height: 100%;
    z-index: 999999;
    background: $dark2 !important;
  }

  .video-error {
    font-size: 1.5em;
    text-align: center;
  }

  .dialog {
    height: 100%;
  }
}

//****************************** DESKTOP DIALOG ******************************//
@media only screen and (min-width: 1370px) {
  .videoDialog {
    padding: 20px;
    width: 100%;
    height: 100%;
  }

  .closeDialog-btn {
    position: relative;
    width: 100%;
  }

  .video {
    height: 700px;
  }

  .cardDialog {
    width: 100%;
    height: 100%;
    z-index: 999999;
    background: $dark2 !important;
  }

  .video-error {
    font-size: 2em;
    text-align: center;
  }

  .dialog {
    height: 100%;
  }
}
</style>

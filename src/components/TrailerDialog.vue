<template>
  <v-dialog
    v-model="show"
    :overlay-opacity="0.8"
  >
    <v-card height="auto" width="auto" class="cardDialog pa-0 ma-0">
      <div class="videoDialog">
        <v-sheet
          v-if="videoNoAvailable"
          color="error darken-2"
          width="100%"
          height="100%"
          dark
          class="pa-5"
        >
          <h1 class="video-error">{{ messageError }}</h1>
        </v-sheet>

        <div v-if="!videoNoAvailable">
        <iframe
          class="video"
          :src="video"
          frameborder="0"
          width="auto" height="100%"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        </div>
      </div>

      <div class="closeDialog-btn">
        <v-btn color="error" block @click="closeDialog()" tile> Close </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: ["video"],
  data() {
    return {
      show: true,
      messageError: "Video no available"
    };
  },
  computed: {
    ...mapState(['videoNoAvailable']),
    width () {
      switch (this.$vuetify.breakpoint.name) {
          case 'xs': return '220px'
          case 'sm': return '400px'
          case 'md': return '500px'
          case 'lg': return '600px'
          case 'xl': return '800px'
        }
    },
    height () {
      switch (this.$vuetify.breakpoint.name) {
          case 'xs': return '220px'
          case 'sm': return '400px'
          case 'md': return '500px'
          case 'lg': return '600px'
          case 'xl': return '800px'
        }
    }
  },
  mounted () {
    console.log(this.video)
    if (this.videoNoAvailable) {
      console.log('Video no available')
    }
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
    padding: 0px;
    width: 100%;
    height: 100%;
  }

  .closeDialog-btn {
    position: relative;
    width: 100%;
  }

  .video {
    margin: 0 auto;
    height: 200px;
    width: 100%;
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
}

//****************************** LAPTOP DIALOG ******************************//
@media only screen and (min-width: 767px) {
  .videoDialog {
    padding: 0px;
    width: 100%;
    height: 100%;
  }

  .closeDialog-btn {
    position: relative;
    width: 100%;
  }

  .video {
    margin: 0 auto;
    height: 500px;
    width: 100%;
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
}

//****************************** DESKTOP DIALOG ******************************//
@media only screen and (min-width: 1370px) {
  .videoDialog {
    padding: 0px;
    width: 100%;
    height: 100%;
  }

  .closeDialog-btn {
    position: relative;
    width: 100%;
  }

  .video {
    margin: 0 auto;
    height: 800px;
    width: 100%;
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
}
</style>

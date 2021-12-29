<template>
  <div class="text-center surprise centered">
    <div
      v-if="warning"
      min-width="100%"
      :class="'warning-component ' + warningColor"
      elevation="0"
      rounded="0"
    >
      <div class="warning-text">
        {{ warningText }}
      </div>
      <v-icon color="white" size="100">{{ correctAnswer ? 'mdi-thumb-up' : 'mdi-thumb-down'}}</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    warningColor: {
      type: String,
      default: "white",
    },
    warningText: {
      type: String,
      default: "",
    },
    correctAnswer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      warning: true,
    };
  },
};
</script>

<style lang="scss">
@import '@/scss/_variables.scss';
@import '@/scss/app.scss';

.warning-component {
    position: fixed !important;
    margin: 0 auto !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 5px solid white;
    height: 200px;
    width: 200px;

}

.warning-success {
  background: $gradient_success;
}
.warning-error {
  background: $gradient_danger;
}

.warning-icon {
  position: fixed;
  left: 1em;
  top: 0;
}
.warning-text {
    margin-top: 25px;
    text-align: center;
    font-size: 20px;
    font-weight: 300;
    justify-content: center;
    align-self: center;
    font-family: "Roboto", sans-serif;
}
// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  .warning-text {
    font-size: 12px;
  }
}

// ******* LAPTOP AND DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  .warning-text {
    font-size: 18px;
  }
}
</style>

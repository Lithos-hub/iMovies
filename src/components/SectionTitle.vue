<template>
  <div>
    <v-sheet class="section-title" color="gradient-background-1">{{
      title
    }}</v-sheet>
  </div>
</template>

<script>
export default {
  props: ["sectionName", "title"],
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";
@import "src/scss/app";

.section-title {
  position: relative;
  padding: 10px;
  animation: animate 2s ease-in-out;
}

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  .section-title {
    text-align: center;
    font-family: $style3;
    font-size: 2em;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  .section-title {
    text-align: center;
    font-family: $style3;
    font-size: 3em;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  .section-title {
    text-align: center;
    font-family: $style3;
    font-size: 3em;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

@keyframes animate {
  0% {
    opacity: 0;
    right: 2000px;
  }
  100% {
    opacity: 1;
    right: 0px;
  }
}

</style>

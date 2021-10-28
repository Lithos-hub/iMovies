<template>
  <div>
    <v-sheet class="section-subtitle" color="transparent">{{
      title
    }}</v-sheet>
  </div>
</template>

<script>
export default {
  name: "SectionTitle",
  props: ["sectionName", "title"],
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

.section-subtitle {
  position: relative;
  font-family: $style3;
  font-size: 2em;
  text-align: center;
  letter-spacing: 10px;
  color: cyan !important;
  padding: 10px;
  animation: animate 2s ease-in-out;
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

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  .section--Title {
    text-align: center;
    font-family: $style2;
    font-size: 2em;
    overflow: hidden;
    background: url("../assets/img/background4.jpg");
    background-position: right;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section--Title--Background {
    background: linear-gradient(to left, black 0%, rgb(26, 26, 26) 70%);
    padding-left: 10px;
  }

  .sectionTitle {
    position: relative;
    width: 100%;
    z-index: 1;
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  .section--Title {
    text-align: center;
    font-family: $style2;
    font-size: 3em;
    overflow: hidden;
    background: url("../assets/img/background4.jpg");
    background-position: right;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section--Title--Background {
    background: linear-gradient(to left, black 0%, rgb(26, 26, 26) 70%);
    padding-left: 20px;
  }

  .sectionTitle {
    position: relative;
    width: 100%;
    z-index: 1;
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  .section--Title {
    text-align: center;
    font-family: $style3;
    font-size: 4em;
    overflow: hidden;
    background: url("../assets/img/background4.jpg");
    background-position: right;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section--Title--Background {
    background: linear-gradient(to left, black 0%, rgb(26, 26, 26) 70%);
    padding-left: 20px;
  }

  .sectionTitle {
    position: relative;
    width: 100%;
    z-index: 1;
  }
}
</style>

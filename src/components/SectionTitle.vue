<template>
  <div class="sectionTitle">
    <v-card width="100%" elevation="10" tile class="section--Title--Background">
      <h1 class="section--Title">
        {{ sectionName }}
      </h1>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "SectionTitle",
  props: ["sectionName"],
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  .section--Title {
    text-align: center;
    font-family: $style2;
    font-size: 2em;
    letter-spacing: 10px;
    overflow: hidden;
    background: url("../assets/img/background2.jpg");
    background-position: center;
    background-attachment: fixed;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section--Title--Background {
    background: linear-gradient(to left, black 0%, rgb(26, 26, 26) 70%);
    padding: 10px;
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
    font-size: 4em;
    letter-spacing: 10px;
    overflow: hidden;
    background: url("../assets/img/background2.jpg");
    background-position: center;
    background-attachment: fixed;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section--Title--Background {
    background: linear-gradient(to left, black 0%, rgb(26, 26, 26) 70%);
    padding: 10px;
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
    font-family: $style2;
    font-size: 5em;
    letter-spacing: 10px;
    overflow: hidden;
    background: url("../assets/img/background2.jpg");
    background-position: center;
    background-attachment: fixed;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section--Title--Background {
    background: linear-gradient(to left, black 0%, rgb(26, 26, 26) 70%);
    padding: 10px;
  }

  .sectionTitle {
    position: relative;
    width: 100%;
    z-index: 1;
  }
}
</style>

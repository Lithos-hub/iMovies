<template>
  <div>
    <v-row id="faviconbar-row">
      <div id="faviconbar"></div>
    </v-row>

    <v-row class="mt-10">
      <v-col></v-col>
      <v-col class="text-center">
        <h2 class="text-h1 cyan--text text-center mb-10">{{ $t('view-about.title') }}</h2>
        <p>{{ $t('view-about.text1') }}</p> 
        <p>{{ $t('view-about.text2') }}</p>
        <p>{{ $t('view-about.text3') }}</p>
        <p>{{ $t('view-about.text4') }}</p>
        <p>{{ $t('view-about.text5') }}</p>
        <p>{{ $t('view-about.text6') }}</p> 
      </v-col>
      <v-col></v-col>
    </v-row>
  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";

export default {
  name: "About",
  components: {
    SectionTitle,
  },
  data() {
    return {
      name: "About",
    };
  },
  mounted () {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

#faviconbar {
  background: url("../assets/img/favicon.jpg");
  margin: 0 auto;
  width: 100%;
  position: fixed;
  right: 0;
  opacity: 0.2;
  height: 1000px;
  background-size: cover;
  background-position: center;
}

#faviconbar-row {
  background: #171717;
}

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  .about-text {
    padding: 10px;
    margin-top: 20px;
    text-align: justify;
    color: white !important;
    font-size: 20px;
    font-family: $style3;
    line-height: 30px;
  }

  .list {
    margin-left: 20px;
    color: $secondary;
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  .about-text {
    padding: 20px;
    margin-top: 20px;
    text-align: justify;
    color: white !important;
    font-size: 1.5em;
    font-family: $style3;
    line-height: 40px;
  }

  .list {
    margin-left: 20px;
    color: $secondary;
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  .about-text {
    padding: 50px;
    margin-top: 0px;
    text-align: justify;
    color: white !important;
    font-size: 2em;
    font-family: $style3;
    line-height: 40px;
  }

  .list {
    margin-left: 20px;
    color: $secondary;
  }
}
</style>

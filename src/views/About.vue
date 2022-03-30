<template>
  <div>
    <v-row id="faviconbar-row">
      <div id="faviconbar"></div>
    </v-row>

    <v-row class="mt-10">
      <v-col v-if="!isUsingMobile"></v-col>
      <v-col :cols="isUsingMobile ? '12' : '6'" class="text-center">
        <h2 :class="isUsingMobile ? 'text-h5 cyan--text text-center mb-10' : 'text-h1 cyan--text text-center mb-10'">{{ $t('view-about.title') }}</h2>
        <p>{{ $t('view-about.text1') }}</p> 
        <p>{{ $t('view-about.text2') }}</p>
        <p>{{ $t('view-about.text3') }}</p>
        <p>{{ $t('view-about.text4') }}</p>
        <p>{{ $t('view-about.text5') }}</p>
        <p>{{ $t('view-about.text6') }}</p>
        <p>{{ $t('view-about.text7') }}</p>
      </v-col>
      <v-col v-if="!isUsingMobile"></v-col>
    </v-row>
  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import Services from '../services/services';

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
  computed: {
    isUsingMobile() {
      return this.$vuetify.breakpoint.xs;
    },
  },
  mounted () {
    Services.hasVisitedTheSection("about");
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
  p {
    font-size: 13px;
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {

  p {
    font-size: 15px;
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {

  p {
    font-size: 18px;
  }
}
</style>

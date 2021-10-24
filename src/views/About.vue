<template>
  <div>
    <v-row id="faviconbar-row">
      <div id="faviconbar"></div>
    </v-row>

    <v-row class="mt-10">
      <v-col></v-col>
      <v-col class="text-center">
        <h2 class="text-h1 cyan--text text-center mb-10">About iMovies</h2>
        <p>iMovies is an app to show information about movies using The Movie Database API.</p>
        <p>Since the 1.9.0 version, it is possible to save movies in some categories such as 'Favourite', 'Wish List', 'Watched' and 'Rated'.</p>
        <p>In November 2021 was released the 2.0.0 version with a lot of improvements and some new features. The storage system was improved and setted in a globally way, so the user is able to save and rate movies all around the app using LocalStorage.</p>
        <p>In the other hand, the landing page was changed in a 'Netflix style'. Ranking view was renamed as Popular, and it was added a symple way to search movies by year. The Search view was modified and it was included a dual search system: by movie, and by actor/actress name.</p>
        <p>Last but not least, it was added internationalization using i18n. So, both the app and the movies info is available in English and Spanish.</p>
        <p>This app is under constant development, and it will be new content in the future.</p>
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

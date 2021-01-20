<template>
  <div>
    <v-row id="faviconbar-row">
      <div id="faviconbar"></div>
    </v-row>

    <v-row class="text-center">
      <v-col lg="6" xs="12">
        <v-card color="transparent" height="100%" elevation="10">
          <v-card-text class="about-text">
            <v-img
              src="../assets/img/english-icon.jpg"
              width="100"
              height="50"
              class="d-block ma-auto mb-5"
            ></v-img>
            This application uses
            <span class="blue--text">The Movie Database (TMDB) API.</span><br /><br />

            The app is divided into some sections that can be accesible by the expandible
            side menu, like:
            <div class="list">
              <br />
              Famous current movies (Trending).<br />
              The latest available movie trailers (Trailers);<br />
              Movies classified by genres and popularity (Genres);<br />
              Or a popular movies classification by year, from 2010 to 2020 (Ranking).<br /><br />
            </div>
            In some of those sections you may get or access certain info with buttons that
            trigger a modal window.<br /><br />
            Since <span class="green--text">Version 1.5.0</span> it is possible to save
            movies in different categories using LocalStorage. Those movies can be saved
            for now from the 'Ranking' section and can be shown in the 'My Movies'
            section.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="6" xs="12">
        <v-card color="transparent" height="100%" tile elevation="10">
          <v-card-text class="about-text">
            <v-img
              src="../assets/img/spanish-icon.jpg"
              width="100"
              height="50"
              class="d-block ma-auto mb-5"
            ></v-img>
            Esta aplicación utiliza la API de
            <span class="blue--text">The Movie Database (TMDB).</span> <br /><br />

            La app se divide en varias secciones accesibles desde el menú lateral
            desplegable, como:
            <div class="list">
              <br />
              Películas que se encuentran actualmente de moda (Trending);
              <br />Últimos trailers disponibles (Trailers); <br />Clasificación de
              películas por género y ordenadas en popularidad (Genres) <br />O una
              clasificación de películas populares por año, desde 2010 hasta 2020
              (Ranking). <br /><br />
            </div>
            En algunas de estas secciones se puede ampliar o acceder a cierta información
            mediante botones que lanzan una ventana modal. <br /><br />
            Desde la <span class="green--text">Version 1.5.0</span> es posible el registro
            de películas en diferentes categorías mediante LocalStorage. Las películas
            pueden guardarse de momento desde la sección 'Ranking' y pueden consultarse
            esas listas en la sección 'My Movies'.
          </v-card-text>
        </v-card>
      </v-col>
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
  width: 150px;
  height: 150px;
  background-size: cover;
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

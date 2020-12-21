<template>
  <div>
    <SectionTitle :sectionName="name" />

    <v-row class="text-center">
      <v-col lg="6" xs="12">
        <v-card color="transparent" height="100%" elevation="10">
          <v-card-text class="about-text">
            <v-img
              src="../assets/img/english-icon.jpg"
              width="60"
              height="30"
              class="text-center d-block ma-auto mb-2"
            ></v-img>
            This application uses The Movie Database (TMDB) API.<br /><br />

            The app is divided into some sections that can be accesible by the expandible
            side menu:
            <div class="list">
              <br />
              Famous current movies (Trending).<br />
              The latest available movie trailers (Trailers);<br />
              Movies classified by genres and popularity (Genres);<br />
              And a popular movies classification by year, from 2010 to 2020.<br /><br />
            </div>
            In some of those sections you may get or access certain info with buttons that
            trigger a modal window.
            <br /><br />
            In the future, I'll add new features like the posibility to create
            want-to-watch movie lists or a search system to filter movies with names of
            actors, genres, or years of release.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="6" xs="12">
        <v-card color="transparent" height="100%" tile elevation="10">
          <v-card-text class="about-text">
            <v-img
              src="../assets/img/spanish-icon.jpg"
              width="60"
              height="30"
              class="text-center d-block ma-auto mb-2"
            ></v-img>
            Esta aplicación utiliza la API the The Movie Database (TMDB). <br /><br />

            La app se divide en varias secciones accesibles desde el menú lateral
            desplegable:
            <div class="list">
              <br />
              Películas que se encuentran actualmente de moda (Trending);
              <br />Últimos trailers disponibles (Trailers); <br />Clasificación de
              películas por género y ordenadas en popularidad (Genres) <br />Y una
              clasificación de películas populares por año, desde 2010 hasta 2020
              (Ranking). <br /><br />
            </div>
            En algunas de estas secciones se puede ampliar o acceder a cierta información
            mediante botones que lanzan una ventana modal. <br />
            <br />
            En el futuro, añadiré nuevas funcionalidades como la posibilidad de crear tu
            propia lista películas que deseas ver o un sistema de búsqueda para filtrar
            películas con nombres de actores, géneros, o años de lanzamiento.
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

.about-text {
  padding: 0px;
  margin-top: 20px;
  color: white !important;
  font-size: 2em;
  font-family: $style3;
  line-height: 40px;
}

.list {
  margin-left: 20px;
  color: $primary;
}
</style>

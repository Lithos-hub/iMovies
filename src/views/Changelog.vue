<template>
  <v-container fluid>
    <h3 class="my-10 sup-bar pa-2 rounded">Changelog</h3>

    <div class="list-group">
      <div class="list">
        <span class="font-weight-bold">Version 1.1</span>
        <ul>
          <li>
            Added dynamic routes on main page when you click over a movie image to get
            details about that movie.
          </li>
        </ul>
      </div>

      <div class="list">
        <span class="font-weight-bold">Version 1.2</span>
        <ul>
          <li>Added dynamic trailers dialogs in <i>/movie/id</i> page.</li>
          <li>Added some aesthetic changes in <i>/trailers</i> page.</li>
        </ul>
      </div>

      <div class="list">
        <span class="font-weight-bold">Version 1.3</span>
        <ul>
          <li>
            Optimized code in the <i>Genres</i> section using v-bind and v-on:click to use
            a single function to return movies of different genres.
          </li>
          <li>+ Some aesthetic changes in general.</li>
        </ul>
      </div>

      <div class="list">
        <span class="font-weight-bold">Version 1.4</span>
        <ul>
          <li>New features in <i>Trending</i> section.</li>
          <li>Optimized code in <i>Ranking</i> section.</li>
          <li>
            New responsive features in <i>Ranking</i> section and some aesthetic changes.
          </li>
        </ul>
      </div>

      <div class="list">
        <span class="font-weight-bold">Version 1.5</span>
        <ul>
          <li>Added <i>My Movies</i> section.</li>
          <li>
            Added new features (Watched, Favourite, Rate and To-Watch) in
            <i>Ranking</i> section using LocalStorage.
          </li>
        </ul>
      </div>

      <div class="list">
        <span class="font-weight-bold">Version 1.6</span>
        <ul>
          <li>Optimized code in <i>Trailers</i> section.</li>
          <li>General aesthetic improvements.</li>
          <li>Info button available in <i>My Movies</i> section.</li>
          <li>
            Now is possible to save the user rates for each movie in <i>My Movies.</i>
          </li>
        </ul>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  .sup-bar {
    background-image: url("../assets/img/background4.jpg");
    background-position: center;
    filter: brightness(2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: white;
    font-size: 2em;
    text-align: center;
    background-size: cover;
  }
  .list {
    font-size: 1em;
  }
  .list-group {
    background: white;
    padding: 20px;
    color: black;
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  .sup-bar {
    background-image: url("../assets/img/background4.jpg");
    background-position: center;
    filter: brightness(2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: white;
    font-size: 2em;
    text-align: center;
    background-size: cover;
  }
  .list {
    font-size: 1em;
  }
  .list-group {
    background: white;
    padding: 20px;
    color: black;
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  .sup-bar {
    background-image: url("../assets/img/background4.jpg");
    background-position: center;
    filter: brightness(2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: white;
    font-size: 3em;
    text-align: center;
    background-size: cover;
  }
  .list {
    font-size: 1em;
  }
  .list-group {
    background: white;
    padding: 20px;
    color: black;
  }
}
</style>

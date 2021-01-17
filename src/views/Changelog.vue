<template>
  <v-container fluid>
    <h3 class="my-10 sup-bar pa-2 rounded">Changelog</h3>

    <div class="list-group">
      <div class="list" v-for="(item, i) in changes" :key="i">
        <span class="font-weight-bold">{{ item.version }}</span>
        <ul>
          <li v-for="(change, i) in item.changes" :key="i">
            {{ change }}
          </li>
        </ul>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      changes: [
        {
          version: "Version 1.1.0",
          changes: [
            "Added dynamic routes on main page when you click over a movie image to get details about that movie.",
          ],
        },
        {
          version: "Version 1.2.0",
          changes: [
            "Added dynamic trailers dialogs in /movie/id page.",
            "Added some aesthetic changes in /trailers page.",
          ],
        },
        {
          version: "Version 1.3.0",
          changes: [
            "Optimized code in the Genres section using v-bind and v-on:click to use a single function to return movies of different genres.",
            "Some aesthetic changes in general.",
          ],
        },
        {
          version: "Version 1.4.0",
          changes: [
            "New features in Trending section.",
            "Optimized code in Ranking section.",
            "New responsive features in Ranking section and some aesthetic changes.",
          ],
        },
        {
          version: "Version 1.5.0",
          changes: [
            "Added My Movies section.",
            "Added new features (Watched, Favourite, Rate and To-Watch) in Ranking section using LocalStorage.",
          ],
        },
        {
          version: "Version 1.6.0",
          changes: [
            "Optimized code in Trailers section.",
            "General aesthetic improvements.",
            "Info button available in My Movies section.",
            "Now is possible to save the user rates for each movie in My Movies.",
          ],
        },
        {
          version: "Version 1.6.1",
          changes: ["Dynamic changelog.", "New logo.", "Fixed some api issues."],
        },
      ],
    };
  },
};
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

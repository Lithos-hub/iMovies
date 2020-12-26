<template>
  <v-container fluid>
    <h3 class="my-10 sup-bar pa-2 rounded">Changelog</h3>
    
     <div class="list-group">

        <div class="list"
          ><span class="font-weight-bold">Version 1.1</span>
          <ul>
            <li>
              Added dynamic routes on main page when you click over a movie image to get
              details about that movie.
            </li>
          </ul>
        </div>
     
     
        <div class="list"
          ><span class="font-weight-bold">Version 1.2</span>
          <ul>
            <li>Added dynamic trailers dialogs on <i>/movie/id</i> page</li>
            <li>Added some aesthetic changes on <i>/trailers</i> page</li>
          </ul>
        </div>
     
     
        <div class="list"
          ><span class="font-weight-bold">Version 1.3</span>
          <ul>
            <li>Optimized code in the section <i>Genres</i> using v-bind and v-on:click to use a single function to return movies of different genres.</li>
            <li>+ Some aesthetic changes in general.</li>
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
  background: url("../assets/img/background2.jpg");
  color: white;
  font-size: 1em;
  font-weight: bold;
  background-size: cover;
}
  .list {
  font-size:16px;
  width: 100%;
  height: 100%;
  text-align: justify;
  margin: 0 auto;
  padding: 2px;
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
  background: url("../assets/img/background2.jpg");
  color: white;
  font-size: 2em;
  font-weight: bold;
  background-size: cover;
}
  .list {
  font-size: 1em;
}
  .list-group {
    background: white;
    padding: 50px;
    color: black;
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  .sup-bar {
  background: url("../assets/img/background2.jpg");
  color: white;
  font-size: 3em;
  font-weight: bold;
  background-size: cover;
}
  .list {
  font-size: 1.5em;
  .list-group {
    background: white;
    padding: 50px;
    color: black;
  }
}
}
</style>

<template>
  <v-container>
    <h3 class="my-10 green pa-2 rounded">Changelog</h3>
    <v-list rounded>
      <v-list-item>
        <v-list-item-title class="list"
          ><span class="font-weight-bold">Version 1.1</span>
          <ul>
            <li>
              Added dynamic routes on main page when you click over a movie image to get
              details about that movie.
            </li>
          </ul>
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title class="list"
          ><span class="font-weight-bold">Version 1.2</span>
          <ul>
            <li>Added dynamic trailers dialogs on <i>/movie/id</i> page</li>
            <li>Added some aesthetic changes on <i>/trailers</i> page</li>
          </ul>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

.list {
  font-size: 1.2em;
}
</style>

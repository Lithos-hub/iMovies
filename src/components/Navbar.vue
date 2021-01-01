<template>
  <div id="navbar">
    <v-app-bar
      color="gray darken-4"
      dark
      class="overflow-hidden justify-content-between"
      width="100%"
      tile
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title class="mx-auto">
        <router-link to="/" class="router-link-default" active-class="brand-title"
          ><p class="brand-title ma-auto">iMovies</p></router-link
        >
      </v-toolbar-title>
      <router-link to="/about" class="router-link-default">
        <v-btn block small color="primary">About</v-btn>
      </router-link>
      <a href="https://github.com/Lithos-hub/VUEJS-iMovies" style="text-decoration: none">
        <v-btn icon>
          <v-icon> mdi-github </v-icon>
        </v-btn>
      </a>
      <div id="version-info">
        <p>Version: {{ version }}.{{ subversion }}</p>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary dark>
      <v-list nav class="mt-10 nav-list">
        <v-list-item-group v-model="group" active-class="black">
          <router-link to="/" class="router-link-nav">
            <v-list-item>
              <v-list-item-icon>
                <v-icon class="nav-icons">mdi-home</v-icon>
                <v-list-item-title class="nav-links">Home</v-list-item-title>
              </v-list-item-icon>
            </v-list-item>
          </router-link>

          <v-divider></v-divider>

          <v-list-item v-for="(items, i) in items" :key="i">
            <router-link :to="items.link" class="router-link-nav">
              <v-list-item-icon>
                <v-icon class="nav-icons">{{ items.icon }}</v-icon>
                <v-list-item-title class="nav-links">{{ items.title }}</v-list-item-title>
              </v-list-item-icon>
            </router-link>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-divider class="name-divider"></v-divider>
      <p class="lead" id="csg-name">{{ date }} - Carlos Segura García</p>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      date: new Date().getFullYear(),
      version: 1,
      subversion: 4,
      group: null,
      drawer: false,
      items: [
        { title: "Trending", icon: "mdi-table", link: "/trending" },
        { title: "Trailers", icon: "mdi-video-vintage", link: "/trailers" },
        { title: "Genres", icon: "mdi-shape", link: "/genres" },
        { title: "Ranking", icon: "mdi-format-list-numbered", link: "/ranking" },
        { title: "Changelog", icon: "mdi-lead-pencil", link: "/changelog" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

* {
  color: $primary;
  font-family: $style2;
}

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  .brand-title {
    padding-left: 0px;
    letter-spacing: 0px;
    margin: 0 auto;
  }

  .nav-icons {
    font-size: 1em !important;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 50px;
  }
  .nav-links {
    font-size: 15px !important;
    text-align: right !important;
    position: absolute;
    right: 10px;
  }

  .router-link-default {
    text-decoration: none;
  }

  .router-link-nav {
    text-decoration: none;
    width: 100%;
  }

  #csg-name {
    position: absolute;
    bottom: 10px;
    left: 15px;
    color: white;
    font-size: 12px;
    font-family: $style1;
    font-weight: 100;
  }

  #version-info {
    position: relative;
    padding-top: 15px;
    right: 0px;
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  .brand-title {
    padding-left: 120px;
    letter-spacing: 10px;
    margin: 10px;
  }

  .nav-icons {
    font-size: 1em !important;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 50px;
  }
  .nav-links {
    font-size: 15px !important;
    text-align: right !important;
    position: absolute;
    right: 10px;
  }

  .router-link-default {
    text-decoration: none;
  }

  .router-link-nav {
    text-decoration: none;
    width: 100%;
  }

  #csg-name {
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: white;
    font-size: 13px;
    font-family: $style1;
    font-weight: 100;
  }

  #version-info {
    position: relative;
    padding-top: 15px;
    right: 5px;
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  .brand-title {
    padding-left: 120px;
    letter-spacing: 10px;
    margin: 15px;
  }

  .nav-icons {
    font-size: 1.5em !important;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-right: 50px;
  }
  .nav-links {
    font-size: 20px !important;
    padding-top: 15px;
    padding-bottom: 15px;
    text-align: right !important;
    position: absolute;
    right: 10px;
  }

  .router-link-default {
    text-decoration: none;
  }

  .router-link-nav {
    text-decoration: none;
    width: 100%;
  }

  #csg-name {
    position: absolute;
    bottom: 0px;
    left: 10px;
    color: white;
    font-size: 16px;
    font-family: $style1;
    font-weight: 100;
  }

  #version-info {
    position: relative;
    padding-top: 15px;
    right: 5px;
  }
}
</style>

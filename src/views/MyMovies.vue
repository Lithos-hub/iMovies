<template>
  <div>
    <SectionTitle :sectionName="name" />

    <!-- SUPERIOR TABS MENU -->

    <v-tabs id="bar-tabs" centered background-color="transparent">
      <v-tabs-slider color="error"></v-tabs-slider>
      <v-tab
        active-class="cyan--text"
        class="cyan--text tab"
        v-on:click="category = 'summary'"
        >Summary</v-tab
      >
      <v-tab
        active-class="error--text"
        class="white--text tab"
        v-on:click="category = 'towatch'"
        @click="getToWatchMovies()"
        >To watch</v-tab
      >
      <v-tab
        active-class="error--text"
        class="white--text tab"
        v-on:click="category = 'favorite'"
        @click="getFavoriteMovies()"
        >Favorite</v-tab
      >
      <v-tab
        active-class="error--text"
        class="white--text tab"
        v-on:click="category = 'watched'"
        @click="getWatchedMovies()"
        >Watched</v-tab
      >
      <v-tab
        active-class="error--text"
        class="white--text tab"
        v-on:click="category = 'byrate'"
        @click="getRatedMovies()"
        >By rate</v-tab
      >
    </v-tabs>

    <!-- BUTTON FOR MENU EXPAND IN MOBILE DEVICES -->
    <div class="text-center" id="mobile-menu-btn">
      <v-btn icon @click="expand = !expand">
        <v-icon color="cyan">mdi-menu</v-icon>
      </v-btn>
    </div>

    <!-- MENU EXPAND FOR MOBILE DEVICES  -->
    <v-expand-x-transition>
      <v-container>
        <v-row id="categories-menu" v-show="expand" no-gutters>
          <div class="category-col ma-auto" v-on:click="category = 'summary'">
            <v-btn block class="category-btn"> Summary </v-btn>
          </div>
          <div
            class="category-col ma-auto"
            v-on:click="
              category = 'towatch';
              expand = !expand;
            "
            @click="getToWatchMovies()"
          >
            <v-btn block class="category-btn">To watch </v-btn>
          </div>
          <div
            class="category-col ma-auto"
            v-on:click="
              category = 'favorite';
              expand = !expand;
            "
            @click="getFavoriteMovies()"
          >
            <v-btn block class="category-btn"> Favorite </v-btn>
          </div>
          <div
            class="category-col ma-auto"
            v-on:click="
              category = 'watched';
              expand = !expand;
            "
            @click="getWatchedMovies()"
          ></div>
          <div
            class="category-col ma-auto"
            v-on:click="
              category = 'byrate';
              expand = !expand;
            "
            @click="getRatedMovies()"
          >
            <v-btn block class="category-btn"> By Rate </v-btn>
          </div>
        </v-row>
      </v-container>
    </v-expand-x-transition>

    <!-- SUMMARY AND DATA -->

    <v-row class="mt-5" v-if="category === 'summary'">
      <v-container>
        <v-row no-gutters class="data-list">
          <v-col class="ma-auto">
            <div>Movies I want to watch:</div>
          </v-col>
          <v-col>
            <div class="data-list-number" :style="{ color: color1 }">
              {{ toWatchMovies.length }}
            </div>
          </v-col>
        </v-row>
        <v-row no-gutters class="data-list">
          <v-col class="ma-auto">
            <div>Favourite movies:</div>
          </v-col>
          <v-col>
            <div class="data-list-number" :style="{ color: color2 }">
              {{ favoriteMovies.length }}
            </div>
          </v-col>
        </v-row>
        <v-row no-gutters class="data-list">
          <v-col class="ma-auto">
            <div>Watched movies:</div>
          </v-col>
          <v-col>
            <div class="data-list-number" :style="{ color: color3 }">
              {{ watchedMovies.length }}
            </div>
          </v-col>
        </v-row>
        <v-row no-gutters class="data-list">
          <v-col class="ma-auto">
            <div>Rated movies:</div>
          </v-col>
          <v-col>
            <div class="data-list-number" :style="{ color: color4 }">
              {{ ratedMovies.length }}
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-row>

    <MyMoviesCategory
      v-if="category === 'watched'"
      :arrayMovies="watchedMovies"
      :category="watched"
    />
    <MyMoviesCategory
      v-if="category === 'towatch'"
      :arrayMovies="toWatchMovies"
      :category="towatch"
    />
    <MyMoviesCategory
      v-if="category === 'favorite'"
      :arrayMovies="favoriteMovies"
      :category="favorite"
    />
    <ByRateMovies
      v-if="category === 'byrate'"
      :category="byrate"
      :ratedMovies="ratedMovies"
    />
  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import MyMoviesCategory from "../components/MyMoviesCategory";
import ByRateMovies from "../components/ByRateMovies";

import _ from "lodash";

export default {
  name: "MyMovies",
  components: {
    SectionTitle,
    MyMoviesCategory,
    ByRateMovies,
  },
  data() {
    return {
      name: "My movies",
      category: "summary",
      toWatchMovies: [],
      favoriteMovies: [],
      watchedMovies: [],
      ratedMovies: [],
      watched: "watched",
      towatch: "towatch",
      favorite: "favorite",
      byrate: "byrate",
      expand: false,
    };
  },
  computed: {
    color1() {
      if (this.toWatchMovies.length === 0) {
        return "#F44336";
      } else {
        return "#207ef2";
      }
    },
    color2() {
      if (this.favoriteMovies.length === 0) {
        return "#F44336";
      } else {
        return "#207ef2";
      }
    },
    color3() {
      if (this.watchedMovies.length === 0) {
        return "#F44336";
      } else {
        return "#207ef2";
      }
    },
    color4() {
      if (this.ratedMovies.length === 0) {
        return "#F44336";
      } else {
        return "#207ef2";
      }
    },
  },
  methods: {
    getToWatchMovies() {
      if (localStorage.getItem("storageToWatchMovies")) {
        this.toWatchMovies = JSON.parse(localStorage.getItem("storageToWatchMovies"));

        const removeDuplicated = _.uniqBy(this.toWatchMovies, "movie.id");

        this.toWatchMovies = removeDuplicated;
      }
    },
    getWatchedMovies() {
      if (localStorage.getItem("storageWatchedMovies")) {
        this.watchedMovies = JSON.parse(localStorage.getItem("storageWatchedMovies"));

        const removeDuplicated = _.uniqBy(this.watchedMovies, "movie.id");

        this.watchedMovies = removeDuplicated;
      }
    },
    getFavoriteMovies() {
      if (localStorage.getItem("storageFavoriteMovies")) {
        this.favoriteMovies = JSON.parse(localStorage.getItem("storageFavoriteMovies"));

        const removeDuplicated = _.uniqBy(this.favoriteMovies, "movie.id");

        this.favoriteMovies = removeDuplicated;
      }
    },
    getRatedMovies() {
      if (localStorage.getItem("storageRatedMovies")) {
        this.ratedMovies = JSON.parse(localStorage.getItem("storageRatedMovies"));

        const removeDuplicated = _.uniqBy(this.ratedMovies, "movie_data.id");

        this.ratedMovies = removeDuplicated;
      }
    },
  },
  created() {
    this.getWatchedMovies();
    this.getFavoriteMovies();
    this.getToWatchMovies();
    this.getRatedMovies();
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  #mobile-menu-btn {
    margin-top: 50px;
    display: block;
  }

  #bar-tabs {
    display: none;
  }

  #categories-menu {
    margin: 20px;
  }

  .category-col {
    text-align: center;
    font-size: 15px;
  }

  .category-btn {
    background: linear-gradient(to right, $dark2, $primary);
    color: white;
    margin-top: 20px;
  }

  .data-list {
    font-size: 20px;
    background: $dark;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom: 2px solid $secondary;
  }

  .data-list-number {
    font-size: 5em;
    text-align: right;
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  #mobile-menu-btn {
    display: none;
  }

  #bar-tabs {
    display: block;
  }
  .data-list {
    font-size: 20px;
    background: $dark;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom: 2px solid $secondary;
  }

  .data-list-number {
    font-size: 5em;
    text-align: right;
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  #mobile-menu-btn {
    display: none;
  }

  #bar-tabs {
    display: block;
  }
  .data-list {
    font-size: 20px;
    background: $dark;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom: 2px solid $secondary;
  }

  .data-list-number {
    font-size: 5em;
    text-align: right;
  }
}
</style>

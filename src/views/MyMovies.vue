<template>
  <div>
    <SectionTitle :sectionSubtitle="subtitle" />

    <!-- SUPERIOR TABS MENU -->

    <v-tabs id="bar-tabs" centered background-color="transparent">
      <v-tabs-slider color="error"></v-tabs-slider>
      <v-tab
        active-class="cyan--text"
        class="cyan--text tab"
        @click="category = 'summary'"
        >Summary</v-tab
      >
      <v-tab
        active-class="error--text"
        class="white--text tab"
        @click="category = 'favourite'"
        >Favorite</v-tab
      >
      <v-tab
        active-class="error--text"
        class="white--text tab"
        @click="category = 'towatch'"
        >To watch</v-tab
      >
      <v-tab
        active-class="error--text"
        class="white--text tab"
        @click="category = 'watched'"
        >Watched</v-tab
      >
      <v-tab
        active-class="error--text"
        class="white--text tab"
        @click="category = 'byrate'"
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
        <v-row id="categories-menu" v-if="expand" no-gutters>
          <div class="category-col ma-auto" @click="category = 'summary'">
            <v-btn block class="category-btn"> Summary </v-btn>
          </div>
          <div
            class="category-col ma-auto"
            @click="
              category = 'towatch';
              expand = !expand;
            "
          >
            <v-btn block class="category-btn">To watch </v-btn>
          </div>
          <div
            class="category-col ma-auto"
            @click="
              category = 'favourite';
              expand = !expand;
            "
          >
            <v-btn block class="category-btn"> Favorite </v-btn>
          </div>
          <div
            class="category-col ma-auto"
            @click="
              category = 'watched';
              expand = !expand;
            "
          ></div>
          <div
            class="category-col ma-auto"
            @click="
              category = 'byrate';
              expand = !expand;
            "
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
              {{ wishListMovies.length }}
            </div>
          </v-col>
        </v-row>
        <v-row no-gutters class="data-list">
          <v-col class="ma-auto">
            <div>Favorite movies:</div>
          </v-col>
          <v-col>
            <div class="data-list-number" :style="{ color: color2 }">
              {{ favouriteMovies.length }}
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
      v-if="category === 'favourite'"
      :array-movies="favouriteMovies"
      :category="favourite"
    />
    <MyMoviesCategory
      v-if="category === 'watched'"
      :array-movies="watchedMovies"
      :category="watched"
    />
    <MyMoviesCategory
      v-if="category === 'towatch'"
      :array-movies="wishListMovies"
      :category="towatch"
    />
    <MyMoviesCategory
      v-if="category === 'byrate'"
      :category="byrate"
      :array-movies="ratedMovies"
    />
  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import MyMoviesCategory from "../components/MyMoviesCategory";

import { mapState } from 'vuex';

export default {
  name: "MyMovies",
  components: {
    SectionTitle,
    MyMoviesCategory,
  },
  data() {
    return {
      subtitle: "Saved movies",
      category: "summary",
      watched: "watched",
      wishListMovies: [],
      watchedMovies: [],
      favouriteMovies: [],
      ratedMovies: [],
      towatch: "towatch",
      favourite: "favourite",
      byrate: "byrate",
      expand: false,
    };
  },
  computed: {
    ...mapState(['userID']),
    color1() {
      if (!this.wishListMovies.length) {
        return "#F44336";
      } else {
        return "#207ef2";
      }
    },
    color2() {
      if (!this.favouriteMovies.length) {
        return "#F44336";
      } else {
        return "#207ef2";
      }
    },
    color3() {
      if (!this.watchedMovies.length) {
        return "#F44336";
      } else {
        return "#207ef2";
      }
    },
    color4() {
      if (!this.ratedMovies.length) {
        return "#F44336";
      } else {
        return "#207ef2";
      }
    },
  },
  mounted () {
    this.getStoragedMovies()
  },
  methods: {
    getUserID() {
      const userID = JSON.parse(localStorage.getItem("USERID")) || {};
      const id = userID.id;
      this.userID = id;
    },
    getStoragedMovies() {
      const storage = JSON.parse(localStorage.getItem("storageUserDATA")) || [];
      let movies = storage[this.userID].myMovies
      this.favouriteMovies = movies.favourite
      this.watchedMovies = movies.watched
      this.wishListMovies = movies.wishlist
      this.ratedMovies = movies.rated
    },
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
    padding-inline: 10px;
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
    padding-inline: 10px;
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
    padding-inline: 10px;
    border-bottom: 2px solid $secondary;
  }

  .data-list-number {
    font-size: 5em;
    text-align: right;
  }
}
</style>

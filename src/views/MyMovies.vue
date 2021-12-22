<template>
  <div>
    <SectionTitle :title="sectionTitle" />

    <!-- SUPERIOR TABS MENU -->

    <v-tabs
      id="bar-tabs"
      centered
      background-color="transparent"
      v-model="selectedTab"
    >
      <v-tabs-slider color="error"></v-tabs-slider>
      <v-tab
        :key="0"
        active-class="cyan--text"
        class="cyan--text tab"
        @click="
          category = 'summary';
          rememberClickedTab(0);
        "
        >{{ $t("view-myMovies.summary") }}</v-tab
      >
      <v-tab
        :key="1"
        active-class="error--text"
        class="white--text tab"
        @click="
          category = 'favourite';
          rememberClickedTab(1);
        "
        >{{ $t("view-myMovies.favourite") }}</v-tab
      >
      <v-tab
        :key="2"
        active-class="error--text"
        class="white--text tab"
        @click="
          category = 'wishlist';
          rememberClickedTab(2);
        "
        >{{ $t("view-myMovies.wishList") }}</v-tab
      >
      <v-tab
        :key="3"
        active-class="error--text"
        class="white--text tab"
        @click="
          category = 'watched';
          rememberClickedTab(3);
        "
        >{{ $t("view-myMovies.watched") }}</v-tab
      >
      <v-tab
        :key="4"
        active-class="error--text"
        class="white--text tab"
        @click="
          category = 'byrate';
          rememberClickedTab(4);
        "
        >{{ $t("view-myMovies.byRate") }}</v-tab
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
            <v-btn
              tile
              block
              class="my-3 cyan"
              @click="
                category = 'summary';
                expand = !expand;
              "
              >{{ $t("view-myMovies.summary") }}</v-btn
            >
          </div>
          <div
            class="category-col ma-auto"
            @click="
              category = 'favourite';
              expand = !expand;
            "
          >
            <v-btn tile block dark class="my-3 gradient-background-1">{{
              $t("view-myMovies.favourite")
            }}</v-btn>
          </div>
          <div
            class="category-col ma-auto"
            @click="
              category = 'wishlist';
              expand = !expand;
            "
          >
            <v-btn tile block dark class="my-3 gradient-background-1">
              {{ $t("view-myMovies.wishList") }}
            </v-btn>
          </div>
          <div
            class="category-col ma-auto"
            @click="
              category = 'watched';
              expand = !expand;
            "
          >
          <v-btn tile block dark class="my-3 gradient-background-1">
            {{ $t("view-myMovies.watched") }}
          </v-btn>
          </div>
          <div
            class="category-col ma-auto"
            @click="
              category = 'byrate';
              expand = !expand;
            "
          >
            <v-btn tile block dark class="my-3 gradient-background-1">{{
              $t("view-myMovies.byRate")
            }}</v-btn>
          </div>
        </v-row>
      </v-container>
    </v-expand-x-transition>

    <!-- SUMMARY AND DATA -->

    <v-row class="mt-5" v-if="category === 'summary'">
      <v-container>
        <v-row no-gutters class="data-list">
          <v-col class="ma-auto">
            <div :class="isUsingMobile ? 'text-h6 cyan--text' : 'text-h4 cyan--text'">{{ $t("view-myMovies.row1") }}</div>
          </v-col>
          <v-col>
            <div class="data-list-number" :style="{ color: color1 }">
              {{ wishListMovies.length }}
            </div>
          </v-col>
        </v-row>
        <v-row no-gutters class="data-list">
          <v-col class="ma-auto">
            <div :class="isUsingMobile ? 'text-h6 cyan--text' : 'text-h4 cyan--text'">{{ $t("view-myMovies.row2") }}</div>
          </v-col>
          <v-col>
            <div class="data-list-number" :style="{ color: color2 }">
              {{ favouriteMovies.length }}
            </div>
          </v-col>
        </v-row>
        <v-row no-gutters class="data-list">
          <v-col class="ma-auto">
            <div :class="isUsingMobile ? 'text-h6 cyan--text' : 'text-h4 cyan--text'">{{ $t("view-myMovies.row3") }}</div>
          </v-col>
          <v-col>
            <div class="data-list-number" :style="{ color: color3 }">
              {{ watchedMovies.length }}
            </div>
          </v-col>
        </v-row>
        <v-row no-gutters class="data-list">
          <v-col class="ma-auto">
            <div :class="isUsingMobile ? 'text-h6 cyan--text' : 'text-h4 cyan--text'">{{ $t("view-myMovies.row4") }}</div>
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
      v-if="category === 'wishlist'"
      :array-movies="wishListMovies"
      :category="wishlist"
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

import { mapState } from "vuex";

export default {
  name: "MyMovies",
  components: {
    SectionTitle,
    MyMoviesCategory,
  },
  data() {
    return {
      sectionTitle: this.$t("comp-sectionTitle.mymovies"),
      selectedTab: 0,
      category: "summary",
      watched: "watched",
      wishListMovies: [],
      watchedMovies: [],
      favouriteMovies: [],
      ratedMovies: [],
      wishlist: "wishlist",
      favourite: "favourite",
      byrate: "byrate",
      expand: false,
    };
  },
  computed: {
    ...mapState(["userID", "clickedTab"]),
    isUsingMobile() {
      return this.$vuetify.breakpoint.xs;
    },
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
  mounted() {
    this.getStoragedMovies();
    this.selectedTab = this.clickedTab;
    this.setCategory(this.clickedTab);
  },
  methods: {
    rememberClickedTab(key) {
      this.$store.commit("setClickedTab", key);
    },
    setCategory(key) {
      this.category = {
        0: "summary",
        1: "favourite",
        2: "wishlist",
        3: "watched",
        4: "byrate",
      }[key];
    },
    getStoragedMovies() {
      let movies = storage[this.userID].myMovies;
      this.favouriteMovies = movies.favourite;
      this.watchedMovies = movies.watched;
      this.wishListMovies = movies.wishlist;
      this.ratedMovies = movies.rated;
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

  .data-list {
    font-size: 15px;
    background: $dark;
    padding-inline: 10px;
    border-bottom: 2px solid $secondary;
  }

  .data-list-number {
    font-size: 3em;
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
    font-size: 16px;
    background: $dark;
    padding-inline: 10px;
    border-bottom: 2px solid $secondary;
  }

  .data-list-number {
    font-size: 3em;
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

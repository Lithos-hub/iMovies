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
          category = 'favouriteMovies';
          rememberClickedTab(1);
        "
        >{{ $t("view-myMovies.favourite") }}</v-tab
      >
      <v-tab
        :key="2"
        active-class="error--text"
        class="white--text tab"
        @click="
          category = 'wishListMovies';
          rememberClickedTab(2);
        "
        >{{ $t("view-myMovies.wishList") }}</v-tab
      >
      <v-tab
        :key="3"
        active-class="error--text"
        class="white--text tab"
        @click="
          category = 'watchedMovies';
          rememberClickedTab(3);
        "
        >{{ $t("view-myMovies.watched") }}</v-tab
      >
      <v-tab
        :key="4"
        active-class="error--text"
        class="white--text tab"
        @click="
          category = 'ratedMovies';
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
              category = 'favouriteMovies';
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
              category = 'wishListMovies';
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
              category = 'watchedMovies';
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
              category = 'ratedMovies';
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
        <v-row no-gutters :class="favouriteMovies.length ? 'data-list data-list-filled' : 'data-list data-list-empty'">
          <v-col class="ma-auto">
            <div
              :class="
                isUsingMobile ? 'text-h6 cyan--text' : 'text-h4 cyan--text'
              "
            >
              {{ $t("view-myMovies.row2") }}
            </div>
          </v-col>
          <v-col>
            <div
              v-if="!isLoadingAllStoragedMovies"
              class="data-list-number"
              :style="{ color: color2 }"
            >
              {{ favouriteMovies.length }}
            </div>
            <div v-else>
              <v-progress-circular
                class="data-list-spinner"
                indeterminate
                color="cyan"
                size="30"
                width="2"
              ></v-progress-circular>
            </div>
          </v-col>
        </v-row>
        <v-row no-gutters :class="wishListMovies.length ? 'data-list data-list-filled' : 'data-list data-list-empty'">
          <v-col class="ma-auto">
            <div
              :class="
                isUsingMobile ? 'text-h6 cyan--text' : 'text-h4 cyan--text'
              "
            >
              {{ $t("view-myMovies.row1") }}
            </div>
          </v-col>
          <v-col>
            <div
              v-if="!isLoadingAllStoragedMovies"
              class="data-list-number"
              :style="{ color: color1 }"
            >
              {{ wishListMovies.length }}
            </div>
            <div v-else>
              <v-progress-circular
                class="data-list-spinner"
                indeterminate
                color="cyan"
                size="30"
                width="2"
              ></v-progress-circular>
            </div>
          </v-col>
        </v-row>
        <v-row no-gutters :class="watchedMovies.length ? 'data-list data-list-filled' : 'data-list data-list-empty'">
          <v-col class="ma-auto">
            <div
              :class="
                isUsingMobile ? 'text-h6 cyan--text' : 'text-h4 cyan--text'
              "
            >
              {{ $t("view-myMovies.row3") }}
            </div>
          </v-col>
          <v-col>
            <div
              v-if="!isLoadingAllStoragedMovies"
              class="data-list-number"
              :style="{ color: color3 }"
            >
              {{ watchedMovies.length }}
            </div>
            <div v-else>
              <v-progress-circular
                class="data-list-spinner"
                indeterminate
                color="cyan"
                size="30"
                width="2"
              ></v-progress-circular>
            </div>
          </v-col>
        </v-row>
        <v-row no-gutters :class="ratedMovies.length ? 'data-list data-list-filled' : 'data-list data-list-empty'">
          <v-col class="ma-auto">
            <div
              :class="
                isUsingMobile ? 'text-h6 cyan--text' : 'text-h4 cyan--text'
              "
            >
              {{ $t("view-myMovies.row4") }}
            </div>
          </v-col>
          <v-col>
            <div
              v-if="!isLoadingAllStoragedMovies"
              class="data-list-number"
              :style="{ color: color4 }"
            >
              {{ ratedMovies.length }}
            </div>
            <div v-else>
              <v-progress-circular
                class="data-list-spinner"
                indeterminate
                color="cyan"
                size="30"
                width="2"
              ></v-progress-circular>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-row>

    <MyMoviesCategory
      v-if="category === 'favouriteMovies'"
      :array-movies="favouriteMovies"
      :category="favourite"
    />
    <MyMoviesCategory
      v-if="category === 'watchedMovies'"
      :array-movies="watchedMovies"
      :category="watched"
    />
    <MyMoviesCategory
      v-if="category === 'wishListMovies'"
      :array-movies="wishListMovies"
      :category="wishlist"
    />
    <MyMoviesCategory
      v-if="category === 'ratedMovies'"
      :array-movies="ratedMovies"
      :category="byrate"
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
      watched: "watchedMovies",
      wishlist: "wishListMovies",
      favourite: "favouriteMovies",
      byrate: "ratedMovies",
      expand: false,
    };
  },
  computed: {
    ...mapState([
      "clickedTab",
      "favouriteMovies",
      "watchedMovies",
      "wishListMovies",
      "ratedMovies",
      "isLoadingAllStoragedMovies",
    ]),
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
        1: "favouriteMovies",
        2: "wishListMovies",
        3: "watchedMovies",
        4: "ratedMovies",
      }[key];
    },
    getStoragedMovies() {
      this.$store.dispatch("getAllStoragedMovies");
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
    position: relative;
    font-size: 15px;
    background: $dark;
    padding-inline: 10px;
    min-height: 72px;
  }

  .data-list-empty {
    border-bottom: 2px solid $secondary;
  }

  .data-list-filled {
    border-bottom: 2px solid $primary;
  }

  .data-list-number {
    font-size: 3em;
    text-align: right;
  }

  .data-list-spinner {
    position: absolute;
    right: 1em;
    top: 1em;
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
  }

  .data-list-number {
    font-size: 5em;
    text-align: right;
  }
}
</style>

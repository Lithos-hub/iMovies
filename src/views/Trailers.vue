<template>
  <div>
    <SectionTitle :title="sectionTitle" />

    <!-- TRAILER DIALOG -->
    <TrailerDialog
      v-if="trailerDialog"
      :video="trailerVideo"
      @close-dialog="trailerDialog = false"
    />

    <!-- END OF DIALOGS -->

    <div id="trailers-container">
      <v-row class="py-auto">
        <v-col cols="2" v-for="(item, i) in latestReleases" :key="i">
          <div @mouseover="showInfoBtn(i)" @mouseleave="hideInfoBtn(i)">
            <div class="white">
              <v-img
                id="movie-img"
                min-height="100%"
                max-height="100%"
                width="auto"
                :lazy-src="loadingIMG"
                :src="
                  item.poster_path != null
                    ? imageURL + item.poster_path
                    : no_image
                "
                @click="getTrailer(item)"
              />
            </div>
            <v-btn
              class="d-none info-btn mt-5"
              block
              color="primary"
              large
              outlined
              tile
              @click="showInfo(item)"
              dark
            >
              <v-icon color="white">mdi-information</v-icon>
            </v-btn>
          <h5 class="movie-title mt-5 pa-auto red--text">
            {{ item.title }}
          </h5>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import TrailerDialog from "../components/TrailerDialog";

import { mapActions, mapState } from "vuex";

export default {
  name: "Trailers",
  components: {
    SectionTitle,
    TrailerDialog,
  },
  data() {
    return {
      sectionTitle: this.$t("comp-sectionTitle.trailers"),
      trailerDialog: false,
      moviesIDs: [],
      moviesVideos: [],
      videoError: "",
    };
  },
  created() {
    this.getLatestReleases();
  },
  mounted() {
    window.scrollTo(0, 0);
    this.hideButtons();
  },
  computed: {
    ...mapState([
      "latestReleases",
      "trailerVideo",
      "no_image",
      "imageURL",
      "loadingIMG",
    ]),
  },
  methods: {
    ...mapActions(["getLatestReleases", "getMovieTrailer", "showInfo"]),
    getTrailer(item) {
      this.trailerDialog = true;
      this.getMovieTrailer({ type: "other", id: item.id });
    },
    hideButtons() {
      let btn = document.querySelectorAll(".info-btn");
      btn.forEach((btn) => {
        btn.classList.add("hidden-btn");
      });
    },
    showInfoBtn(i) {
      let btn = document.querySelectorAll(".info-btn");
      let title = document.querySelectorAll(".movie-title")
      btn[i].classList.remove("d-none");
      btn[i].style.opacity = 0;
      title[i].style.opacity = 0;
      setTimeout(() => {
        btn[i].style.transition = "all 0.3s ease-out";
        btn[i].style.opacity = 1;
      }, 50);
    },
    hideInfoBtn(i) {
      let btn = document.querySelectorAll(".info-btn");
      let title = document.querySelectorAll(".movie-title")
      btn[i].style.transition = "all 0.3s ease-out";
      btn[i].style.opacity = 0;
      setTimeout(() => {
        title[i].style.opacity = 1;
        btn[i].classList.add("d-none");
      }, 150);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

#movie-img {
  box-shadow: 0px 5px 10px black;
  transition: all 0.3 ease-out;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
}

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  #trailers-container {
    position: relative;
    margin: 0px;
    width: 100%;
    margin-bottom: 50px;
    height: 100%;
    text-align: center;
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  #trailers-container {
    position: relative;
    margin: 0 auto;
    width: 90%;
    margin-bottom: 50px;
    height: 100%;
    text-align: center;
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  #trailers-container {
    position: relative;
    margin: 0 auto;
    width: 90%;
    margin-bottom: 50px;
    height: 100%;
    text-align: center;
  }
}
</style>

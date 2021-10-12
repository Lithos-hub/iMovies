<template>
  <div>
    <SectionTitle :sectionSubtitle="subtitle" />

    <!-- TRAILER DIALOG -->
    <TrailerDialog
      v-if="trailerDialog"
      :video="trailerVideo"
      @close-dialog="trailerDialog = false"
    />

    <!-- END OF DIALOGS -->

    <div id="trailers-container">
      <v-row>
        <v-col cols="3" v-for="(item, i) in latestReleases" :key="i">
          <div class="white">
            <img
              id="movie-img"
              height="auto"
              max-height="500px"
              width="100%"
              :src="item.poster_path != null ? imageURL + item.poster_path : no_image"
              @click="getTrailer(item)"
            />
          </div>

            <h5 class="mt-2 red--text">
              {{ item.original_title }}
            </h5>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import TrailerDialog from "../components/TrailerDialog";

import { mapActions, mapState } from 'vuex';

export default {
  name: "Trailers",
  components: {
    SectionTitle,
    TrailerDialog,
  },
  data() {
    return {
      subtitle: "Latest released trailers",
      trailerDialog: false,
      moviesIDs: [],
      moviesVideos: [],
      videoError: "",
    };
  },
  mounted () {
    this.getLatestReleases()
  },
  computed: {
    ...mapState(['latestReleases', 'trailerVideo', 'no_image', 'imageURL'])
  },
  methods: {
    ...mapActions(['getLatestReleases', 'getMovieTrailer']),
    getTrailer(item) {
      this.trailerDialog = true
      this.getMovieTrailer({ type: 'other', id: item.id })
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

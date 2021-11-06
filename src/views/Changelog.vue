<template>
  <v-container fluid>
    <SectionTitle :title="sectionTitle" />

    <div class="list-group">
      <div class="list" v-for="(item, i) in changes" :key="i">
        <span class="font-weight-bold">{{ item.version }}</span>
        <ul style="list-style: none">
          <li v-for="(change, i) in item.changes" :key="i">
            <v-icon color="green">mdi-check</v-icon> {{ change }}
          </li>
        </ul>
      </div>
    </div>
  </v-container>
</template>

<script>
import SectionTitle from "../components/SectionTitle";

export default {
  components: {
    SectionTitle,
  },
  data() {
    return {
      sectionTitle: this.$t('comp-sectionTitle.changelog'),
      changes: [
        {
          version: "v1.1.0",
          changes: [
            this.$t('view-changelog.1_1_0')
          ],
        },
        {
          version: "v1.2.0",
          changes: [
            this.$t('view-changelog.1_2_0-1'),
            this.$t('view-changelog.1_2_0-2')
          ],
        },
        {
          version: "v1.3.0",
          changes: [
            this.$t('view-changelog.1_3_0-1'),
            this.$t('view-changelog.1_3_0-2')
          ],
        },
        {
          version: "v1.4.0",
          changes: [
            this.$t('view-changelog.1_4_0-1'),
            this.$t('view-changelog.1_4_0-2'),
            this.$t('view-changelog.1_4_0-3')
          ],
        },
        {
          version: "v1.5.0",
          changes: [
            this.$t('view-changelog.1_5_0-1'),
            this.$t('view-changelog.1_5_0-2')
          ],
        },
        {
          version: "v1.6.0",
          changes: [
            this.$t('view-changelog.1_6_0-1'),
            this.$t('view-changelog.1_6_0-2'),
            this.$t('view-changelog.1_6_0-3'),
            this.$t('view-changelog.1_6_0-4')
          ],
        },
        {
          version: "v1.6.1",
          changes: [
            this.$t('view-changelog.1_6_1-1'),
            this.$t('view-changelog.1_6_1-2'),
            this.$t('view-changelog.1_6_1-3')
          ],
        },
        {
          version: "v1.7.0",
          changes: [
            this.$t('view-changelog.1_7_0-1'),
            this.$t('view-changelog.1_7_0-2')
          ],
        },
        {
          version: "v1.7.2",
          changes: [
            this.$t('view-changelog.1_7_2-1'),
            this.$t('view-changelog.1_7_2-2')
          ],
        },
        {
          version: "v1.7.5",
          changes: [
            this.$t('view-changelog.1_7_5-1'),
            this.$t('view-changelog.1_7_5-2')
          ],
        },
        {
          version: "v1.7.6",
          changes: [
            this.$t('view-changelog.1_7_6')
          ],
        },
        {
          version: "v1.7.7",
          changes: [
            this.$t('view-changelog.1_7_7')
          ],
        },
        {
          version: "v1.7.9",
          changes: [
            this.$t('view-changelog.1_7_9-1'),
            this.$t('view-changelog.1_7_9-2')
          ],
        },
        {
          version: "v1.8.0",
          changes: [
            this.$t('view-changelog.1_8_0-1'),
            this.$t('view-changelog.1_8_0-2'),
            this.$t('view-changelog.1_8_0-3')
          ],
        },
        {
          version: "v1.9.0",
          changes: [
            this.$t('view-changelog.1_9_0')
          ],
        },
        {
          version: "v1.9.1",
          changes: [
            this.$t('view-changelog.1_9_1')
          ],
        },
        {
          version: "v1.9.2",
          changes: [
            this.$t('view-changelog.1_9_2')
          ],
        },
        {
          version: "v1.9.5",
          changes: [
            this.$t('view-changelog.1_9_5-1'),
            this.$t('view-changelog.1_9_5-2'),
            this.$t('view-changelog.1_9_5-3')
          ],
        },
        {
          version: "v2.0.0",
          changes: [
            this.$t('view-changelog.2_0_0-1'),
            this.$t('view-changelog.2_0_0-2'),
            this.$t('view-changelog.2_0_0-3'),
            this.$t('view-changelog.2_0_0-4'),
            this.$t('view-changelog.2_0_0-5'),
            this.$t('view-changelog.2_0_0-6'),
            this.$t('view-changelog.2_0_0-7'),
            this.$t('view-changelog.2_0_0-8'),
            this.$t('view-changelog.2_0_0-9'),
            this.$t('view-changelog.2_0_0-10')
          ],
        },
      ],
    };
  },
  mounted() {
    this.showReverse();
  },
  methods: {
    showReverse() {
      this.changes.reverse();
    },
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
    padding: 10px;
    text-align: justify;
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

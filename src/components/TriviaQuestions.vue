<template>
  <div v-if="!loadingTrivia">
    <v-card
      class="mx-auto pa-5"
      width="auto"
      color="transparent"
      height="auto"
      tile
    >
      <v-list dense class="transparent">
        <v-subheader
          ><p class="text-h5 text-center primary--text">
            {{ cleanQuestion(question.ask) }}
          </p></v-subheader
        >
        <v-divider class="cyan"></v-divider>
        <v-list-item-group v-model="selectedResponse" color="cyan">
          <v-list-item v-for="(item, i) in question.answers" :key="i">
            <v-list-item-content class="white--text pa-2 rounded">
              <v-list-item-title
                class="text-h5 py-2"
                v-text="item"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["question", "loadingTrivia"],
  data() {
    return {
      selectedResponse: null,
    };
  },
  methods: {
    cleanQuestion (question) {
      let processed = ""
      if (question) {
      processed = question
      .replaceAll('&ldquo;', '"')
      .replaceAll('&rdquo;', '"')
      .replaceAll('&amp;', '&')
      .replaceAll('&#039;', "'")
      .replaceAll('&quot;', '"')
      }
      return processed
    }
  }
};
</script>

<style></style>

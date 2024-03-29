<template>
  <div v-if="!loadingTrivia">
    <v-card
      v-if="!checkingAnswer && !checkedAnswer && !answered"
      class="mx-auto"
      width="100%"
      color="transparent"
      height="100%"
      tile
    >
      <v-img
        id="trivia-image"
        v-if="question.image"
        :src="require(`../../public/trivia/triviaImages/${question.image}`)"
        :max-width="imageWidth"
        :max-height="imageHeight"
      />
      <v-list dense class="transparent">
        <p
          :class="
            isUsingMobile
              ? 'text-h6 text-center primary--text mb-5'
              : 'text-h6 primary--text'
          "
        >
          {{ cleanQuestion(question.ask) }}
        </p>
        <v-divider class="cyan my-5"></v-divider>
        <v-list-item-group v-model="responseIndex" color="cyan">
          <v-list-item v-for="(item, i) in question.answers" :key="i">
            <v-list-item-content class="white--text pa-2 rounded">
              <v-list-item-title
                class="text-center py-2"
                v-text="item"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-btn
        class="gradient-success white--text"
        block
        tile
        small
        :disabled="selectedResponse === null"
        @click="confirm"
        >Confirmar respuesta</v-btn
      >
    </v-card>
    <div v-if="checkingAnswer" class="centered text-center">
      <v-progress-circular indeterminate size="100" width="5" color="cyan" />
      <h5 class="text-h5 text-center cyan--text mt-5">
        {{ $t("view-trivia.checkingAnswer") }}
      </h5>
    </div>
    <div
      class="text-center green--text"
      v-if="checkedAnswer && warningObject.isCorrect"
    >
      <h4>
        {{ $t("view-trivia.congratulations1") }} {{ puntos }}
        {{ $t("view-trivia.congratulations2") }}
      </h4>
      <h4>{{ $t("view-trivia.congratulations3") }}</h4>
      <v-btn
        class="gradient-success white--text mt-5"
        tile
        block
        @click="comeback"
        >{{ $t("view-trivia.comeback") }}</v-btn
      >
    </div>
    <div
      class="text-center error--text"
      v-if="checkedAnswer && !warningObject.isCorrect"
    >
      <h4>{{ $t("view-trivia.failure1") }}</h4>
      <h4>{{ $t("view-trivia.failure2") }}</h4>
      <v-btn
        class="gradient-error white--text mt-5"
        tile
        block
        @click="comeback"
      >
        {{ $t("view-trivia.comeback") }}
      </v-btn>
    </div>
    <div v-if="warningObject.warning">
      <TriviaWarning
        :warning-color="warningObject.warningColor"
        :warning-text="warningObject.warningText"
        :correct-answer="warningObject.isCorrect"
      />
    </div>
  </div>
</template>

<script>
import TriviaWarning from "../components/TriviaWarning";
import { mapState, mapActions } from "vuex";
import Services from "../services/services";

export default {
  components: {
    TriviaWarning,
  },
  props: ["question", "loadingTrivia"],
  data() {
    return {
      responseIndex: null,
      selectedResponse: "",
      answered: false,
      checkingAnswer: false,
      checkedAnswer: false,
      puntos: "",
    };
  },
  computed: {
    ...mapState(["warningObject"]),
    imageWidth() {
      let clientWidth = window.screen.width;
      switch (true) {
        case clientWidth > 1824:
          return "500px";
        case clientWidth < 1824:
          return "360px";
      }
    },
    imageHeight() {
      let clientWidth = window.screen.width;
      switch (true) {
        case clientWidth > 1824:
          return "450px";
        case clientWidth < 1824:
          return "140px";
      }
    },
    isUsingMobile() {
      return window.innerWidth < 600;
    },
  },
  methods: {
    ...mapActions(["showWarning"]),
    comeback() {
      this.$router.push({ path: "/home" });
    },
    cleanQuestion(question) {
      let processed = "";
      if (question) {
        processed = question
          .replaceAll("&ldquo;", '"')
          .replaceAll("&rdquo;", '"')
          .replaceAll("&amp;", "&")
          .replaceAll("&#039;", "'")
          .replaceAll("&quot;", '"');
      }
      return processed;
    },
    getItem() {
      this.selectedResponse = this.question.answers[this.responseIndex];
    },
    confirm() {
      this.$emit("hide-counter");
      this.answered = true;
      this.checkingAnswer = true;
      this.getItem();
      setTimeout(() => {
        if (this.selectedResponse === this.question.correct_answer) {
          this.question.passed = true;
          Services.saveQuestion(this.question).then(() => {
            Services.getResolvedQuestions();
            this.showWarning({
              text: "¡Correcto!",
              color: "success",
              isCorrect: true,
            });
          });
        } else {
          this.question.passed = false;
          Services.saveQuestion(this.question).then(() => {
            Services.getResolvedQuestions();
            this.showWarning({
              text: "¡Has fallado!",
              color: "error",
              isCorrect: false,
            });
          });
        }
        this.checkingAnswer = false;
        setTimeout(() => {
          this.checkedAnswer = true;
        }, 3000);
      }, 1000);
    },
  },
};
</script>

<style>
#trivia-image {
  justify-self: center;
  margin: 0 auto;
}
</style>

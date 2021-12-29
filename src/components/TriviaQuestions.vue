<template>
  <div v-if="!loadingTrivia">
    <v-card
      v-if="!checkingAnswer && !checkedAnswer && !answered"
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
        <v-list-item-group v-model="responseIndex" color="cyan">
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
      <v-btn
        class="gradient-success white--text"
        block
        tile
        :disabled="selectedResponse === null"
        @click="confirm"
        >Confirmar respuesta</v-btn
      >
    </v-card>
    <div v-if="checkingAnswer" class="centered text-center">
      <v-progress-circular
        indeterminate
        size="100"
        width="5"
        color="cyan"
        />
        <h5 class="text-h5 text-center cyan--text mt-5">Comprobando respuesta...</h5>
    </div>
    <div class="text-center green--text" v-if="checkedAnswer && warningObject.isCorrect">
      <h4>¡Enhorabuena! Has acertado la pregunta de hoy. Has ganado {{ puntos }} puntos.</h4>
      <h4>¡Vuelve mañana para el próximo reto!</h4>
      <v-btn class="gradient-success white--text mt-5" tile block @click="comeback">Regresar</v-btn>
    </div>
    <div class="text-center error--text" v-if="checkedAnswer && !warningObject.isCorrect">
      <h4>Vaya, ¡has fallado! No te desanimes y vuelve mañana.</h4>
      <h4>¡Seguro que lo consigues!</h4>
      <v-btn class="gradient-error white--text mt-5" tile block @click="comeback">Regresar</v-btn>
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
      puntos: ''
    };
  },
  computed: {
    ...mapState(["warningObject"]),
  },
  methods: {
    ...mapActions(["showWarning"]),
    comeback () {
      this.$router.push({ path: '/home' })
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
      this.answered = true;
      this.checkingAnswer = true
      this.getItem();
      setTimeout(() => {
        if (this.selectedResponse === this.question.correct_answer) {
          Services
          .saveQuestion(this.question)
          .then(() => {
            this.showWarning({
              text: "¡Correcto!",
              color: "success",
              isCorrect: true,
            });
          })
        } else {
          Services
          .saveQuestion(this.question)
          .then(() => {
            this.showWarning({
              text: "¡Has fallado!",
              color: "error",
              isCorrect: false,
            });
          })
        }
        this.checkingAnswer = false
        setTimeout(() => {
          this.checkedAnswer = true
        }, 3000)
      }, 1000);
    },
  },
};
</script>

<style></style>

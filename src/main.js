import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";

import i18n from "@/plugins/i18n";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  axios,
  i18n,
  VueAxios,
  render: (h) => h(App),
}).$mount("#app");

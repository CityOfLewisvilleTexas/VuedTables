import Vue from "vue";
import "./plugins/axios";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import moment from 'moment';

Vue.config.productionTip = false;

Vue.use({
  moment
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

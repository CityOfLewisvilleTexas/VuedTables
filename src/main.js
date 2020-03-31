import Vue from "vue";
import "./plugins/axios";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import moment from 'moment';
// import MultiFiltersPlugin from './plugins/MultiFilters'


Vue.config.productionTip = false;

Vue.use({
  moment
});
// Vue.use(MultiFiltersPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

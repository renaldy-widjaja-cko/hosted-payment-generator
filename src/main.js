import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import { BootstrapVue, IconsPlugin, FormGroupPlugin } from "bootstrap-vue";
import Clipboard from "v-clipboard"
import {library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faClipboard, faCaretRight } from '@fortawesome/free-solid-svg-icons'



import "./assets/css/style.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "font-awesome/css/font-awesome.min.css";


library.add(faCaretRight)
library.add(faClipboard)

Vue.config.productionTip = false;
axios.defaults.baseURL = "https://api.sandbox.checkout.com"
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(FormGroupPlugin);
Vue.use(Clipboard);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

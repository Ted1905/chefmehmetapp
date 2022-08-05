// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuelidate from 'vuelidate'
import Swal from 'vue-sweetalert2';
import VueMask from 'v-mask'
import moment from 'moment';
import vco from "v-click-outside"
import VueClipboard from 'vue-clipboard2'
import store from './store';
import axios from 'axios';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
import './assets/scss/style.css';


axios.defaults.withCredentials = false
axios.defaults.baseURL = 'http://localhost:9000/';

Vue.config.productionTip = false
Vue.use(vco)
Vue.use(Vuelidate)
Vue.use(Swal);
Vue.use(VueMask)
Vue.use(VueClipboard)

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD-MM-YYYY')
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

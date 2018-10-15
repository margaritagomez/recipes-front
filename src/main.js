// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App';

Vue.use(VueSweetalert2);
require('../src/assets/icon.png');

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});

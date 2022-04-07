import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import cookies from 'vue-cookies';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
Vue.use(cookies);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  router,
  store,
  cookies,
  render: h => h(App),
}).$mount('#app');

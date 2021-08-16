import Vue from 'vue';
import Main from '@/Main';
import store from '@/store';
import router from '@/router';
import axios from 'axios';
import vuetify from './plugins/vuetify';

window.axios = axios;
Vue.config.productionTip = false;

window.onload = ()=>{
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(Main)
  }).$mount('#app');
}
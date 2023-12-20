import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import './axios'
import store from './vuex'

import LottieAnimation from 'lottie-web-vue'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)
Vue.use(LottieAnimation); // add lottie-animation to your global scope
Vue.use(store); 

new Vue({
  vuetify,
  router,
  store,
  ApexCharts,
  render: h => h(App)
}).$mount('#app')

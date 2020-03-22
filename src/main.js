import Vue from 'vue'
import App from './App.vue'
import VueBus from 'vue-bus'
Vue.use(VueBus);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app');
import Vue from 'vue'
import App from './App.vue'
import Test from './Test.vue'
import VueBus from 'vue-bus'
Vue.use(VueBus);

const routes = {
    'home': App,
    'test': Test,
};


Vue.config.productionTip = false;

new Vue({
    data: {
        currentRoute: window.location.pathname
    },
    computed: {
        ViewComponent() {
            if (this.currentRoute.split('/')[1] === 'test') {
                return routes.test;
            }
            return routes.home;
        }
    },
    render(h) { return h(this.ViewComponent) }
}).$mount('#app');
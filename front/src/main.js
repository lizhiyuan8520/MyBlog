import Vue from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css';
import VueRouter from 'vue-router';
import router from './router/router.js';

import { Button } from 'element-ui';

Vue.config.productionTip = false
Vue.use(Button);
Vue.use(VueRouter);

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
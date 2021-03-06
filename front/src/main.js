import Vue from 'vue';
import App from './App.vue';
import 'normalize.css/normalize.css';
import VueRouter from 'vue-router';
import router from './router';
import store from './store';
import axios from 'axios';
import 'lib-flexible' //做移动端适配

axios.defaults.baseURL = 'http://127.0.0.1:8008'
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import { Button, Tooltip, Divider, Pagination, Input, Menu, Submenu, MenuItem, MenuItemGroup, Form } from 'element-ui';

axios.defaults.baseURL = 'http://127.0.0.1:8008'
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(ElementUI);

new Vue({
    render: h => h(App),
    router,
    store,
    beforeCreate() {
        Vue.prototype.$bus = this //注册全局事件总线
    },
    beforeDestroy() {
        localStorage.setItem('Token', '');
    }
}).$mount('#app')
import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
export default new Vuex.Store({
    actions: {

    },
    mutations: {
        setUserInfo(state, value) {
            console.log('设置用户信息~', value);
            for (let key in state.userInfo) {
                state.userInfo[key] = value[0][key];
            }
        },
    },
    state: {
        userInfo: {
            username: '',
            creater: '',
            createtime: '',
            permission: '',
            sourcenum: '',
            userimg: '',
        }
    }
})
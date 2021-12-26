import VueRouter from 'vue-router';
import ToDoList from '../view/ToDoList.vue'
import Main from '../view/Main.vue'
import NotFound from '../view/NotFound.vue'
import SourceShow from '../view/SourceShow.vue'
import Admin from '../view/Admin.vue'
import ShowUser from '../components/admin/ShowUser.vue'
import DelUser from '../components/admin/DelUser.vue'
import SetUser from '../components/admin/SetUser.vue'
import AddUser from '../components/admin/AddUser.vue'
//引入User组件,否则会发生两层路由越界，router-view无法显示的问题
const User = {
    template: `<router-view></router-view>`
}
const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/Main'
        },

        {
            path: '/ToDoList',
            component: ToDoList
        },
        {
            path: '/Main',
            component: Main
        },
        {
            path: '/SourceShow',
            component: SourceShow
        },
        {
            path: '/Admin',
            component: Admin,
            children: [{
                    name: 'ShowUser',
                    path: 'ShowUser',
                    component: ShowUser,
                },
                {
                    name: 'SetUser',
                    path: 'SetUser',
                    component: SetUser,
                },
                {
                    name: 'DelUser',
                    path: 'DelUser',
                    component: DelUser,
                },
                {
                    name: 'AddUser',
                    path: 'AddUser',
                    component: AddUser,
                }

            ]
        },


        {
            // 会匹配所有路径
            path: '*',
            component: NotFound
        }

    ]
})
export default router
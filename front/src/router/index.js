import VueRouter from 'vue-router';
import ToDoList from '../view/ToDoList.vue'
import Main from '../view/Main.vue'
import NotFound from '../view/NotFound.vue'
import SourceShow from '../view/SourceShow.vue'
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
            // 会匹配所有路径
            path: '*',
            component: NotFound
        }

    ]
})
export default router
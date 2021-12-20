import VueRouter from 'vue-router';
import ToDoList from '../view/ToDoList.vue'
import Main from '../view/Main.vue'
const router = new VueRouter({
    routes: [{
            path: '/ToDoList',
            component: ToDoList
        },
        {
            path: '/Main',
            component: Main
        }
    ]
})
export default router
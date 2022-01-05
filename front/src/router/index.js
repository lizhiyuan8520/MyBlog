import VueRouter from 'vue-router';
import ToDoList from '../view/ToDoList.vue'
import Main from '../view/Main.vue'
import NotFound from '../view/NotFound.vue'
import SourceShow from '../view/SourceShow.vue'
import Admin from '../view/Admin.vue'
import Login from '../view/login.vue'
import ShowUser from '../components/admin/ShowUser.vue'
import DelUser from '../components/admin/DelUser.vue'
import SetUser from '../components/admin/SetUser.vue'
import AddUser from '../components/admin/AddUser.vue'
import SourceUpload from '../components/admin/SourceUpload.vue'
import axios from 'axios';
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
            path: '/login',
            component: Login
        },

        {
            name: 'Admin',
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
                    beforeEnter(to, from, next) {
                        //判断当前路由是否需要进行权限控制
                        if (JSON.parse(sessionStorage.getItem('userInfo')).permission) {
                            next()
                        } else {
                            alert('暂无权限查看')
                                // next({name:'guanyu'})
                        }

                        // next(from.path);

                    },

                },
                {
                    name: 'AddUser',
                    path: 'AddUser',
                    component: AddUser,
                    beforeEnter(to, from, next) {
                        //判断当前路由是否需要进行权限控制
                        if (JSON.parse(sessionStorage.getItem('userInfo')).permission) {
                            next()
                        } else {
                            alert('暂无权限查看')
                                // next({name:'guanyu'})
                        }

                        // next(from.path);

                    }
                },
                {
                    name: 'SourceUpload',
                    path: 'SourceUpload',
                    component: SourceUpload
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
router.beforeEach((to, from, next) => {
    if (to.path == "/Admin" && from.path != '/login') {
        // console.log('token', typeof localStorage.getItem('Token'), localStorage.getItem('Token'));
        if (sessionStorage.getItem('Token')) {
            console.log('开始验证token');
            axios({
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
                },
                method: 'get',
                url: '/user/tokenVerify',
            }).then(val => {
                if (val.data.code == 200)
                    next("/Admin");
                else {
                    next("/login")
                }

            })
        } else {
            next({ path: '/login' });
        }
    }
    next();

})
export default router
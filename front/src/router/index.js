import VueRouter from 'vue-router';
import axios from 'axios';
//引入User组件,否则会发生两层路由越界，router-view无法显示的问题
const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/Main'
        },

        {
            path: '/ToDoList',
            component: () =>
                import ('@/view/ToDoList/ToDoList.vue')
        },
        {
            path: '/Main',
            component: () =>
                import ('@/view/Main/Main.vue')
        },
        {
            path: '/SourceShow',
            component: () =>
                import ('@/view/SourceShow/SourceShow.vue')
        },
        {
            path: '/login',
            component: () =>
                import ('@/view/Login/login.vue')
        },

        {
            name: 'Admin',
            path: '/Admin',
            component: () =>
                import ('@/view/Admin/Admin.vue'),
            children: [{
                    name: 'ShowUser',
                    path: 'ShowUser',
                    component: () =>
                        import ('@/view/Admin/UserManage/ShowUser.vue'),
                },
                {
                    name: 'SetUser',
                    path: 'SetUser',
                    component: () =>
                        import ('@/view/Admin/UserManage/SetUser.vue'),
                },
                {
                    name: 'DelUser',
                    path: 'DelUser',
                    component: () =>
                        import ('@/view/Admin/UserManage/DelUser.vue'),
                    beforeEnter(to, from, next) {
                        //判断当前路由是否需要进行权限控制
                        if (JSON.parse(sessionStorage.getItem('userInfo')).permission) {
                            next()
                        } else {
                            alert('暂无权限查看')
                        }
                    },

                },
                {
                    name: 'AddUser',
                    path: 'AddUser',
                    component: () =>
                        import ('@/view/Admin/UserManage/AddUser.vue'),
                    beforeEnter(to, from, next) {
                        //判断当前路由是否需要进行权限控制
                        if (JSON.parse(sessionStorage.getItem('userInfo')).permission) {
                            next()
                        } else {
                            alert('暂无权限查看')
                        }

                    }
                },
                {
                    name: 'SourceUpload',
                    path: 'SourceUpload',
                    component: () =>
                        import ('@/view/Admin/SourceManage/SourceUpload.vue')
                }
            ]
        },


        {
            // 会匹配所有路径
            path: '*',
            component: import ('@/components/NotFound.vue')
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
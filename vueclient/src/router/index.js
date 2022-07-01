import Vue from 'vue'
import Router from 'vue-router'

import AdminCp from '../components/admin/AdminCp.vue'
import PointAdmin from '../components/admin/point/PointAdmin.vue'
import UserAdmin from '../components/admin/user/UserAdmin.vue'
import DashBoard from '../components/admin/dashboard/DashBoard.vue'

import Login from '../components/login/LoginA.vue'

Vue.use(Router)
const router = new Router({
    routes: [
        {
            path: '/',
            component: Login

        }, {
            path: '/admin',
            component: AdminCp,
            children: [
                {
                    path: '/',
                    component: DashBoard
                }, {
                    path: '/admin/point',
                    component: PointAdmin
                },
                {
                    path: '/admin/user',
                    component: UserAdmin
                }
            ]
        }

    ],
    mode: 'history'
})

export default router
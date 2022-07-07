import Vue from 'vue'
import Router from 'vue-router'

import AdminCp from '../components/admin/AdminCp.vue'
import PointTable from '../components/admin/point/PointTable.vue'
import UserTable from '../components/admin/user/UserTable.vue'
import DashBoard from '../components/admin/dashboard/DashBoard.vue'
import LogUser from '../components/admin/logUser/LogUser.vue'
import NF404 from '../components/NF404.vue'

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
                    component: PointTable
                }, {
                    path: '/admin/log',
                    component: LogUser

                }, {
                    path: '/admin/user',
                    component: UserTable
                }
            ]
        }, {
            path: '*',
            component: NF404
        }

    ],
    mode: 'history'
})

export default router
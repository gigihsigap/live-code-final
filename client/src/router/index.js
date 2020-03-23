import Vue from 'vue'
import VueRouter from 'vue-router'

import LogIn from '../views/LogIn.vue'
import Countries from '../views/Countries.vue'
import Reports from '../views/Reports.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LogIn,
  },
  {
    path: '/countries',
    name: 'Countries',
    component: Countries,
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

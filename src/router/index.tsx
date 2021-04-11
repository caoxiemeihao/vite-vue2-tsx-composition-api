import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/home',
    component: () => import('@/views/home'),
  },
  {
    path: '*',
    redirect: '/home',
  },
]

export default new VueRouter({
  mode: 'hash',
  routes,
})

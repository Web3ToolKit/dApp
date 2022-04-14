import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import LoginFlow from '../components/LoginFlow.vue'

const linkActiveClass = 'my-link-active-class'
// pass custom class to Vue Material
Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      name: 'LoginFlow',
      component: LoginFlow
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
  ]

  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    linkActiveClass
  })

  export default router

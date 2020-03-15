import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import RegisterUser from './views/RegisterUser.vue'
import LoginUser from './views/LoginUser.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      //* 這裡的資訊會依附在 route 上，可用於辨識
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterUser
    },
    {
      path: '/login',
      name: 'login',
      component: LoginUser
    }
  ]
})

//* 每次切換頁面之前
router.beforeEach((to, from, next) => {
  //* loggedIn 判斷是否為登入狀態
  const loggedIn = localStorage.getItem('user')

  //* 如果即將前往的 route 之 matched 陣列中有 meta.requiresAuth，且目前為非登入狀態，導向首頁
  // ! 這裡目前的問題是，若在 dashboard refresh，to 有 requiresAuth 但 loggedIn 依然為 true
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  } else {
    //* 否則繼續執行
    next()
  }
})

export default router

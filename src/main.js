import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  //* 啟動時，如果 localStorage 有 userData，就塞到 Vuex state 中
  created () {
    const userString = localStorage.getItem('user')
    if (userString) {
      const userData = JSON.parse(userString)
      this.$store.commit('SET_USER_DATA', userData)
    }
    //* axios 攔截器，若回覆為 401，直接登出
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('logout')
        }
        //* return Promise，攜帶 error 訊息 (不是很明白實際作用)
        return Promise.reject(error)
      }
    )
  },
  render: h => h(App)
}).$mount('#app')

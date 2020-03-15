import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER_DATA (state, userData) {
      //* 放到 state 中
      state.user = userData
      //* 放到 localStorage 裡
      localStorage.setItem('user', JSON.stringify(userData))
      //* 放到 axios header 中
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        userData.token
      }`
    },
    CLEAR_USER_DATA (state) {
      localStorage.removeItem('user')
      // state.user = null
      // axios.defaults.headers.common['Authorization'] = null
      //* refresh page，vuex 會被重置，state 和 axios header 的設定不會保留
      location.reload()
    }
  },
  actions: {
    register ({ commit }, credentials) {
      return axios.post('//localhost:3000/register', credentials).then(({ data }) => {
        commit('SET_USER_DATA', data)
        /*
          回傳 data:
          {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJsYWxhbGEiLCJlbWFpbCI6ImxhbGFsYUBnbWFpbC5jb20iLCJwYXNzd29yZCI6ImxhbGFsYSJ9LCJpYXQiOjE1ODQxNjg3MjN9.WRsMYPCmimVAxQV3KKEVKMKEAoyFwnwW2wDoUJWPjYI",
            email: "lalala@gmail.com",
            name: "lalala"
          }
        */
      })
    },
    login ({ commit }, credentials) {
      return axios.post('//localhost:3000/login', credentials).then(({ data }) => {
        commit('SET_USER_DATA', data)
      })
    },
    logout ({ commit }) {
      commit('CLEAR_USER_DATA')
    }
  },
  getters: {
    loggedIn (state) {
      return !!state.user
    }
  }
})

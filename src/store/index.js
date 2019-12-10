import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    TokenObj: getItem('token'),
    userphoto: 'https://img.yzcdn.cn/vant/cat.jpeg'
  },
  mutations: {
    changeTokenObj (state, token) {
      state.TokenObj = token
      setItem('token', state.TokenObj)
    },
    changeUserPhoto (state, data) {
      state.userphoto = data
    }
  },
  actions: {
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    TokenObj: getItem()
  },
  mutations: {
    changeTokenObj (state, token) {
      state.TokenObj = token
      setItem('token', state.TokenObj)
    }
  },
  actions: {
  },
  modules: {
  }
})

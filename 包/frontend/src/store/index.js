import Vue from "vue";
import Vuex from "vuex";
import { local } from '../utils'
import { LOGIN, REGISTER } from '../apis'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    get user() {
      return local.get('user') || null
    },
    set user(info) {
      local.set('user', info)
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    clearUser(state) {
      state.user = null
    },
  },
  actions: {
    async register({ commit }, info) {
      const res = await REGISTER(info)
      const { result: user } = res
      commit('setUser', user)
      return user
    },
    async login({ commit }, loginInfo) {
      const res = await LOGIN(loginInfo)
      const { result: user } = res
      console.log('user: ', user)
      commit('setUser', user)
      return user
    },
    logout() {},
  },
});

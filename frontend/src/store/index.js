import Vue from "vue";
import Vuex from "vuex";
import { local } from '../utils'
import { LOGIN } from '../apis'

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
    register({commit}, loginInfo) {},
    login({commit}, loginInfo) {
      LOGIN(loginInfo).then(user => {
        commit('setUser', user)
      })
    },
    logout() {},
  },
});

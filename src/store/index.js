import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
  },
  getters: {
    getToken(state){
      return state.token;
    }
  },
  mutations: {
    setToken(state, payload){
      state.token = payload;
    },
  },
  actions: {
  },
  modules: {
  }
})

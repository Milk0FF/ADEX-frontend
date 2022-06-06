import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    userInfo: {},
  },
  getters: {
    getToken(state){
      return state.token;
    },
    getUserInfo(state){
      return state.userInfo;
    }
  },
  mutations: {
    setToken(state, payload){
      state.token = payload;
    },
    setUserInfo(state, payload){
      state.userInfo = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})

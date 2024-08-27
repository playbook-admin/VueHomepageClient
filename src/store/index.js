import { createStore } from 'vuex';

export default createStore({
  state: {
    loading: false,
    apiAddress: process.env.VUE_APP_API_ADDRESS || '', // Set API address from .env
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_APIADDRESS(state, payload) {
      state.apiAddress = payload;
    },
  },
  actions: {
    setLoading({ commit }, payload) {
      commit('SET_LOADING', payload);
    },
    setApiAddress({ commit }, payload) {
      commit('SET_APIADDRESS', payload);
    },
  },
});

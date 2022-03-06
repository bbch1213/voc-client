import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: false,
  },
  getters: {
    getAuthenticated: state => {
      return state.authenticated;
    },
  },
  mutations: {
    login: (state, payload) => {
      state.authenticated = true;
      console.log(payload);
      sessionStorage.setItem('X-AUTH-TOKEN', payload.token);
      sessionStorage.setItem('userId', payload.id);
    },
    logout: state => {
      state.xAuthToken = false;
      sessionStorage.removeItem('X-AUTH-TOKEN');
      sessionStorage.removeItem('userId');
    },
  },
  actions: {
    getTokenToServer: (context, payload) => {
      return axios
        .post('/api/login', payload)
        .then(response => {
          context.commit('login', response.data);
        })
        .catch(() => {});
    },
    logout: context => {
      return context.commit('logout');
    },
  },
});

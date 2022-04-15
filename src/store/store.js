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
      sessionStorage.setItem('Authorization', payload.token);
      sessionStorage.setItem('userId', payload.userId);
      payload.role.some(element => {
        console.log(element.roleType);
        if (element.roleType === 'ROLE_ADMIN') {
          sessionStorage.setItem('role', 'ROLE_ADMIN');
          return true;
        }
        sessionStorage.setItem('role', 'ROLE_USER');
      });
    },
    logout: state => {
      state.authenticated = false;
      sessionStorage.removeItem('Authorization');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('role');
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

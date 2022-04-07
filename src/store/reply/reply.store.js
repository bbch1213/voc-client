import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const ReplyVuex = new Vuex.Store({
  state: {
    replyPage: [],
    register: '',
  },
  getters: {
    getPage: state => {
      return state.replyPage;
    },
    getRegister: state => {
      return state.register;
    },
  },
  mutations: {
    page: (state, payload) => {
      state.replyPage = payload;
    },
    register: (state, payload) => {
      if (payload === '200') {
        state.register = true;
      } else {
        state.reigster = false;
      }
    },
  },
  actions: {
    getReply: (context, payload) => {
      return axios.get('/api/voc/' + payload + '/reply').then(response => {
        context.commit('page', response.data);
      });
    },
    savePage: async (context, payload) => {
      return await axios
        .post('/api/reply/register', payload, {
          headers: {
            Authorization: sessionStorage.getItem('Authorization'),
          },
        })
        .then(response => {
          context.commit('register', response.data.code);
        });
    },
  },
});

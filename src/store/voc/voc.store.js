import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const VocVuex = new Vuex.Store({
  state: {
    vocPage: {},
    vocList: [],
    register: '',
    reply: [],
  },
  getters: {
    getList: state => {
      return state.vocList;
    },
    getPage: state => {
      return state.vocPage;
    },
    getRegister: state => {
      return state.register;
    },
    getReply: state => {
      return state.reply;
    },
  },
  mutations: {
    list: (state, payload) => {
      state.vocList = payload.content;
    },
    page: (state, payload) => {
      state.vocPage = payload.data;
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
    getListToServerByCustomerId: (context, payload) => {
      return axios
        .get('/api/voc/findByCustomerId/' + payload + '?sort=createdAt,desc')
        .then(response => {
          context.commit('list', response.data);
        })
        .catch(() => alert('데이터 조회 실패!'));
    },
    getListToServerByAll: context => {
      return axios
        .get('/api/user/findAll?sort=createdAt,desc', {
          headers: {
            Authorization: sessionStorage.getItem('X-AUTH-TOKEN'),
          },
        })
        .then(response => {
          context.commit('list', response.data);
        })
        .catch(() => alert('데이터 조회 실패!'));
    },
    getPage: (context, payload) => {
      return axios.get('/api/voc/findOne/' + payload).then(response => {
        context.commit('page', response);
      });
    },
    savePage: async (context, payload) => {
      return await axios.post('/api/voc/register', payload).then(response => {
        context.commit('register', response.data.code);
      });
    },
    changeStatus: (context, payload) => {
      return axios
        .put('/api/user/voc/' + payload + '/select', payload, {
          headers: {
            Authorization: sessionStorage.getItem('X-AUTH-TOKEN'),
          },
        })
        .then(response => {
          if (response.data.code === '200') {
            console.log(response.data);
          }
        });
    },
  },
});

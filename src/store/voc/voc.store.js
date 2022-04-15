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
    getListToServerByCustomerId: async (context, payload) => {
      try {
        const response = await axios.get(
          '/api/voc/customers/' + payload + '?sort=createdAt,desc',
        );
        context.commit('list', response.data);
      } catch {
        return alert('데이터 조회 실패!');
      }
    },
    getListToServerByAll: async context => {
      try {
        const response = await axios.get('/api/voc/pages?sort=createdAt,desc', {
          headers: {
            Authorization: sessionStorage.getItem('Authorization'),
          },
        });
        context.commit('list', response.data);
      } catch {
        return alert('데이터 조회 실패!');
      }
    },
    getListToServerByStatus: async context => {
      try {
        const response = await axios.get(
          '/api/user/voc/no-managed?sort=createdAt,desc',
          {
            headers: {
              Authorization: sessionStorage.getItem('Authorization'),
            },
          },
        );
        context.commit('list', response.data);
      } catch {
        return alert('데이터 조회 실패!');
      }
    },
    getPage: async (context, payload) => {
      const response = await axios.get('/api/voc/' + payload);
      context.commit('page', response);
    },
    savePage: async (context, payload) => {
      return await axios
        .post('/api/voc/add', payload, {
          headers: {
            Authorization: sessionStorage.getItem('Authorization'),
          },
        })
        .then(response => {
          context.commit('register', response.data.code);
        });
    },
    changeStatus: async (context, payload) => {
      const response = await axios
        .put('/api/user/voc/' + payload, payload, {
          headers: {
            Authorization: sessionStorage.getItem('Authorization'),
          },
        })
        .then(response => {
          console.log(response);
        });
      if (response.data.code === '200') {
        console.log(response.data);
      }
    },
  },
});

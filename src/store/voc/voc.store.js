import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const resourceHost = "http://localhost:8081";

export const VocVuex = new Vuex.Store({
    state: {
        customerId : '',
        vocList: []
    },
    getters: {
        getList : state => {
            return state.vocList;
        }
    },
    mutations: {
        list : (state, payload) => {
            state.vocList = payload.content;
        },
    },
    actions: {
        getListToServerByCustomerId : (context, payload) => {
            return axios.get(resourceHost + '/api/voc/findByCustomerId/' + payload)
                .then((response) => {
                    console.log(response);
                    context.commit("list", response.data);
                }).catch(() => alert('아이디나 비밀번호를 확인해주세요.'));
        },
        getListToServerByAll : (context) => {
            return axios.get('/api/voc/findAll', {headers: {
                'Authorization': sessionStorage.getItem('X-AUTH-TOKEN')
                }})
                .then((response) => {
                    console.log(response);
                    context.commit("list", response.data)
                }).catch(() => alert("!!!!"));
        }
    },
});

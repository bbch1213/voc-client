import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const resourceHost = "http://localhost:8081";

export const AccountVuex = new Vuex.Store({
    state: {
        xAuthToken: ''
    },
    getters: {
        getToken : state => {
            return state.xAuthToken;
        }
    },
    mutations: {
        login : (state, payload) => {
            state.xAuthToken = payload;
            sessionStorage.setItem('X-AUTH-TOKEN', payload);
        },
        logout : (state) => {
            state.xAuthToken = null;
            sessionStorage.removeItem('X-AUTH-TOKEN');
        }
    },
    actions: {
        getTokenToServer : (context, payload) => {
            return axios.post(resourceHost + '/api/login', payload)
                .then((response) => {
                    if(response.status === 200){
                        context.commit("login", response.data.token);
                    }
            }).catch(() => alert('아이디나 비밀번호를 확인해주세요.'));
        }
    },
    modules: {},
});

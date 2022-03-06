import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/account/account.vue'),
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => {
      this.$store.commit('logout');
    },
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('@/views/voc/voc-list.vue'),
  },
  {
    path: '/page/:id',
    name: 'Page',
    component: () => import('@/views/voc/voc-page.vue'),
  },
  {
    path: '/page/vocRegister',
    name: 'VocRegister',
    component: () => import('@/views/voc/voc-register.vue'),
  },
  {
    path: '/reply/:id/register',
    name: 'ReplyRegister',
    component: () => import('@/views/reply/reply-register.vue'),
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

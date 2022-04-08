import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';

const requireAuth = (from, to, next) => {
  const isAuthenticated = sessionStorage.getItem('Authorization');

  if (isAuthenticated) {
    next();
  } else {
    alert('로그인이 필요한 서비스입니다.');
    router.push('/login').catch(() => {}); //from to next 를 사용할 때 next 로 한 곳만 보내야 하기 때문에 이와 같이 라우팅 해줘야 함.
  }
};

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
    beforeEnter: requireAuth,
  },
  {
    path: '/page/:id',
    name: 'Page',
    component: () => import('@/views/voc/voc-page.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/page/vocRegister',
    name: 'VocRegister',
    component: () => import('@/views/voc/voc-register.vue'),
    beforeEnter: requireAuth,
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

<template>
  <nav>
    <router-link to="" @click.native="goToBack()">뒤로 가기 | </router-link>
    <router-link to="" @click.native="goToFront()">앞으로 가기 | </router-link>
    <router-link to="" @click.native="logout()" v-if="authorization"
      >로그아웃</router-link
    >
    <router-link :to="{ name: 'VocRegister' }" v-if="!authorization"
      >문의 남기기</router-link
    >
  </nav>
</template>

<script>
import router from '@/router/router.js';
import store from '@/store/store.js';

export default {
  name: 'nav-form',
  data() {
    return {
      authorization: false,
    };
  },
  mounted() {
    if (sessionStorage.getItem('X-AUTH-TOKEN')) {
      this.authorization = true;
    } else {
      this.authorization = false;
    }
  },
  methods: {
    goToBack: () => {
      router.go(-1);
    },
    goToFront: () => {
      router.go(1);
    },
    logout: () => {
      store.dispatch('logout').then(() => router.go(0));
    },
  },
};
</script>

<style scoped></style>

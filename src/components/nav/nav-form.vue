<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand href="#" @click="goToHome">VOC</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" @click.prevent="goToBack()"
            >뒤로 가기
          </b-nav-item>
          <b-nav-item herf="#" @click.prevent="goToFront()"
            >앞으로 가기
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>사용자</em>
            </template>
            <b-dropdown-item @click.prevent="logout()" v-if="authorization"
              >로그아웃</b-dropdown-item
            >
            <b-dropdown-item
              @click.prevent="goToVocRegister()"
              v-if="!authorization"
              >문의 남기기</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
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
    if (sessionStorage.getItem('Authorization')) {
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
    goToHome: () => {
      router.push('/');
    },
    logout: () => {
      store.dispatch('logout').then(() => router.go(0));
    },
    goToVocRegister: () => {
      router.push({ name: 'VocRegister' });
    },
  },
};
</script>

<style scoped></style>

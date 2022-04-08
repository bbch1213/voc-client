<template>
  <form>
    <div>
      <label for="userId">아이디: </label>
      <input id="userId" type="text" v-model="userId" />
    </div>
    <div>
      <label for="password">비밀번호: </label>
      <input id="password" type="password" v-model="password" />
    </div>
    <button type="button" @click="submitForm()">로그인</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      userId: '',
      password: '',
    };
  },
  mounted() {
    if (sessionStorage.getItem('Authorization')) {
      this.$router.push({ name: 'List' });
    }
  },
  methods: {
    async submitForm() {
      const userData = {
        userId: this.userId,
        password: this.password,
      };
      if (this.userId === '' || this.password === '') {
        alert('아이디나 비밀번호를 입력해주세요.');
        return;
      }
      await this.$store.dispatch('getTokenToServer', userData).then(() => {
        if (this.$store.getters.getAuthenticated === false) {
          alert('아이디나 비밀번호를 확인해주세요.');
          this.initForm();
        } else {
          this.$router.push({ name: 'List' });
        }
      });
    },
    initForm() {
      this.userId = '';
      this.password = '';
    },
  },
};
</script>

<style scoped></style>

<template>
  <div>
    <form>
      <p>아이디 : </p>
      <input type="text" v-model="userId" />
      <p>비밀번호 : </p>
      <input type="password" v-model="password" />
      <button type="button" @click="login()">로그인</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Account',
  data() {
    return {
      userId: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.$store.dispatch("getTokenToServer", {
        userId: this.userId,
        password: this.password
      }).then(() => {this.$router.push({name: 'List'})})
      .catch((err) => console.log(err));
    }
  }
};
</script>

<style scoped>

</style>
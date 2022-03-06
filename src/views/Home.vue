<template>
  <div>
    <div>
      <router-link :to="{ name: 'Login' }">상담사 전용 페이지</router-link>
    </div>
    <div>
      <router-link :to="{ name: 'List' }">고객 전용 페이지</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped></style>

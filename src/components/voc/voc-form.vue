<template>
  <form>
    <div>
      <label for="customerId">고객 ID: {{ customerId }}</label>
    </div>
    <div>
      <label for="customerId">제목: {{ title }}</label>
    </div>
    <div>
      <label for="createdAt">작성일: {{ createdAt | timeFilter }}</label>
    </div>
    <div>
      <textarea id="textarea" v-model="content" disabled></textarea>
    </div>
    <div v-if="authorization">
      <button
        type="button"
        v-if="status === 'NO_MANAGER'"
        @click.prevent="changeStatus()"
      >
        나에게 할당하기
      </button>
      <button
        type="button"
        @click.prevent="toReply()"
        v-else-if="authorizationId === user.userId"
      >
        답글 달기
      </button>
      <button type="button" v-else disabled>이미 할당된 VOC 입니다.</button>
    </div>
  </form>
</template>

<script>
import { VocVuex } from '@/store/voc/voc.store';

export default {
  data() {
    return {
      title: '',
      customerId: '',
      status: '',
      content: '',
      createdAt: '',
      user: [],
      authorization: sessionStorage.getItem('X-AUTH-TOKEN'),
      authorizationId: sessionStorage.getItem('userId'),
    };
  },
  created() {
    VocVuex.dispatch('getPage', this.$route.params.id).then(() => {
      const page = VocVuex.getters.getPage;
      this.title = page.title;
      this.status = page.vocStatus;
      this.customerId = page.customerId;
      this.content = page.content;
      this.createdAt = page.createdAt;
      this.user = page.user;
    });
  },
  computed: {
    $textarea() {
      return document.getElementById('textarea');
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$textarea.style.width = '500px';
      this.resize();
    },
    input(value) {
      this.$emit('input', value);
      this.resize();
    },
    resize() {
      this.$textarea.style.height = '1px';
      this.$textarea.style.height = `${this.$textarea.scrollHeight + 12}px`;
    },
    changeStatus() {
      VocVuex.dispatch('changeStatus', this.$route.params.id);
      this.$router.go(0);
    },
    toReply() {
      this.$router.push({
        name: 'ReplyRegister',
        params: { id: this.$route.params.id },
      });
    },
  },
  filters: {
    timeFilter: function(value) {
      let js_date = new Date(value);

      let year = js_date.getFullYear();
      let month = js_date.getMonth() + 1;
      let day = js_date.getDate();
      let hours = js_date.getHours();
      let minutes = js_date.getMinutes();
      let seconds = js_date.getSeconds();

      if (month < 10) {
        month = '0' + month;
      }

      if (day < 10) {
        day = '0' + day;
      }

      return (
        year +
        '-' +
        month +
        '-' +
        day +
        ' ' +
        hours +
        ':' +
        minutes +
        ':' +
        seconds
      );
    },
  },
};
</script>

<style scoped></style>

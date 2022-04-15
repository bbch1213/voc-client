<template>
  <div v-if="replyList !== null">
    <div v-for="item in replyList" v-bind:key="item.id">
      <div>
        <label for="userId">답변자 ID: {{ item.createdBy.userId }}</label>
      </div>
      <div>
        <label for="title">제목: {{ item.title }}</label>
      </div>
      <div>
        <label for="createdAt">작성일: {{ item.createdAt | timeFilter }}</label>
      </div>
      <div>
        <textarea id="textarea" v-model="item.content" disabled></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { ReplyVuex } from '@/store/reply/reply.store';

export default {
  data() {
    return {
      replyList: [],
    };
  },
  created() {
    ReplyVuex.dispatch('getReply', this.$route.params.id).then(() => {
      this.replyList = ReplyVuex.getters.getPage;
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

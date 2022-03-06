<template>
  <form>
    <div>
      <label for="title">제목: </label>
      <input v-model="title" />
    </div>
    <div>
      <textarea id="textarea" v-model="content"></textarea>
    </div>
    <button type="button" @click.prevent="save()">등록</button>
  </form>
</template>

<script>
import { ReplyVuex } from '@/store/reply/reply.store';

export default {
  data() {
    return {
      id: '',
      title: '',
      content: '',
      createdAt: '',
    };
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
    save() {
      const Data = {
        title: this.title,
        userId: sessionStorage.getItem('userId'),
        vocId: this.$route.params.id,
        content: this.content,
      };
      if (Data.title === '') {
        alert('제목을 입력하세요.');
      } else if (Data.content === '') {
        alert('내용을 입력하세요.');
      } else {
        ReplyVuex.dispatch('savePage', Data).then(() => {
          if (ReplyVuex.getters.getRegister) {
            alert('등록 완료');
            this.$router.go(-1);
          } else {
            alert('등록 실패. 관리자에게 문의하세요.');
          }
        });
      }
    },
  },
};
</script>

<style scoped></style>

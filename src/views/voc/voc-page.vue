<template>
  <div>
    <VocForm></VocForm>
    <ReplyForm></ReplyForm>
  </div>
</template>

<script>
import VocForm from '@/components/voc/voc-form.vue';
import ReplyForm from '@/components/reply/reply-form.vue';

export default {
  name: 'voc-page',
  components: { VocForm, ReplyForm },
};
</script>

<style scoped></style>

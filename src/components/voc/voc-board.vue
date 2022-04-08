<template>
  <div>
    <input type="text" v-model="customer" />
    <button type="button" @click.prevent="searchCustomer">검색</button>
    <b-table-simple responsive>
      <b-thead>
        <b-tr>
          <b-th scope="col">번호</b-th>
          <b-th hidden scope="col">id</b-th>
          <b-th scope="col">제목</b-th>
          <b-th scope="col">고객 ID</b-th>
          <b-th scope="col">답변상태</b-th>
          <b-th scope="col">작성일자</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="(item, index) in list" :key="index">
          <b-td scope="row">{{ index + 1 }}</b-td>
          <b-td hidden scope="row">{{ item.id }}</b-td>
          <b-td>
            <a href="javascript:void(0);" @click="goToPage(item.id)">{{
              item.title
            }}</a>
          </b-td>
          <b-td scope="row">{{ item.customerId }}</b-td>
          <b-td scope="row">{{ item.vocStatus }}</b-td>
          <b-td scope="row">{{ item.createdAt | timeFilter }}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<script>
import { VocVuex } from '@/store/voc/voc.store';

export default {
  data() {
    return {
      customer: '',
      index: 0,
      list: [
        {
          index: '',
          id: '',
          title: '',
          vocStatus: '',
          customerId: '',
          createdAt: '',
        },
      ],
    };
  },
  methods: {
    searchCustomer() {
      if (this.customer === '') {
        VocVuex.dispatch('getListToServerByAll').then(() => {
          this.list = VocVuex.getters.getList;
        });
      } else {
        VocVuex.dispatch('getListToServerByCustomerId', this.customer).then(
          () => {
            this.list = VocVuex.getters.getList;
          },
        );
      }
    },
    goToPage(item) {
      this.$router.push({ name: 'Page', params: { id: item } });
    },
  },
  created() {
    VocVuex.dispatch('getListToServerByAll').then(() => {
      this.list = VocVuex.getters.getList;
    });
  },
  filters: {
    timeFilter: function(value) {
      if (value == '') return '';

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

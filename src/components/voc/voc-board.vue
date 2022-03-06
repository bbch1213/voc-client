<template>
  <div>
    <input type="text" v-model="customer" />
    <button type="button" @click.prevent="searchCustomer">검색</button>
    <table border="1">
      <thead>
        <tr>
          <th scope="col">번호</th>
          <th hidden scope="col">id</th>
          <th scope="col">제목</th>
          <th scope="col">고객 ID</th>
          <th scope="col">답변상태</th>
          <th scope="col">작성일자</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td scope="row">{{ index + 1 }}</td>
          <td hidden scope="row">{{ item.id }}</td>
          <td>
            <router-link :to="{ name: 'Page', params: { id: item.id } }">{{
              item.title
            }}</router-link>
          </td>
          <td scope="row">{{ item.customerId }}</td>
          <td scope="row">{{ item.vocStatus }}</td>
          <td scope="row">{{ item.createdAt | timeFilter }}</td>
        </tr>
      </tbody>
    </table>
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
      VocVuex.dispatch('getListToServerByCustomerId', this.customer).then(
        () => {
          this.list = VocVuex.getters.getList;
        },
      );
    },
  },
  created() {
    if (sessionStorage.getItem('X-AUTH-TOKEN') !== null) {
      VocVuex.dispatch('getListToServerByAll').then(() => {
        this.list = VocVuex.getters.getList;
      });
    }
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

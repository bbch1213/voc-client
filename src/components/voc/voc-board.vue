<template>
  <div>
    <table>
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
        <td scope="row">{{index+1}}</td>
        <td hidden scope="row">{{item.id}}</td>
        <td scope="row">{{item.title}}</td>
        <td scope="row">{{item.customerId}}</td>
        <td scope="row">{{item.vocStatus}}</td>
        <td scope="row">{{item.createdAt}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {VocVuex} from "../../store/voc/voc.store";

export default {
  name: "voc-board",
  data() {
    return {
      index: 0,
      list: [{
        index: '',
        id: '',
        title: '',
        vocStatus: '',
        customerId: '',
        createdAt: '',
      },]
    }
  },
  created() {
    if(sessionStorage.getItem('X-AUTH-TOKEN') === null)
    {
      VocVuex.dispatch("getListToServerByCustomerId", 'customerA').then(() => {
        this.list = VocVuex.getters.getList;
        console.log(this.list);
      });
    }
    else{
      VocVuex.dispatch("getListToServerByAll").then(() => {
        this.list = VocVuex.getters.getList;
        console.log(this.list);
      });
    }
  },
}
</script>

<style scoped>

</style>
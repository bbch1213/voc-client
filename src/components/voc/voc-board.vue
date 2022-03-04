<template>
  <div>

  </div>
</template>

<script>
import {VocVuex} from "../../store/voc/voc.store";

export default {
  name: "voc-board",
  created() {
    if(sessionStorage.getItem('X-AUTH-TOKEN') === null)
      VocVuex.dispatch("getListToServerByCustomerId", 'customerA').then(() => alert("!"));
    else{
      VocVuex.dispatch("getListToServerByAll").then(() => alert("@"));
    }
  }
}
</script>

<style scoped>

</style>
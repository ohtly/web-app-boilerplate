<template>
  <div>dashboard view</div>
</template>

<script>
import ApiService from "../../services/api.service";
export default {
  async mounted() {
    // let response = await ApiService.get("/hello");
    // console.log(response.data);

    let response = await ApiService.get("/user");
    console.log(response.data);
  }
};
</script>

<style>
</style>
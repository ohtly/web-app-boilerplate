<template>
  <div class="dashboard__container">
    <h2>工作台</h2>
    <div>姓名：{{user.name}}</div>
    <div>城市：{{user.city}}</div>
  </div>
</template>

<script>
import ApiService from "@/services/api.service";
import { logger } from "@/services/log.service";

export default {
  components: {},
  data() {
    return {
      user: {}
    };
  },
  methods: {},
  async mounted() {
    let response = await ApiService.get("/user");
    this.user = response.data;
  }
};
</script>

<style scoped>
.dashboard__container {
  flex: 1;
}
</style>
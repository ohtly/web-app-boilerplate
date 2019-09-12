<template>
  <div class="dashboard__container">
    <h2>工作台</h2>
    <button @click="handleClick">获取信息</button>
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
  methods: {
    async handleClick() {
      let response = await ApiService.get("/user");
      this.user = response.data;
      logger.info(`获取用户信息：${this.user.name}, ${this.user.city}`);
    }
  }
};
</script>

<style scoped>
.dashboard__container {
  flex: 1;
}
</style>
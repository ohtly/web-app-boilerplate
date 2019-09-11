<template>
  <div>
    <h2>模拟 token 失效，并自动通过 refresh token 重置 token</h2>
    <ul>
      <li>
        <span>refresh 成功的情况</span>
        <button @click="handleClick">发送请求</button>
      </li>
      <li>
        <span>refresh 失败的情况</span>
        <button @click="handleClick">发送请求</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { logger } from "@/services/log.service";
import ApiService from "@/services/api.service";

export default {
  methods: {
    async handleClick() {
      logger.info(`发送请求..`);

      const response = await ApiService.get("/visit");
    }
  }
};
</script>

<style scoped>
li {
  margin: 1rem;
}

li span {
  margin-right: 1rem;
}
</style>
<template>
  <div class="dashboard__container">
    <h2>工作台</h2>
    <div>name: {{name | capitalize}}</div>
  </div>
</template>

<script>
import ApiService from "@/services/api.service";
import { logger } from "@/services/log.service";

export default {
  components: {},
  data() {
    return {
      name: "tom"
    };
  },
  methods: {},
  async mounted() {
    let response = await ApiService.get("/user");
    logger.info(response.data);
  }
};
</script>

<style scoped>
.dashboard__container {
  flex: 1;
}
</style>
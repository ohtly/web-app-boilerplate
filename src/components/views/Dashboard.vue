<template>
  <div>
    dashboard view
    <error-boundary>
      <template #content>
        <button @click="handleClick">引发错误</button>
      </template>
    </error-boundary>
  </div>
</template>

<script>
import ApiService from "../../services/api.service";
import { ErrorBoundary } from "@/components/widgets";
export default {
  components: {
    ErrorBoundary
  },
  methods: {
    handleClick() {
      console.log("clicked!");
      throw new Error("click error!");
    }
  },
  async mounted() {
    let response = await ApiService.get("/user");
    console.log(response.data);
  }
};
</script>

<style>
</style>
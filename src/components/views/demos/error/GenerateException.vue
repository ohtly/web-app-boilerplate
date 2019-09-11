<template>
  <div style="margin-top:1rem;">
    Vue 框架内同步的代码异常，将会被 error-boundary 捕获
    <button @click="handleClick">引发异常</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      throw new Error("被 <error-boundary> 捕获的异常");
    }
  }
};
</script>

<style>
</style>
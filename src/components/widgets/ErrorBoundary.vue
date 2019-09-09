<template>
  <div>
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  name: "error-boundary",
  props: {
    stopPropagation: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      err: null,
      vm: null,
      info: null
    };
  },
  errorCaptured(err, vm, info) {
    console.log(">>>>>>" + err);
    this.err = err;
    this.vm = vm;
    this.info = info;
    return !this.stopPropagation;
  }
};

// todo 编写一个子组件，引发错误，现在的示例，引发在父组件，没有走error-boundary
</script>

<style lang="css" scoped>
</style>
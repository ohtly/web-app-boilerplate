<template>
  <div>
    <slot name="error" v-if="err!=null" :error="err" :clear="clear"></slot>
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
    this.err = err;
    this.vm = vm;
    this.info = info;
    return !this.stopPropagation;
  },
  methods: {
    clear() {
      this.err = null;
      this.vm = null;
      this.info = null;
    }
  }
};
</script>

<style lang="css" scoped>
</style>
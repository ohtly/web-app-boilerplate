<template>
  <div>
    <h1>dash view</h1>
    <div>
      <button @click="handleLogout">退出登录</button>
    </div>
    <div style="margin-top: 1rem;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("auth", ["logout"]),
    handleLogout() {
      this.logout();
    }
  }
};
</script>

<style>
</style>
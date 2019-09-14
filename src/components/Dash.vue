<template>
  <component :is="layout">
    <template #header>
      <div>
        <button @click="handleLogout">退出登录</button>
      </div>
    </template>
    <template #content>
      <router-view></router-view>
    </template>
  </component>
</template>

<script>
import { mapActions } from "vuex";

import { DefaultLayout } from "@/components/layout";

export default {
  components: {
    DefaultLayout
  },
  data() {
    return {
      layout: `default-layout`
    };
  },
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
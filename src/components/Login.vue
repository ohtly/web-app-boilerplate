<template>
  <div>
    <h1>Login view</h1>
    <div>
      <div v-if="authenticating">login..</div>
      <div v-if="authenticationError!=''">{{authenticationError}}</div>
      <input placeholder="User name" v-model="userName" />
      <input placeholder="Password" type="password" v-model="password" />
      <button @click="handleLogin">登录</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      userName: "zhangsan",
      password: ""
    };
  },
  async mounted() {},
  computed: {
    ...mapGetters("auth", ["authenticating", "authenticationError"])
  },
  methods: {
    ...mapActions("auth", ["login"]),
    handleLogin() {
      this.login({
        userName: this.userName,
        password: this.password
      });
      this.password = "";
    }
  }
};
</script>

<style>
</style>
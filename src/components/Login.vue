<template>
  <div>
    <component :is="layout">
      <form @submit.prevent="handleLogin">
        <div v-if="authenticating">login..</div>
        <div class="login__error" v-if="authenticationError!=''">{{authenticationError}}</div>
        <label>
          用户名
          <input placeholder="User name" v-model="userName" />
        </label>
        <label>
          密码
          <input placeholder="Password" type="password" v-model="password" />
        </label>
        <button>登录</button>
      </form>
    </component>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { LoginLayout } from "@/components/layout";

const layout = "login-layout";

export default {
  components: {
    LoginLayout
  },
  data() {
    return {
      layout,
      userName: "zhangsan",
      password: ""
    };
  },
  components: {
    LoginLayout
  },
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

<style scoped>
.login__error {
  color: red;
}
</style>
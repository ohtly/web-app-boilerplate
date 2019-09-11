<template>
  <div>
    <h2>Error/Exception处理演示</h2>

    <p>请打开浏览器控制台，除个别情况，捕获异常开发阶段默认打印到控制台（生产环境发送到服务器端）。</p>

    <ul>
      <li>
        <div>
          <span>一个不存在的图片</span>
          <img src="http://sohu.com/1.jpeg" />
          通过 document.addEventListener('error', ..) 捕获
        </div>
      </li>
      <li>
        HTTP axios timeout 异常，
        <button @click="handleClickCreateAsyncGetRequest">引发 promise 异步异常</button>，通过 window.onunhandledrejection 捕获事件
      </li>
      <li>
        HTTP axios timeout 异常，使用同步（promise/await）
        <button @click="handleClickCreateGetRequest">引发异步异常</button>，通过 Vue.config.errorHandler 捕获异常
      </li>
      <li>
        异步代码异常，未使用 promise（ setTimeout ），将被 window.onerror 捕获异常
        <button
          @click="handleClickCreateAsyncError"
        >引发异常</button>
      </li>
      <li>
        <error-boundary>
          <template #error="{error,clear}">
            <div style="margin:1rem;color:red;">
              {{error.message}}
              <button @click="clear">清空</button>
            </div>
          </template>
          <template #content>
            <generate-exception-view />
          </template>
        </error-boundary>
      </li>
    </ul>
  </div>
</template>

<script>
import GenerateExceptionView from "./GenerateException";
import { ErrorBoundary } from "@/components/widgets";

import axios from "axios";

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 10,
  withCredentials: true
});

export default {
  components: {
    GenerateExceptionView,
    ErrorBoundary
  },
  methods: {
    handleClickCreateAsyncError() {
      // 将会被 window.onerror 捕获
      setTimeout(() => {
        throw new Error("异步异常，应被 window.onerror 捕获");
      }, 100);
    },
    handleClickCreateAsyncGetRequest() {
      // timeout，因为promise，将被 window.onunhandledrejection捕获事件
      client.get("posts/1");
    },
    async handleClickCreateGetRequest() {
      // await，被局部的Vue.errorCaptured（如果有的话）或者最终被Vue.errorHandler
      await client.get("posts/1");
    }
  }
};
</script>

<style scoped>
li {
  margin: 1rem;
}
</style>
# web-app-boilerplate

基于 Vue.js 的模板项目。

## 根据模板创建项目

clone 项目：

```
git clone https://github.com/ohtly/web-app-boilerplate.git YOUR_WEB_APP_NAME
```

## Project setup

本节是 Vue CLI 默认项目设置。

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

## 附加设置

在 Vue CLI 生成项目基础上，又增加了一些项目会用到的附加设置。

### mockserver

帮助 Vue.js 开发人员在没有服务器端支持的情况下，先创建和使用模拟的服务器端功能。

mockserver 使用的是：https://github.com/namshi/mockserver

运行 mockserver

```
yarn mockserver
```

有关 mockserver 相关的模拟 response 配置，见 /test/mock

## 架构说明

### 基本架构

- 使用 Vue/Vue Router/Vuex
- Fetch/XHR，使用 Axios

### 基于 Token 的认证

借助 mockserver 实现了对 JWT/Token 认证的功能

- 认证成功后，token 会加入到 request 头，用于 RESTful
- 用户名/密码为 zhangsan/1234，其他情况会提示错误

TODO，目前未对 refresh token 做处理，后续加入。

## 其他

- 异常的处理，https://medium.com/js-dojo/error-exception-handling-in-vue-js-application-6c26eeb6b3e4
- 增加 app-log，见：https://github.com/arunredhu/vuejs_boilerplate/blob/master/src/app/shared/services/app-logger/app-logger.js



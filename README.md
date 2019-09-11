# web-app-boilerplate

基于 Vue.js 的模板项目。

## 命令说明

### 创建项目

clone 项目：

```
git clone https://github.com/ohtly/web-app-boilerplate.git YOUR_WEB_APP_NAME
```

### 安装依赖包

进入项目目录：

```
yarn
```

### 启动开发环境

启动 mockserver:

```
yarn mockserver
```

启动 web app

```
yarn serve
```

### 构建生产环境的文件

```
yarn build
```

## 开发说明

### 架构已经实现的功能

- 登录和相关的 token 机制
- 基本异常处理机制
- 过滤器结构
- 代码基本结构
- 基础布局

### 目录/文件结构

.
├── README.md
├── babel.config.js
├── dist
│   ├── css
│   │   └── app.b5239e9b.css
│   ├── favicon.ico
│   ├── index.html
│   └── js
│       ├── app.485218ae.js
│       ├── app.485218ae.js.map
│       ├── chunk-vendors.72d19647.js
│       └── chunk-vendors.72d19647.js.map
├── package.json
├── postcss.config.js
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   ├── 404.vue
│   │   ├── Dash.vue
│   │   ├── Login.vue
│   │   ├── layout
│   │   │   ├── DashFooter.vue
│   │   │   ├── DashHeader.vue
│   │   │   ├── DashSidebar.vue
│   │   │   ├── Default.vue
│   │   │   ├── Login.vue
│   │   │   └── index.js
│   │   ├── views
│   │   │   ├── Dashboard.vue
│   │   │   └── demos
│   │   │       ├── MockRefreshError.vue
│   │   │       ├── error
│   │   │       │   ├── ErrorDemo.vue
│   │   │       │   └── GenerateException.vue
│   │   │       └── index.js
│   │   └── widgets
│   │       ├── ErrorBoundary.vue
│   │       ├── Sidebar.vue
│   │       └── index.js
│   ├── environment
│   │   └── index.js
│   ├── filters
│   │   └── index.js
│   ├── main.js
│   ├── plugins
│   │   ├── exception.handler.js
│   │   └── index.js
│   ├── router.js
│   ├── services
│   │   ├── api.service.js
│   │   ├── log.service.js
│   │   ├── storage.service.js
│   │   └── user.service.js
│   └── store
│       ├── auth.module.js
│       └── index.js
├── test
│   └── mocks
│       ├── login
│       │   ├── OPTIONS.mock
│       │   ├── POST--{"refresh_token":"abcd"}.mock
│  
└── yarn.lock

### 基本路由

- /login 登录页面
- /
  - dashboard 工作台
  - error-demo 演示错误/异常处理机制
  - mock-refresh-error 演示 token 过期的处理
- * 404 

---

## 附加设置

在 Vue CLI 生成项目基础上，又增加了一些项目会用到的附加设置。

### mockserver

帮助 Vue.js 开发人员在没有服务器端支持的情况下，先创建和使用模拟的服务器端功能。

mockserver 使用的是：https://github.com/namshi/mockserver

运行 mockserver

```
yarn mockserver
```

将启动 mockserver 在 9900 端口。

有关 mockserver 相关的模拟 response 配置，见 /test/mock

## 架构说明

### 基本架构

- 使用 Vue/Vue Router/Vuex
- Fetch/XHR，使用 Axios

### 基于 Token 的认证

借助 mockserver 实现了对 JWT/Token 认证的功能

- 认证成功后，token 会加入到 request 头，用于 RESTful
- 用户名/密码为 `zhangsan`/`1234`，其他情况会提示错误

TODO，目前未对 refresh token 做处理，后续加入。

### 路由和访问控制

### 使用日志

### 可用的服务

#### 本地存储服务 storage service

#### HTTP 访问服务 api service

#### 用户登录/退出登录服务 user service

### 杂项

- 页面未找到的处理，见 /src/components/404.vue

## 其他

- 异常的处理，https://medium.com/js-dojo/error-exception-handling-in-vue-js-application-6c26eeb6b3e4
- 增加 app-log，见：https://github.com/arunredhu/vuejs_boilerplate/blob/master/src/app/shared/services/app-logger/app-logger.js
- 测试使用的免费 Restful api，[JSONPlaceholder](https://jsonplaceholder.typicode.com/)

## 参考

项目参考的文章/代码如下：

- [arunredhu/vuejs_boilerplate](https://github.com/arunredhu/vuejs_boilerplate)，以及 README 中相关的博客文章
- [Structuring a Vue project — Authentication](https://medium.com/@zitko/structuring-a-vue-project-authentication-87032e5bfe16)，jwt/refresh token 的主要机制来源于它

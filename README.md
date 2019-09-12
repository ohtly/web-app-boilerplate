# refresh token

为服务器端开发人员提供 JWT/refresh token 的测试工具，以及规定和 web app 的接口。

## 访问 web app

下载和安装依赖包：

```
git clone -b test_refresh https://github.com/ohtly/web-app-boilerplate.git

yarn
```

启动：

```
VUE_APP_API_BASE_URL=https://YOUR_RESTFUL_BASE_URL yarn serve
```

`VUE_APP_API_BASE_URL` 为 RESTful 的 url

然后，可以 http://localhost:8080 访问一个简单的 web app，仅有登录和访问授权资源 2 个功能。

## 登录

登录请求：

- url VUE_APP_API_BASE_URL/login
- 方法：POST
- 参数，`{username: "zhangsan", password: "1234"}`

成功的响应：

```
HTTP/1.1 200 OK
...

{
    "access_token": "TOKEN_STRING",
    "refresh_token": "REFRESH_TOKEN_STRING"
}
```

错误的响应：

```
HTTP/1.1 401 Unauthorized
...

{
    "error": "The user name or password is incorrect."
}
```

## 访问授权资源

访问请求：

- url VUE_APP_API_BASE_URL/user
- 方法：GET

成功的响应：

```
HTTP/1.1 200 OK
...

{
    "name":"张三",
    "city":"北京"
}
```

## token 和 refresh token

建议生产环境有效时间

- token 10 分钟
- refresh_token 7 天

## refresh token

当登录成功后，访问授权资源时，如果 token 过期

- web app 会自动发起 refesh token 请求，获取新的 token 和 refresh token
- 如果 refresh token 成功，将继续获取授权资源
- 如果 refresh token 失败，则返回登录页面

refresh token 请求（和登录请求的 url 相同）：

- url VUE_APP_API_BASE_URL/login
- 方法：POST
- 参数，`{"refresh_token": "REFRESH_TOKEN"}`

成功的响应：

```
HTTP/1.1 200 OK
...

{
    "access_token": "TOKEN_STRING",
    "refresh_token": "REFRESH_TOKEN_STRING"
}
```

错误的响应：

```
HTTP/1.1 401 Unauthorized
...

{
    "error": "The refresh token is incorrect."
}
```

## 建议

测试时可将 token 有效期缩短。

另外，可在浏览器的 dev tools 中终端看到登录等日志信息，方便调试。

如需要了解更完整的 refresh token 交互，可切换到本项目主版本分支`master`，按照说明启动相关服务，在`演示refresh token生效` 功能页下执行查看。

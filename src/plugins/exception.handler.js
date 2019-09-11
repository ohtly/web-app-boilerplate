import Vue from 'vue';

import { logger } from '@/services/log.service';

// vue 实例内，同步异常捕获
Vue.config.errorHandler = (err, vm, info) => {
    console.log(`vue error handler..`)
    logger.logToServer({ err, vm, info });
    return true
};

// 浏览器默认异常处理，可处理运行时同步和异步(timeout)的异常
window.onerror = function (message, source, lineno, colno, error) {
    logger.logToServer({ message, source, lineno, colno, error });
    return true
};

// 捕获 promise 错误事件
window.addEventListener("unhandledrejection", function (event) {
    logger.logToServer({ event })
    event.preventDefault();
});

// 资源加载错误事件的捕获，如图片加载
document.addEventListener('error', (event) => {
    logger.logToServer({ event })
    event.preventDefault();
}, true)
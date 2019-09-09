import Vue from 'vue';

import { logger } from '@/services/log.service';

Vue.config.errorHandler = (err, vm, info) => {
    console.log(`vue error handler..`)
    logger.logToServer({ err, vm, info });
    return true
};

window.onerror = function (message, source, lineno, colno, error) {
    logger.logToServer({ message, source, lineno, colno, error });
    return true
};

window.addEventListener("unhandledrejection", function (event) {
    logger.logToServer({ event })
    event.preventDefault();
});
import { environment } from '@/environment';

class AppLogger {
    constructor() {
        this.initLogger();
    }

    initLogger() {
        if (environment !== 'production') {
            this.log = console.log.bind(console);
            this.debug = console.debug.bind(console);
            this.info = console.info.bind(console);
            this.warn = console.warn.bind(console);
            this.error = console.error.bind(console);
            this.logToServer = this.error
        } else {
            this.log = this.debug = this.info = this.warn = this.error = () => { };
            this.logToServer = err => {
                console.error(err);
                // TODO 提交到服务器（搭建 sentry ）
            };
        }
    }
}

const logger = new AppLogger();

export { logger };
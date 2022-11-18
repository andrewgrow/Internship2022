const morgan = require('morgan');
const logrotate = require('logrotate-stream');
const path = require('path');
const intel = require('intel');

const config = {
    path: path.resolve('./logs'),
    size: '10m',
    keep: 10,
    level: intel.DEBUG,
};

/** Setup Morgan as logger for HTTP requests. Used as a middleware for node.js. */
module.exports = {
    init(app) {
        app.use(morgan('combined', {
            stream: logrotate({
                file: path.join(config.path, 'access.log'),
                size: config.size,
                keep: config.keep,
            }),
        }));
    },
};

/** Setup Intel as main logger for application. Used instead standard output via console. */
intel.setLevel(config.level);

const fileFormatter = new intel.Formatter({
    format: '[%(date)s] [%(levelname)s] %(name)s - %(message)s',
});

const consoleFormatter = new intel.Formatter({
    format: '[%(date)s] [%(levelname)s] %(name)s - %(message)s',
    colorize: true,
});

intel.addHandler(new intel.handlers.Console({
    formatter: consoleFormatter,
}));

intel.addHandler(new intel.handlers.Stream({
    stream: logrotate({
        file: path.join(config.path, 'debug.log'),
        size: config.size,
        keep: config.keep,
    }),
    formatter: fileFormatter,
}));

intel.addHandler(new intel.handlers.Stream({
    level: intel.INFO,
    stream: logrotate({
        file: path.join(config.path, 'info.log'),
        size: config.size,
        keep: config.keep,
    }),
    formatter: fileFormatter,
}));

intel.addHandler(new intel.handlers.Stream({
    level: intel.WARN,
    stream: logrotate({
        file: path.join(config.path, 'error.log'),
        size: config.size,
        keep: config.keep,
    }),
    formatter: fileFormatter,
}));

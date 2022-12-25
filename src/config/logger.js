const fs = require('fs');
const morgan = require('morgan');
const logrotate = require('logrotate-stream');
const path = require('path');
const intel = require('intel');

function resolveLogFolder() {
    const logsFolder = path.resolve('./logs');

    if (!fs.existsSync(logsFolder)) {
        fs.mkdirSync(logsFolder);
    }

    return logsFolder;
}

// configuration for all log streams
const config = {
    path: resolveLogFolder(),
    size: '10m',
    keep: 10,
    level: intel.DEBUG,
};

/**
 * The logrotate-stream is library that do easily automate log rotation
 * and make from it a writable stream.
 */
function getLogrotateStream(filename) {
    return logrotate({
        file: path.join(config.path, filename),
        size: config.size,
        keep: config.keep,
    });
}

/**
 * Setup Morgan as logger for HTTP requests. Used as a middleware for node.js.
 */
function enableMorganLogger(app) {
    if (app) {
        app.use(morgan('combined', {
            stream: logrotate({
                // output Morgan's log to file ./logs/access.log
                file: path.join(config.path, 'access.log'),
                size: config.size,
                keep: config.keep,
            }),
        }));
    }
}

/**
 * Setup Intel as main logger for application.
 * Will use as standard output instead a console.log().
 */
function enableIntelLogger() {
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
        stream: getLogrotateStream('debug.log'),
        formatter: fileFormatter,
    }));

    intel.addHandler(new intel.handlers.Stream({
        level: intel.INFO,
        stream: getLogrotateStream('info.log'),
        formatter: fileFormatter,
    }));

    intel.addHandler(new intel.handlers.Stream({
        level: intel.WARN,
        stream: getLogrotateStream('error.log'),
        formatter: fileFormatter,
    }));
}

module.exports = {
    init(app) {
        enableMorganLogger(app);
        enableIntelLogger();
    },
};

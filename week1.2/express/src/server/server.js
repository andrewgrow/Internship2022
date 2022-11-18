const express = require('express');
const middleware = require('../config/middleware');
const router = require('../config/router');
const setupLoggers = require('../config/logger');

const app = express();

setupLoggers.init(app);

middleware.init(app);

router.init(app);

app.set('port', process.env.PORT || 3000);
module.exports = app;
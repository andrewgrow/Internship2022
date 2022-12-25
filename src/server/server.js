const express = require('express');
const middleware = require('../config/middleware');
const router = require('../config/router');
const setupLoggers = require('../config/logger');
const db = require('../config/mongoConnection');
const swagger = require('../config/swagger');

const app = express();

setupLoggers.init(app);
middleware.init(app);
router.init(app);
swagger.init(app);
/* eslint-disable no-console */
db.init().catch((e) => console.error(e));
app.set('port', process.env.PORT || 3000);

module.exports = app;

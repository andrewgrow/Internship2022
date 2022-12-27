const express = require('express');
const path = require('path');
const middleware = require('../config/middleware');
const router = require('../config/router');
const setupLoggers = require('../config/logger');
const db = require('../config/mongoConnection');
const swagger = require('../config/swagger');

require('dotenv').config({ path: path.resolve(path.join(__dirname, '../..', '.env')) });

const app = express();

setupLoggers.init(app);
middleware.init(app);
swagger.init(app);
router.init(app);
/* eslint-disable no-console */
db.init().catch((e) => console.error(e));
app.set('port', process.env.PORT || 3000);

module.exports = app;

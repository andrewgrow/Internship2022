const path = require('path');

require('dotenv').config({ path: path.resolve(path.join(__dirname, '../..', '.env')) });

const http = require('http');

const server = require('./server');
const events = require('./events');

const PORT = server.get('port');

events.bind(http.createServer(server).listen(PORT));

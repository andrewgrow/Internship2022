const logger = require('intel').getLogger('Server|Events');

function onListening() {
    const address = this.address();

    logger.info(`Server listening on ${address.port}`);
}

function bind(Server) {
    Server.on('listening', this.onListening.bind(Server));
}

module.exports = {
    bind,
    onListening,
};

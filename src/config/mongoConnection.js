const mongoose = require('mongoose');
const logger = require('intel').getLogger('Config|MongoConnection');

async function init() {
    const conn = {
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DB_DATABASE_NAME,
    };

    try {
        initListeners();
        await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`, conn);
    } catch (error) {
        logger.error(error);
    }
}

function initListeners() {
    const db = mongoose.connection;
    db.once('connected', () => logger.info('db connected'));
    db.once('open', () => logger.info('db opened'));
    db.on('error', err => {
        logger.error(err);
    });
}

module.exports = { init };

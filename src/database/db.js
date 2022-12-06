const mongoose = require('mongoose');

async function init() {
    const conn = {
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DB_DATABASE_NAME,
    };

    return mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`, conn);
}

/**
 * Insert one record to the Database. e.g.:
 * const connection = mongoose.connection;
 * connection
 *     .collection('myCollectionName')
 *     .insertOne({ "address": { "city": "Marsel", "zip": "321" }, "name": "Helga", "phone": "4321" });
 * @param collection
 * @param object
 */
/* eslint-disable no-unused-vars */
function insertOne(collection, object) {
    const { connection } = mongoose;

    connection
        .collection('myCollectionName')
        .insertOne({ address: { city: 'Marsel', zip: '321' }, name: 'Helga', phone: '4321' });
}

module.exports = { init, insertOne };

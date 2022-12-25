const path = require('path');
const dotEnvConfig = require('dotenv');

dotEnvConfig.config({ path: path.resolve('../..', '.env') });

const config = {
    mongodb: {
        url: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`,

        databaseName: process.env.DB_DATABASE_NAME,

        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },

    migrationsDir: 'migrations',

    changelogCollectionName: 'changelog',

    migrationFileExtension: '.js',

    useFileHash: false,

    moduleSystem: 'commonjs',

};

module.exports = config;

const logger = require('intel').getLogger('Users|service');

function update(userId) {
    const resultMessage = `User ${userId} updated successful.`;

    logger.info(resultMessage);

    return {
        message: resultMessage,
    };
}

function find(userId) {
    const resultMessage = `Found user with id ${userId}`;

    logger.info(resultMessage);

    return {
        message: resultMessage,
    };
}

function destroy(userId) {
    const resultMessage = `Deleted user with id ${userId}`;

    logger.info(resultMessage);

    return {
        message: `Deleted user with id ${userId}`,
    };
}

function create() {
    const resultMessage = 'User created successful';

    logger.info(resultMessage);

    return {
        message: 'User created successful',
    };
}

module.exports = {
    create,
    find,
    destroy,
    update,
};

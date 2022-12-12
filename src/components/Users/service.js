const logger = require('intel').getLogger('Users|service');
const { User } = require('./model');

function patch(userId) {
    if (Number.isNaN(userId)) throw new Error('UserId must be a number');
    const resultMessage = `User ${userId} patched successful.`;

    logger.info(resultMessage);

    return {
        message: resultMessage,
    };
}

function find(userId) {
    if (Number.isNaN(userId)) throw new Error('UserId must be a number');
    const resultMessage = `Found user with id ${userId}`;

    logger.info(resultMessage);

    return {
        message: resultMessage,
    };
}

function destroy(userId) {
    if (Number.isNaN(userId)) throw new Error('UserId must be a number');
    const resultMessage = `Deleted user with id ${userId}`;

    logger.info(resultMessage);

    return {
        message: `Deleted user with id ${userId}`,
    };
}

async function create(dataTransferObject) {
    try {
        const user = new User(dataTransferObject);
        await user.validate(); // if validation false will throw error
        const result = await user.save();
        logger.info('User created successful. Data:', result);
        return result;
    } catch (error) {
        if (error.code === 11000) {
            error.message = 'Your email already registered. Try to login with it.'
        }
        throw error;
    }
}

module.exports = {
    create,
    find,
    destroy,
    patch,
};

const logger = require('intel').getLogger('Users|service');
const { User } = require('./model');

async function patch(user, data) {
    const userDb = await User.findById(user._id);
    if (userDb === null) {
        throw new Error(`User with id ${user._id} not found for patching!`);
    }
    if (data.firstName) {
        userDb.firstName = data.firstName;
    }
    if (data.lastName) {
        userDb.lastName = data.lastName;
    }
    if (data.email) {
        userDb.email = data.email;
    }
    if (data.password) {
        userDb.password = data.password;
    }

    const result = await userDb.save();
    return result;
}

async function find(user) {
    const result = await User.findById(user._id);
    if (result === null) {
        throw new Error(`User with id ${user._id} not found!`);
    }
    delete result._doc.password;
    return result;
}

async function destroy(user) {
    const result = await User.findByIdAndDelete(user._id);
    if (result === null) {
        throw new Error('User account not found for deleting!');
    }

    logger.debug('User destroyed!', result);

    return {
        message: `Your account has been deleted. Good bye!`,
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

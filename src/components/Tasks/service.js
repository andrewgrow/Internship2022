const logger = require('intel').getLogger('Tasks|Service');
const { Task } = require('./model');

async function create(user, dataTransferObject) {
    try {
        const task = new Task(dataTransferObject);

        // Note: this is a magic method that will be generated task by itself!
        task.setDefaultValues(user._id);

        await task.validate(); // if validation false will throw error
        const result = await task.save();

        logger.info('Task created successful. Data:', result);

        return result;
    } catch (error) {
        logger.error('Task creating error:', error);
        throw error;
    }
}
async function patch(task, data) {
    // const userDb = await User.findById(user._id);
    //
    // if (userDb === null) {
    //     throw new Error(`User with id ${user._id} not found for patching!`);
    // }
    // if (data.firstName) {
    //     userDb.firstName = data.firstName;
    // }
    // if (data.lastName) {
    //     userDb.lastName = data.lastName;
    // }
    // if (data.email) {
    //     userDb.email = data.email;
    // }
    // if (data.password) {
    //     userDb.password = data.password;
    // }
    //
    // const result = await userDb.save();
    //
    // return result;
}

async function find(id) {
    // const result = await User.findById(user._id);
    //
    // if (result === null) {
    //     throw new Error(`User with id ${user._id} not found!`);
    // }
    // delete result._doc.password;
    //
    // return result;
}

async function destroy(id) {
    // const result = await User.findByIdAndDelete(user._id);
    //
    // if (result === null) {
    //     throw new Error('User account not found for deleting!');
    // }
    //
    // logger.debug('User destroyed!', result);
    //
    // return {
    //     message: 'Your account has been deleted. Good bye!',
    // };
}

module.exports = {
    create,
    find,
    destroy,
    patch,
};

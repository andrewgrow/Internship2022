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
async function patch(id, data) {
    try {
        const taskDb = await Task.findById(id);

        if (taskDb === null) {
            throw new Error(`Task with id ${id} not found for patching!`);
        }
        taskDb.estimatedTime = data.estimatedTime;
        await taskDb.validate(); // if validation false will throw error

        const result = await taskDb.save();

        logger.info('Task patched successful. Data:', result);

        return result;
    } catch (error) {
        logger.error('Task patching error:', error);
        throw error;
    }
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

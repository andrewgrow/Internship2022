const logger = require('intel').getLogger('Tasks|Service');
const { Task } = require('./model');
const limitPerPage = 5;

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

async function getUserTasksPerPage(userId, page) {
    const tasks = await Task.where('assignee', userId).limit(limitPerPage).skip(page * limitPerPage);
    const count = await Task.where('assignee', userId).count();

    return {
        tasks: tasks,
        totalTasks: count,
    }
}

async function destroy(id) {
    const result = await Task.findByIdAndDelete(id);

    if (result === null) {
        throw new Error('Task not found for deleting!');
    }

    logger.debug('Task destroyed!', result);

    return {
        message: `Task with id ${id} has been deleted.`,
    };
}

module.exports = {
    create,
    getUserTasksPerPage,
    destroy,
    patch,
};

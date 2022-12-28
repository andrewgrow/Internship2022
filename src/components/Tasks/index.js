const logger = require('intel').getLogger('Tasks|Controller');
const TasksService = require('./service');
const Security = require('../../config/security');

async function create(req, res) {
    try {
        const user = Security.getDataFromAuthToken(req).userData;
        const createdTask = await TasksService.create(user, req.body);

        return res.status(201).json({
            data: createdTask,
        });
    } catch (error) {
        return res.status(422).json({
            error: error.message,
        });
    }
}

async function getTasksPerPage(req, res) {
    try {
        const userId = Security.getDataFromAuthToken(req).userData._id;
        const page = req.query.page ?? 0;
        const result = await TasksService.getUserTasksPerPage(userId, page);

        return res.status(200).json({ data: result });
    } catch (error) {
        logger.error(error);

        return res.status(500).json({
            error: error.message,
        });
    }
}

async function getAll(req, res) {
    try {
        const user = Security.getDataFromAuthToken(req).userData;
        const result = await TasksService.getAllUserTasks(user);

        return res.status(200).json({ data: result });
    } catch (error) {
        logger.error(error);

        return res.status(500).json({
            error: error.message,
        });
    }
}

async function destroy(req, res) {
    try {
        const result = await TasksService.destroy(req.params.id);

        return res.status(200).json({
            data: result,
        });
    } catch (error) {
        if (process.env.ENV !== 'test') {
            logger.error(error);
        }

        return res.status(500).json({
            error: error.message,
        });
    }
}

async function patch(req, res) {
    try {
        const result = await TasksService.patch(req.params.id, req.body);

        return res.status(200).json({
            data: result,
        });
    } catch (error) {
        if (process.env.ENV !== 'test') {
            logger.error(error);
        }

        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

module.exports = {
    create,
    getTasksPerPage,
    getAll,
    destroy,
    patch,
};

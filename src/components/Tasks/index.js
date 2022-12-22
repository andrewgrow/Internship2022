const logger = require('intel').getLogger('Tasks|Controller');
const TasksService = require('./service');
const Security = require('../../config/security');

async function create(req, res) {
    try {
        const createdTask = await TasksService.create(req.body);

        return res.status(201).json({
            data: createdTask,
        });
    } catch (error) {
        return res.status(422).json({
            error: error.message,
        });
    }
}

async function get(req, res) {
    // try {
    //     const user = Security.getDataFromAuthToken(req).userData;
    //     const result = await TasksService.find(user);
    //
    //     return res.status(200).json({
    //         data: result,
    //     });
    // } catch (error) {
    //     logger.error(error);
    //
    //     return res.status(500).json({
    //         error: error.message,
    //         details: null,
    //     });
    // }
    return res.status(200).json({
        data: 'the task has been found',
    });
}

async function getAll(req, res) {
    // try {
    //     const user = Security.getDataFromAuthToken(req).userData;
    //     const result = await TasksService.find(user);
    //
    //     return res.status(200).json({
    //         data: result,
    //     });
    // } catch (error) {
    //     logger.error(error);
    //
    //     return res.status(500).json({
    //         error: error.message,
    //         details: null,
    //     });
    // }
    return res.status(200).json({
        data: 'the tasks have been found',
    });
}

async function destroy(req, res) {
    // try {
    //     const user = Security.getDataFromAuthToken(req).userData;
    //     const result = await TasksService.destroy(user);
    //
    //     return res.status(200).json({
    //         data: result,
    //     });
    // } catch (error) {
    //     logger.error(error);
    //
    //     return res.status(500).json({
    //         error: error.message,
    //         details: null,
    //     });
    // }
    return res.status(200).json({
        data: 'the task has been destroyed',
    });
}

async function patch(req, res) {
    // try {
    //     const user = Security.getDataFromAuthToken(req).userData;
    //     const result = await TasksService.patch(user, req.body);
    //
    //     return res.status(200).json({
    //         data: result,
    //     });
    // } catch (error) {
    //     logger.error(error);
    //
    //     return res.status(500).json({
    //         error: error.message,
    //         details: null,
    //     });
    // }
    return res.status(200).json({
        data: 'the task has been patched',
    });
}

module.exports = {
    create,
    get,
    getAll,
    destroy,
    patch,
};

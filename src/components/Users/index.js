const logger = require('intel').getLogger('Users|Controller');
const UsersService = require('./service');
const Security = require('../../config/security');

async function create(req, res) {
    try {
        const createdUser = await UsersService.create(req.body);

        return res.status(201).json({
            data: createdUser,
        });
    } catch (error) {
        logger.error(error);

        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

async function find(req, res) {
    try {
        const user = await UsersService.find(+req.params.id);

        return res.status(200).json({
            data: user,
        });
    } catch (error) {
        logger.error(error);

        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

async function destroy(req, res) {
    try {
        const user = Security.getDataFromAuthToken(req).userData;

        if (user) {
            const result = await UsersService.destroy(user);
            return res.status(200).json({
                data: result,
            });
        } else {
            throw new Error('Wrong JWT data');
        }
    } catch (error) {
        logger.error(error);

        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

async function patch(req, res) {
    try {
        const user = await UsersService.patch(+req.params.id);

        return res.status(200).json({
            data: user,
        });
    } catch (error) {
        logger.error(error);

        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

module.exports = {
    create,
    find,
    destroy,
    patch,
};

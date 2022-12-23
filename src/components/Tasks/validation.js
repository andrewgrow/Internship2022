const Joi = require('joi');
const logger = require('intel').getLogger('Tasks|Validation');

const taskId = Joi.string().alphanum().length(24).lowercase()
    .required();
const estimatedTime = Joi.number().positive().min(1).max(40)
    .required();
const pageRequest = Joi.number().min(0).max(100);

const schemaUpdate = Joi.object({
    id: taskId,
    estimatedTime,
});

const schemaDestroy = Joi.object({
    id: taskId,
});

const schemaPage = Joi.object({
    page: pageRequest,
});

function sendErrorOrNext(validationResult, req, res, next) {
    if (validationResult.error) {
        const { message } = validationResult.error;

        logger.error(message);

        return res.status(422).json({ error: message });
    }

    return next();
}

function validatePatch(req, res, next) {
    const requestId = req.param('id');
    const requestTime = req.body.estimatedTime;

    const validationResult = schemaUpdate.validate({ id: requestId, estimatedTime: requestTime });

    return sendErrorOrNext(validationResult, req, res, next);
}

function validateDestroy(req, res, next) {
    const validationResult = schemaDestroy.validate({ id: req.param('id') });

    return sendErrorOrNext(validationResult, req, res, next);
}

function validatePage(req, res, next) {
    const validationResult = schemaPage.validate({ page: req.query.page });

    return sendErrorOrNext(validationResult, req, res, next);
}

module.exports = { validatePatch, validateDestroy, validatePage };

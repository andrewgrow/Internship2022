const Joi = require('joi');
const logger = require('intel').getLogger('Tasks|Validation');

const taskId = Joi.string().alphanum().length(24).lowercase().required();
const estimatedTime = Joi.number().positive().min(1).max(40).required();

const schemaUpdate = Joi.object({
    id: taskId,
    estimatedTime: estimatedTime,
});

function validatePatch(req, res, next) {
    const requestId = req.param('id');
    const requestTime = req.body['estimatedTime'];

    const validationResult = schemaUpdate.validate({id: requestId, estimatedTime: requestTime});

    if (validationResult.error) {
        const { message } = validationResult.error;

        logger.error(message);

        return res.status(422).json({ error: message });
    }

    return next();
}

module.exports = { validatePatch };

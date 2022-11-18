const Joi = require('joi');
const logger = require('intel').getLogger('Users|Validation');

const schemaCreate = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().lowercase().required(),
});

// SchemaUpdate the same values as SchemaCreate for current time. May be changed in the future.
const schemaUpdate = Object.assign(schemaCreate, {});

function check(req, res, next, schema) {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        const message = validationResult.error.message;
        logger.error(message);
        return res.status(422).json({ error: message });
    }
    next();
}

function validateCreate(req, res, next) {
    return check(req, res, next, schemaCreate);
}

function validatePatch(req, res, next) {
    return check(req, res, next, schemaUpdate);
}

module.exports = { validateCreate, validatePatch }

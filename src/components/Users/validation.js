const Joi = require('joi');
const logger = require('intel').getLogger('Users|Validation');

const schemaCreate = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    password: Joi.string().min(8).max(100).required(),
    email: Joi.string().email().min(5).max(100).lowercase().required(),
});

const schemaSignIn = Joi.object({
    password: Joi.string().min(8).max(1024).required(),
    email: Joi.string().email().min(5).max(500).lowercase().required(),
});

// 'schemaUpdate' is the same as 'schemaCreate' for current time.
// May be changed in the future.
const schemaUpdate = Object.assign(schemaCreate, {});

function check(req, res, next, schema) {
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        const { message } = validationResult.error;

        logger.error(message);

        return res.status(422).json({ error: message });
    }

    return next();
}

function validateCreate(req, res, next) {
    return check(req, res, next, schemaCreate);
}

function validatePatch(req, res, next) {
    return check(req, res, next, schemaUpdate);
}

function validateSignIn(req, res, next) {
    return check(req, res, next, schemaSignIn);
}

module.exports = { validateCreate, validatePatch, validateSignIn };

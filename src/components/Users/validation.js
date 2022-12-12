const Joi = require('joi');
const logger = require('intel').getLogger('Users|Validation');

const emailConfig = Joi.string().email().min(5).max(100).lowercase().required();
const passwordConfig = Joi.string().min(8).max(1024).required();
const firstNameConfig = Joi.string();
const lastNameConfig = Joi.string();

const schemaCreate = Joi.object({
    firstName: firstNameConfig,
    lastName: lastNameConfig,
    email: emailConfig,
    password: passwordConfig,
});

const schemaSignIn = Joi.object({
    email: emailConfig,
    password: passwordConfig,
});

const schemaUpdate = Joi.object({
    firstName: firstNameConfig,
    lastName: lastNameConfig,
    email: emailConfig,
});

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

const Joi = require('joi');
const logger = require('intel').getLogger('Users|Validation');

const emailConfig = Joi.string().email().min(5).max(100)
    .lowercase();
const passwordConfig = Joi.string().min(8).max(1024);
const firstNameConfig = Joi.string().min(2).max(20);
const lastNameConfig = Joi.string().min(2).max(20);

const schemaCreate = Joi.object({
    firstName: firstNameConfig.required(),
    lastName: lastNameConfig.required(),
    email: emailConfig.required(),
    password: passwordConfig.required(),
});

const schemaSignIn = Joi.object({
    email: emailConfig.required(),
    password: passwordConfig.required(),
});

const schemaUpdate = Joi.object({
    firstName: firstNameConfig,
    lastName: lastNameConfig,
    email: emailConfig,
    password: passwordConfig,
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

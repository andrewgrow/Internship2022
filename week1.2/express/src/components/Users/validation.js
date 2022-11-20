const Joi = require('joi');
const logger = require('intel').getLogger('Users|Validation');

const schemaCreate = Joi.object({
    /** username allows alphanumeric, not allows commas and allows all other punctuation.
     * @see[https://regex101.com/r/1Q2EcU/2] */
    username: Joi.string().regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/).min(3).max(50).required(),

    email: Joi.string().email().lowercase().required(),
});

// SchemaUpdate and SchemaSignIn are the same as SchemaCreate for current time.
// May be changed in the future.
const schemaUpdate = Object.assign(schemaCreate, {});
const schemaSignIn = Object.assign(schemaCreate, {});

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

function validateSignIn(req, res, next) {
    return check(req, res, next, schemaSignIn);
}

module.exports = { validateCreate, validatePatch, validateSignIn }

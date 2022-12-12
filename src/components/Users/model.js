const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const logger = require('intel').getLogger('User|Model');

const userDescriptionObject = {
    email: {
        type: String,
        unique: true,
        index: { unique: true },
        required: [true, 'Please enter an email'],
        lowercase: true,
        minlength: 5,
        maxLength: 100,
    },
    firstName: {
        type: String,
        required: [true, 'Please enter a first name'],
        minlength: 2,
        maxLength: 20,
    },
    lastName: {
        type: String,
        required: [true, 'Please enter a last name'],
        minlength: 2,
        maxLength: 20,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 8,
        maxLength: 1024,
    },
    created_at: { type: Date, default: Date.now },
};

const userSchema = new mongoose.Schema(userDescriptionObject);

/**
 * Middleware that will be called before save.
 */
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    user.password = await bcrypt.hash(user.password, 8);
    logger.debug('try to save user!', user);
    next();
});

/**
 * Middleware that will be called after save.
 */
userSchema.post('save', function(doc, next) {
    delete doc._doc.password;
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = { User };

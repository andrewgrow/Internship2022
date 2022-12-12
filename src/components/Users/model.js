const mongoose = require('mongoose');

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
    firstName: 'string',
    lastName: 'string',
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 8,
        maxLength: 1024,
    },
    created_at: { type: Date, default: Date.now },
};

const userSchema = new mongoose.Schema(userDescriptionObject);

const User = mongoose.model('User', userSchema);

module.exports = { User };

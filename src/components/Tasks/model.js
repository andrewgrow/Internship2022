const mongoose = require('mongoose');
const logger = require('intel').getLogger('Tasks|Model');

const taskDescriptionObject = {
    assignee: {
        type: String,
        index: true,
        required: [true, 'Please enter an assignee.'],
        length: [24, 'User ID that assignee this task must be 24 characters.'],
    },
    createdBy: {
        type: String,
        required: [true, 'Please enter name who created this task.'],
        minlength: 2,
        maxLength: [2000, 'Too long a name of creator. Can write more shortly?'],
    },
    title: {
        type: String,
        required: [true, 'Each task must have a title.'],
        minlength: 5,
        maxLength: [200, 'Too long title. Can write more shortly?'],
    },
    description: {
        type: String,
        required: false,
        minlength: 0,
        maxLength: [2000, 'Too long description. Can write more shortly?'],
    },
    estimatedTime: {
        type: Number,
        required: [true, 'Please enter an estimated time.'],
        min: [1, 'There are no tasks less than 1 hour.'],
        max: [40, 'There are no tasks more than 40 hour.'],
    },
    createdAt: { type: Date, default: Date.now },
};

const taskSchema = new mongoose.Schema(taskDescriptionObject);

/**
 * Middleware that will be called after save.
 */
/* eslint-disable no-param-reassign */
taskSchema.post('save', (doc, next) => {
    logger.info('Saved task:', doc);
    next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = { Task };

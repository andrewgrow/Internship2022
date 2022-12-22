const express = require('express');
const http = require('http');

// ROUTERS
const UsersRouter = require('../components/Users/router');
const SignInRouter = require('../components/Auth/router');
const TasksRouter = require('../components/Tasks/router');

module.exports = {
    init(app) {
        const router = express.Router();

        app.use('/users', UsersRouter);
        app.use('/sign_in', SignInRouter);
        app.use('/v1/task', TasksRouter);

        app.use((req, res) => {
            res.status(404).send(http.STATUS_CODES[404]);
        });

        app.use(router);
    },
};
const { Router } = require('express');
const logger = require('intel').getLogger('Tasks|Router');
const validation = require('./validation');
const TasksComponent = require('./index');

const path = '/v1/task';

const router = Router();

router.use((req, res, next) => {
    // e.g.  GET /v1/task HEADERS: {"user-agent":"Postman","accept":"*/*"} BODY: {} PARAMS:  {}
    logger.debug(req.method, `${path}${req.path}`, 'HEADERS:', req.headers, 'BODY:', req.body, 'PARAMS:', req.params);
    next();
});

router.get('/:id', TasksComponent.get); // GET http://localhost:3000/v1/task/:id getting some task
router.get('/', TasksComponent.getAll); // GET http://localhost:3000/v1/task getting all tasks
router.post('/', TasksComponent.create); // POST http://localhost:3000/v1/task create one or bulk tasks
router.patch('/:id', validation.validatePatch, TasksComponent.patch); // PATCH http://localhost:3000/v1/task
router.delete('/:id', TasksComponent.destroy); // DELETE http://localhost:3000/v1/task

module.exports = router;

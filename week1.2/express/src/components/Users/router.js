const { Router } = require('express');
const logger = require('intel').getLogger('Users|Router');
const UsersComponent = require('./index');

const path = '/users';

const router = Router();

router.use((req, res, next) => {
    // e.g.  GET /users/1 HEADERS: {"user-agent":"Postman","accept":"*/*"} BODY: {} PARAMS:  {}
    logger.debug(req.method, `${path}${req.path}`, 'HEADERS:', req.headers, 'BODY:', req.body, 'PARAMS:', req.params,);
    next();
});

router.get('/:id', UsersComponent.find); // GET http://localhost:3000/users/1
router.post('/', UsersComponent.create); // POST http://localhost:3000/users
router.patch('/:id', UsersComponent.update); // PATCH http://localhost:3000/users/1
router.delete('/:id', UsersComponent.destroy); // DELETE http://localhost:3000/users/1

module.exports = router;

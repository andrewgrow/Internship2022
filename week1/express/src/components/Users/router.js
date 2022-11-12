const { Router } = require('express');
const UsersComponent = require('./index');

const router = Router();

router.get('/:id', UsersComponent.find); // GET http://localhost:3000/users/1
router.post('/', UsersComponent.create); // POST http://localhost:3000/users
router.patch('/:id', UsersComponent.update); // PATCH http://localhost:3000/users/1
router.delete('/:id', UsersComponent.destroy); // DELETE http://localhost:3000/users/1

module.exports = router;

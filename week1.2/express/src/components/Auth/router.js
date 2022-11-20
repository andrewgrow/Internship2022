const { Router } = require('express');
const logger = require('intel').getLogger('Auth|Router');
const AuthComponent = require('./index');
const UserValidation = require('../Users/validation');

const router = Router();

router.use((req, res, next) => {
    // e.g.  POST /sign_in HEADERS: {"user-agent":"Postman","accept":"*/*"} BODY: {} PARAMS:  {}
    logger.debug(req.method, `${req.path}`, 'HEADERS:', req.headers, 'BODY:', req.body, 'PARAMS:', req.params);
    next();
});

router.post('/', UserValidation.validateSignIn, AuthComponent.signIn); // POST http://localhost:3000/sign_in


module.exports = router;

const logger = require('intel').getLogger('Auth|Component');
const Security = require('../../config/security');

function signIn(req, res) {
    const data = req.body;

    logger.debug('signIn data:', data);
    const jwtData = Security.generateJwtToken(data);

    return res.status(200).json({
        message: "Authorization successful. Use 'Authorization: Bearer $jwt_data' for your request headers.",
        jwt_data: jwtData,
    });
}

module.exports = { signIn };

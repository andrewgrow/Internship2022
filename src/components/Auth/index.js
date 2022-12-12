const logger = require('intel').getLogger('Auth|Component');
const Security = require('../../config/security');
const { User } = require('../Users/model');

async function signIn(req, res) {
    const data = req.body;

    logger.debug('signIn data:', data);

    try {
        const user = await User.findOne({ email: data.email });
        if (user === null) {
            throw new Error('Email is wrong!');
        }
        const isPasswordMatch = await Security.isEncryptedPasswordMatch(user.password, data.password);
        if (isPasswordMatch) {
            const jwtData = Security.generateJwtToken(user);

            return res.status(200).json({
                message: "Authorization successful. Use 'Authorization: Bearer $jwt_data' for your request headers.",
                jwt_data: jwtData,
            });
        } else {
            throw new Error('Password is wrong!');
        }
    } catch (error) {
        logger.error(error);
        return res.status(403).json({ error: error.message });
    }
}

module.exports = { signIn };

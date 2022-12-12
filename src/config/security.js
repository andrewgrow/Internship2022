const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const logger = require('intel').getLogger('Security|Class');

const config = {
    secretKey: process.env.SECRET_KEY,
    jwtExpiration: 3600, // 3600 is 1 hour
};

const publicPages = new Map();
publicPages.set('/', 'GET');
publicPages.set('/favicon.ico', 'GET');
publicPages.set('/users', 'POST');
publicPages.set('/sign_in', 'POST');

function isPublicAccess(requestPath, method) {
    return publicPages.has(requestPath) && publicPages.get(requestPath) === method;
}

class Security {
    static generateJwtToken(userData) {
        if (userData.password) delete userData._doc.password;

        return jwt.sign(
            { userData },
            Security.getPrivateKey(),
            { algorithm: 'RS256', expiresIn: config.jwtExpiration },
        );
    }

    static jwtVerification() {
        return (req, res, next) => {
            if (!isPublicAccess(req.path, req.method)) {
                try {
                    const token = (req.headers.authorization || '').replace(/^Bearer /, '');

                    logger.debug(req.headers);
                    const data = jwt.verify(token, Security.getPublicKey());

                    logger.info('jwt decoded data:', data);
                } catch (err) {
                    return res.status(401).json({ error: err.message });
                }
            }

            return next();
        };
    }

    static getPrivateKey() {
        const privateKeyPath = path.resolve(path.join(__dirname, '/certs', 'server_certificate.pem'));

        if (!fs.existsSync(privateKeyPath)) {
            // - Create a private certificate:
            // ssh-keygen -t rsa -b 4096 -m PEM -q -N "" -f server_certificate.pem
            throw new Error('You have to create public certificate. See README_CERTIFICATE.md.');
        }

        return fs.readFileSync(privateKeyPath, 'utf8');
    }

    static getPublicKey() {
        const publicKeyPath = path.resolve(path.join(__dirname, '/certs', 'server_certificate.pem.pub'));

        if (!fs.existsSync(publicKeyPath)) {
            // Create a public certificate:
            // openssl rsa -in server_certificate.pem -pubout -outform PEM -out server_certificate.pem.pub
            throw new Error('You have to create public certificate. See README_CERTIFICATE.md.');
        }

        return fs.readFileSync(publicKeyPath, 'utf8');
    }

    static async isEncryptedPasswordMatch(encryptedPassword, plainTextPassword) {
        const result = await bcrypt.compare(plainTextPassword, encryptedPassword);
        return result;
    }
}

module.exports = Security;

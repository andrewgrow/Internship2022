const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const logger = require('intel').getLogger('Security|Class');

const publicPages = ['/', '/favicon.ico', '/sign_in'];

function isPublicAccess(path) {
    return publicPages.includes(path);
}

class Security {
    static generateJwtToken(userData) {
        return jwt.sign(
            { userData },
            config.privateKey,
            { algorithm: 'RS256', expiresIn: config.jwtExpiration },
        );
    }

    static jwtVerification() {
        return (req, res, next) => {
            if (isPublicAccess(req.path)) {
                return next();
            }
            try {
                let token = (req.headers['authorization'] || '').replace(/^Bearer /, '');
                logger.debug(req.headers);
                let data = jwt.verify(token, config.publicKey);
                logger.info('jwt decoded data:', data);
                next();
            } catch (err) {
                return res.status(401).json({ error: err.message });
            }
        };
    }

    static getPrivateKey() {
        const privateKeyPath = path.resolve(path.join(__dirname, '/certs', 'server_certificate.pem'));
        if (!fs.existsSync(privateKeyPath)) {
            // - Create a private certificate:
            // ssh-keygen -t rsa -b 4096 -m PEM -q -N "" -f server_certificate.pem
            throw new Error('You have to create public certificate. See README_CERTIFICATE.md.')
        }
        return fs.readFileSync(privateKeyPath, 'utf8');
    }

    static getPublicKey() {
        const publicKeyPath = path.resolve(path.join(__dirname, '/certs', 'server_certificate.pem.pub'));
        if (!fs.existsSync(publicKeyPath)) {
            // Create a public certificate:
            // openssl rsa -in server_certificate.pem -pubout -outform PEM -out server_certificate.pem.pub
            throw new Error('You have to create public certificate. See README_CERTIFICATE.md.')
        }
        return fs.readFileSync(publicKeyPath, 'utf8');
    }
}

const config = {
    secretKey: process.env.SECRET_KEY,
    jwtExpiration: 3600, // 3600 is 1 hour
    privateKey: Security.getPrivateKey(),
    publicKey: Security.getPublicKey(),
}

module.exports = Security;

const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {uid};

        // Generar JWT
        jwt.sign(payload, process.env.SECRET_OR_PRIVATE_KEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = {
    generateJWT,
}
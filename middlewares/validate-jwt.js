const jwt = require('jsonwebtoken');
const {User} = require('../models');

const validateJWT = async (req, res, next) => {
    const token = req.header('x-token');

    if (!token) return res.status(401).json({msg: 'No hay token en la petición'});

    try {
        const {uid} = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);

        // Leer usuario que corresponde al UID
        const user = await User.findByPk(uid);

        // Verifica si USUARIO existe en la DB
        if (!user) return res.status(401).json({msg: 'Token no válido - usuario no existe en DB'});

        // Verifica si STATE de USER es TRUE
        if (!user.state) return res.status(401).json({msg: 'Token no válido - usuario con state false'});

        req.user = user;

        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({
            msg: 'Token no válido - hablé con el administrador'
        })
    }
}

module.exports = {
    validateJWT
}
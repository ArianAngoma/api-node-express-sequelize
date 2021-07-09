const bcryptjs = require('bcryptjs');
const {User} = require('../models');
const {generateJWT} = require('../helpers');

const signIn = async (req, res) => {
    const {email, password} = req.body;
    try {
        // Verificar contraseña
        const user = await User.findOne({where: {email}});
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) return res.status(400).json({msg: 'Usuario / Password no son correctos - password'});

        // Generar JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    signIn
}
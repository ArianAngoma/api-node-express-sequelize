const bcryptjs = require('bcryptjs');
const {User} = require('../models');
const {generateJWT, googleVerify} = require('../helpers');

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

const googleSignIn = async (req, res) => {
    const {id_token} = req.body;

    try {
        // Verificar id token de Google
        const {name, email, img} = await googleVerify(id_token);
        let user = await User.findOne({
            where: {
                email
            }
        })

        // Crear USER si no existe
        if (!user) {
            const data = {
                name,
                email,
                img,
                roleId: 2,
                google: true,
                password: ':P'
            }

            user = await User.create(data);
        }

        // Si el usuario en DB no existe - state: false
        if (!user.state) return res.state(401).json({msg: 'Hable con administrador - usuario bloqueado'});

        // Generar JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })
    } catch (err) {
        res.status(400).json({msg: 'Token de Google no es válido'})
    }

}

module.exports = {
    signIn,
    googleSignIn
}
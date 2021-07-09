const {Role} = require('../models');

const isAdminRole = async (req, res, next) => {
    if (!req.user) return res.status(500).json({msg: 'Verificar el token primero'});
    console.log(req.user);
    const {name: userName, roleId} = req.user;

    const {name} = await Role.findByPk(roleId);

    // Valida si USER es ADMIN
    if (name !== 'ADMIN') return res.status(401).json({msg: `${userName} no es administrador - no puede hacer esto`});

    next();
}

module.exports = {
    isAdminRole
}
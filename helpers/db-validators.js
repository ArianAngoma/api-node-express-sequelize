const {Role, User} = require('../models');

// roles => Valida si existe ROLE por ID en la DB
const roleExistsById = async (id) => {
    const existsRole = await Role.findOne({where: {id}});
    if (!existsRole) throw new Error(`El rol con id ${id} no existe`);
}

// roles => Valida si existe role por nombre en la DB
const roleExistsByName = async (name, {req}) => {
    name = name.toUpperCase();
    const existsRole = await Role.findOne({where: {name}});
    if ((existsRole) && (existsRole.id !== Number(req.params.id))) throw new Error(`El rol ${name} ya esta registrado en la DB`);
}

// users => Valida si existe USER por EMAIL en la DB
const userExistsByEmail = async (email, {req}) => {
    const existsEmail = await User.findOne({where: {email}});
    if ((existsEmail) && (existsEmail.id !== Number(req.params.id))) throw new Error(`El usuario con email ${email} ya esta registrado en la DB`);
}

module.exports = {
    roleExistsById,
    roleExistsByName,
    userExistsByEmail
}
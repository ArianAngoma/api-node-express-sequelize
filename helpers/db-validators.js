const {Role, User, Category} = require('../models');

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

// users => Valida si existe USER por EMAIL en la DB para la ruta de Auth
const userExistsByEmailAuth = async (email) => {
    const existsEmail = await User.findOne({where: {email}});
    if (!existsEmail) throw new Error(`El usuario con email ${email} no existe en la DB`);
}

// users => Valida si existe USER por ID en la DB
const userExistsById = async (id) => {
    const existsUser = await User.findByPk(id);
    if (!existsUser) throw new Error(`El usuario con id ${id} no existe`);
}

// users = Valida si STATE de USER es TRUE por ID
const isStateUserTrueById = async (id) => {
    const {state} = await User.findByPk(id);
    if (!state) throw new Error(`El usuario con id ${id} no existe - state: false`);
}

// users => Valida si STATE de USER es TRUE por EMAIL
const isStateUserTrueByEmail = async (email) => {
    const {state} = await User.findOne({where: {email}});
    if (!state) throw new Error(`El usuario con ${email} no existe - state: false`);
}

// categories => Valida si existe CATEGORIA por NAME
const existsCategoryByName = async (name) => {
    const existsCategory = await Category.findAll({where: {name: name.toUpperCase()}});
    if (existsCategory) existsCategory.forEach(categories => {
        if (categories.state) throw new Error(`La categoria ${name} ya existe en la DB`);
    });
}

module.exports = {
    roleExistsById,
    roleExistsByName,
    userExistsByEmail,
    userExistsByEmailAuth,
    userExistsById,
    isStateUserTrueById,
    isStateUserTrueByEmail,
    existsCategoryByName
}
const {Role, User, Category, Product} = require('../models');

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
const existsCategoryByName = async (name, {req}) => {
    const existsCategory = await Category.findOne({where: {name: name.toUpperCase(), state: true}});
    if ((existsCategory) && (existsCategory.id !== Number(req.params.id))) throw new Error(`La categoria ${name} ya existe en la DB`);
}

// categories => Valida si existe CATEGORIA por ID
const existsCategoryById = async (id) => {
    const existsCategory = await Category.findByPk(id);
    if (!existsCategory) throw new Error(`La categoria con id ${id} no existe`);
}

// categories => Valida si STATE de CATEGORY es TRUE por ID
const isStateCategoryTrueById = async (id) => {
    const {state} = await Category.findByPk(id);
    if (!state) throw new Error(`La categoria con id ${id} no existe - state: false`);
}

// products => Valida si existe PRODUCT y es el mismo USUER quien lo creó
const existsProductByNameAndIdUser = async (name, {req}) => {
    const existsProduct = await Product.findOne({where: {name: name.toUpperCase(), state: true, userId: req.user.id}});
    if (existsProduct) throw new Error(`El producto ${name} ya esta registrado en la DB`);
}


module.exports = {
    roleExistsById,
    roleExistsByName,
    userExistsByEmail,
    userExistsByEmailAuth,
    userExistsById,
    isStateUserTrueById,
    isStateUserTrueByEmail,
    existsCategoryByName,
    existsCategoryById,
    isStateCategoryTrueById,
    existsProductByNameAndIdUser
}
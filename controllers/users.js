const {User, Role} = require('../models');
const bcryptjs = require('bcryptjs');

const getUser = async (req, res) => {
    const {limit = 5, from = 0} = req.query;

    const {count, rows} = await User.findAndCountAll({
        // Obtener todos los USUARIOS con STATE TRUE
        where: {
          state: true
        },
        // Excluir roleId
        // attributes: {exclude: ['roleId']},
        include: [
            {model: Role}
        ],
        offset: Number(from),
        limit: Number(limit)
    })
    res.json({
        count,
        users: rows
    });
}

const getUserById = async (req, res) => {
    const {id} = req.params;
    const user = await User.findByPk(id, {
        include: [
            {model: Role}
        ]
    });
    res.json(user);
}

const createUser = async (req, res) => {
    const {name, email, password, roleId} = req.body;
    const user = await User.create({name, email, password, roleId});

    const {id, name: nameRole} = await user.getRole();

    user.dataValues.role = {
        id,
        nameRole
    }

    res.json(user);
}

const updateUser = async (req, res) => {
    const _id = req.params.id;
    const {id, password, google, state, ...info} = req.body;

    // Si el usuario quiere actualizar su password
    if (password) {
        console.log('Quiero editar mi constraseña')
        info.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync())
    }

    const user = await User.findByPk(_id);
    await user.update(info);

    res.json(user);
}

module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUser
}
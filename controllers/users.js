const {User, Role} = require('../models');

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

module.exports = {
    getUser,
    createUser
}
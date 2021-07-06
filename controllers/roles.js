const {Role} = require('../models');

const getRoles = async (req, res) => {
    const {limit = 5, from = 0} = req.query;

    const {count, rows} = await Role.findAndCountAll({
        offset: Number(from),
        limit: Number(limit)
    })

    res.json({
        count,
        roles: rows
    })
}

const getRoleById = async (req, res) => {
    const {id} = req.params;
    const role = await Role.findOne({where: {id}});
    res.json(role);
}

const createRole = async (req, res) => {
    const {name} = req.body;
    const role = await Role.create({name});
    res.json(role);
}

const updateRole = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const role = await Role.findByPk(id);
    await role.update({name});
    res.json(role);
}

const deleteRole = async (req, res) => {
    const {id} = req.params;
    const role = await Role.destroy({where: {id}});
    res.json(role);
}

module.exports = {
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
}
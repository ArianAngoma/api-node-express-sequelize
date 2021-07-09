const {Category, User} = require('../models');

const getCategories = async (req, res) => {
    const {limit = 5, from = 0} = req.query;

    const {count, rows} = await Category.findAndCountAll({
        where: {
            state: true
        },
        include: [
            {model: User}
        ],
        offset: Number(from),
        limit: Number(limit)
    })

    res.json({
        count,
        categories: rows
    });
}

const createCategory = async (req, res) => {
    const {name} = req.body;
    const {id, name: nameUser, email, img} = req.user;
    const category = await Category.create({name, userId: id});
    category.dataValues.user = {
        id,
        nameUser,
        email,
        img
    }
    res.json(category);
}

module.exports = {
    getCategories,
    createCategory
}
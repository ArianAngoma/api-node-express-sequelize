const {Product, User, Category} = require('../models');

const getProducts = async (req, res) => {
    const {limit = 5, from = 0} = req.query;

    const {count, rows} = await Product.findAndCountAll({
        where: {
            state: true
        },
        include: [
            {
                model: User,
                attributes: {exclude: ['password']},
            },
            {
                model: Category
            }
        ],
        offset: Number(from),
        limit: Number(limit)
    })

    res.json({
        count,
        products: rows
    });
}

const getProductById = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByPk(id, {
        include: [
            {
                model: User,
                attributes: {exclude: ['password']},
            },
            {model: Category}
        ],
    });
    res.json(product);
}

const createProduct = async (req, res) => {
    const {state, userId, ...body} = req.body;
    const {id, name, email, img} = req.user;

    const data = {
        ...body,
        userId: id
    }

    const category = await Product.create(data);

    // Agregar datos del USER a la respuesta
    category.dataValues.user = {
        id,
        name,
        email,
        img
    }

    // Agregar datos de la CATEGORY a la respuesta
    const {id: idCategory, name: nameCategory} = await category.getCategory();
    category.dataValues.category = {
        idCategory,
        nameCategory
    }

    res.json(category);
}

module.exports = {
    createProduct,
    getProductById,
    getProducts
}
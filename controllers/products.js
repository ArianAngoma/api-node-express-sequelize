const {Product} = require('../models');

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
    createProduct
}
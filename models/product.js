const {DataTypes} = require('sequelize');

const {dbConnection} = require('../database/config');

const ProductSchema = dbConnection.define('products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        required: true
    },
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    img: {
        type: DataTypes.STRING
    },
    available: {
        type: DataTypes.INTEGER,
        required: true,
        defaultValue: 1
    },
    state: {
        type: DataTypes.INTEGER,
        required: true,
        defaultValue: 1
    },
}, {
    hooks: {
        beforeCreate(product) {
            product.name = product.name.toUpperCase();
        },
        beforeUpdate(product) {
            product.name = product.name.toUpperCase();
        }
    }
})

module.exports = ProductSchema;
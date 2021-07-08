const {DataTypes} = require('sequelize');

const {dbConnection} = require('../database/config');

const CategorySchema = dbConnection.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        required: true,
        unique: true
    },
    state: {
        type: DataTypes.INTEGER,
        required: true,
        defaultValue: 1
    }
}, {
    hooks: {
        beforeCreate(category) {
            category.name = category.name.toUpperCase();
        },
        beforeUpdate(category) {
            category.name = category.name.toUpperCase();
        }
    }
})

module.exports = CategorySchema;
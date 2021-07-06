const {DataTypes} = require('sequelize');

const {dbConnection} = require('../database/config');

const RoleSchema = dbConnection.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        required: true,
        unique: true
    }
}, {
    hooks: {
        beforeCreate(role) {
            role.name = role.name.toUpperCase();
        },
        beforeUpdate(role) {
            role.name = role.name.toUpperCase();
        }
    }
})

module.exports = RoleSchema;
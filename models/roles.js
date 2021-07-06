const {DataTypes} = require('sequelize');

const {dbConnection} = require('../database/config');

const RoleSchema = dbConnection.define('roles', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        required: true,
        unique: true
    }
})

module.exports = RoleSchema;
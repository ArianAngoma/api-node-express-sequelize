const {DataTypes} = require('sequelize');
const bcryptjs = require('bcryptjs');

const {dbConnection} = require('../database/config');

const UserSchema = dbConnection.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        required: true
    },
    password: {
        type: DataTypes.STRING,
        required: true
    },
    img: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.INTEGER,
        required: true,
        defaultValue: 1
    },
    google: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    hooks: {
        // Hook para encriptar la contraseña antes de guardarla a la DB
        beforeCreate(user) {
            user.password = bcryptjs.hashSync(user.password, bcryptjs.genSaltSync());
        }
    }
})

UserSchema.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    // Eliminar la contraseña al regersar User (No elimina de la DB)
    delete values.password;

    values.uid = values.id;
    delete values.id;
    return values;
}

module.exports = UserSchema;
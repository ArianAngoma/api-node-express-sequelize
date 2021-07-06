const {DataTypes} = require('sequelize');
const bcryptjs = require('bcryptjs');

const {dbConnection} = require('../database/config');
const Role = require('./role');

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
        type: DataTypes.BOOLEAN,
        required: true,
        default: true
    }
}, {
    hooks: {
        // Hook para encriptar la contraseña antes de guardarla a la DB
        beforeCreate(user) {
            user.password = bcryptjs.hashSync(user.password, bcryptjs.genSaltSync());
        }
    }
})

UserSchema.belongsTo(Role);

UserSchema.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    // Eliminar la contraseña al regersar User (No elimina de la DB)
    delete values.password;
    return values;
}

module.exports = UserSchema;
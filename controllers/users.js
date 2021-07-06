const User = require('../models/user');

const usersGet = async (req, res) => {
    res.json('Hola');
}

module.exports = {
    usersGet
}
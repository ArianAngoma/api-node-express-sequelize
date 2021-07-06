const {User} = require('../models');

const getUser = async (req, res) => {
    res.json('Hola');
}

module.exports = {
    getUser
}
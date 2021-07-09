const dbValidators = require('./db-validators');
const JWT = require('./generate-jwt');

module.exports = {
    ...dbValidators,
    ...JWT
}
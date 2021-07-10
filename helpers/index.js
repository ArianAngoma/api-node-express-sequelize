const dbValidators = require('./db-validators');
const JWT = require('./generate-jwt');
const googleVerify = require('./google-verify');

module.exports = {
    ...dbValidators,
    ...JWT,
    ...googleVerify
}
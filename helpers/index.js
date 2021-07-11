const dbValidators = require('./db-validators');
const JWT = require('./generate-jwt');
const googleVerify = require('./google-verify');
const uploadFile = require('./upload-file');

module.exports = {
    ...dbValidators,
    ...JWT,
    ...googleVerify,
    ...uploadFile
}
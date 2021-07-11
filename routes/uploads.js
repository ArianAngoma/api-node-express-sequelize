const {Router} = require('express');
const {check} = require('express-validator');

const {uploadFiles, updateImg} = require('../controllers/uploads');
const {validateFields, validateJWT, validateFileUpload} = require("../middlewares");
const {userExistsById, isStateUserTrueById, tablesAllowed} = require('../helpers');

const router = Router();

router.post('/', [
    validateFileUpload
], uploadFiles);

router.put('/:table/:id', [
    // validateJWT,
    validateFileUpload,
    check('id', 'Id es requerido').notEmpty(),
    check('id').custom(userExistsById),
    check('id').custom(isStateUserTrueById),
    check('table').custom(table => tablesAllowed(table, ['users', 'products'])),
    validateFields
], updateImg);

module.exports = router;

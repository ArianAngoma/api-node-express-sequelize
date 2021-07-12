const {Router} = require('express');
const {check} = require('express-validator');

const {uploadFiles, updateImg, showImg} = require('../controllers/uploads');
const {validateFields, validateJWT, validateFileUpload} = require("../middlewares");
const {
    userExistsById,
    isStateUserTrueById,
    existsProductById,
    tablesAllowed,
    isIdUserToken,
    isUserIdToken
} = require('../helpers');

const router = Router();

router.post('/', [
    validateFileUpload
], uploadFiles);

router.put('/:table/:id', [
    validateJWT,
    validateFileUpload,
    check('id', 'Id es requerido').notEmpty(),
    check('table').custom(table => tablesAllowed(table, ['users', 'products'])),
    check('id').if(check('table').equals('users')).custom(userExistsById).custom(isStateUserTrueById).custom(isIdUserToken),
    check('id').if(check('table').equals('products')).custom(existsProductById).custom(isUserIdToken),
    validateFields
], updateImg);

router.get('/:table/:id', [
    validateJWT,
    check('id', 'Id es requerido').notEmpty(),
    check('table').custom(table => tablesAllowed(table, ['users', 'products'])),
    check('id').if(check('table').equals('users')).custom(userExistsById).custom(isStateUserTrueById),
    check('id').if(check('table').equals('products')).custom(existsProductById),
    validateFields
], showImg)

module.exports = router;

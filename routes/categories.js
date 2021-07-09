const {Router} = require('express');
const {check} = require('express-validator');
const {getCategories, createCategory} = require('../controllers/categories');
const {validateJWT, validateFields, isAdminRole} = require('../middlewares');
const {existsCategoryByName} = require('../helpers');

const router = Router();

router.get('/', [
    validateJWT,
    isAdminRole
], getCategories);

router.post('/', [
    validateJWT,
    check('name', 'Nombre es requerido').notEmpty(),
    check('name').custom(existsCategoryByName),
    validateFields
], createCategory);

module.exports = router;
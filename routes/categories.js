const {Router} = require('express');
const {check} = require('express-validator');
const {getCategories, getCategoryById, createCategory} = require('../controllers/categories');
const {validateJWT, validateFields, isAdminRole} = require('../middlewares');
const {existsCategoryByName, existsCategoryById, isStateCategoryTrueById} = require('../helpers');

const router = Router();

// Obtener todas las CATEGORIES (Todos los roles)
router.get('/', [
    validateJWT
], getCategories);

// Obtener CATEGORY por ID (Todos los roles)
router.get('/:id', [
    validateJWT,
    check('id', 'Id es requerido').notEmpty(),
    check('id').custom(existsCategoryById),
    check('id').custom(isStateCategoryTrueById),
    validateFields
], getCategoryById);

// Crear nueva CATEGORY (Rol ADMIN)
router.post('/', [
    validateJWT,
    isAdminRole,
    check('name', 'Nombre es requerido').notEmpty(),
    check('name').custom(existsCategoryByName),
    validateFields
], createCategory);

module.exports = router;
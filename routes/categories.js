const {Router} = require('express');
const {check} = require('express-validator');
const {getCategories, getCategoryById, createCategory, updateCategory, deleteCategory} = require('../controllers/categories');
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

// Actualizar CATEGORY by ID (Rol Admin)
router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Id es requerido').notEmpty(),
    check('id').custom(existsCategoryById),
    check('id').custom(isStateCategoryTrueById),
    check('name', 'Nombre es requerido').notEmpty(),
    check('name').custom(existsCategoryByName),
    validateFields
], updateCategory);

// Eliminar Category by ID (Rol Admin)
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Id es requerido').notEmpty(),
    check('id').custom(existsCategoryById),
    check('id').custom(isStateCategoryTrueById),
    validateFields
], deleteCategory)

module.exports = router;
const {Router} = require('express');
const {check} = require('express-validator');
const {getProducts, getProductById, createProduct} = require('../controllers/products');
const {validateFields, validateJWT} = require("../middlewares");
const {existsProductByNameAndIdUser, existsCategoryById, isStateCategoryTrueById, existsProductById} = require('../helpers');

const router = Router();

// Obtener todos los PRODUCTS
router.get('/', [
    validateJWT
], getProducts);

// Obtener PRODUCT por ID
router.get('/:id', [
    validateJWT,
    check('id', 'Id de producto es requerido').notEmpty(),
    check('id').custom(existsProductById),
    validateFields
], getProductById);

// Crear nuevo PRODUCTO
router.post('/', [
    validateJWT,
    check('name', 'Nombre es obligatorio').notEmpty(),
    check('name').custom(existsProductByNameAndIdUser),
    check('price', 'Precio no válido').isNumeric().optional(),
    check('categoryId', 'Id de Categoría es requerido').notEmpty(),
    check('categoryId').custom(existsCategoryById),
    check('categoryId').custom(isStateCategoryTrueById),
    validateFields
], createProduct);

module.exports = router;
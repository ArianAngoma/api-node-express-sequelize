const {Router} = require('express');
const {check} = require('express-validator');
const {getRoles, getRoleById, createRole, updateRole, deleteRole} = require("../controllers/roles");
const {validateFields, validateJWT, isAdminRole, hasRole} = require('../middlewares');
const {roleExistsById, roleExistsByName} = require('../helpers')

const router = Router();

// Obtener todos los ROLES
router.get('/', [
    validateJWT,
    isAdminRole,

    // Valida si el USUARIO tiene uno de estos ROLES
    // hasRole('USER', 'UBER'),

    validateFields
], getRoles);

// Obtener ROL por ID
router.get('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Id es requerido').notEmpty(),
    check('id').custom(roleExistsById),
    validateFields
], getRoleById);

// Crear ROL
router.post('/', [
    validateJWT,
    isAdminRole,
    check('name', 'Nombre del rol es requerido').notEmpty(),
    check('name').custom(roleExistsByName),
    validateFields
], createRole);

// Actualizar ROL
router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Id es requerido').notEmpty(),
    check('id').custom(roleExistsById),
    check('name').custom(roleExistsByName),
    validateFields
], updateRole);

// Eliminar ROL
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Id es requerido').notEmpty(),
    check('id').custom(roleExistsById),
    validateFields
], deleteRole)

module.exports = router;
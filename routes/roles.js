const {Router} = require('express');
const {check} = require('express-validator');
const {getRoles, getRoleById, createRole, updateRole, deleteRole} = require("../controllers/roles");
const {validateFields} = require('../middlewares');
const {roleExistsById, roleExistsByName} = require('../helpers')

const router = Router();

// Obtener todos los ROLES
router.get('/', getRoles);

// Obtener ROL por ID
router.get('/:id', [
    check('id', 'Id es requerido').notEmpty(),
    check('id').custom(roleExistsById),
    validateFields
], getRoleById);

// Crear ROL
router.post('/', [
    check('name', 'Nombre del rol es requerido').notEmpty(),
    check('name').custom(roleExistsByName),
    validateFields
], createRole);

// Actualizar ROL
router.put('/:id', [
    check('id', 'Id es requerido').notEmpty(),
    check('id').custom(roleExistsById),
    check('name').custom(roleExistsByName),
    validateFields
], updateRole);

// Eliminar ROL
router.delete('/:id', [
    check('id', 'Id es requerido').notEmpty(),
    check('id').custom(roleExistsById),
    validateFields
], deleteRole)

module.exports = router;
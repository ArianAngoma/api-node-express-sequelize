const {Router} = require('express');
const {check} = require('express-validator');
const {getUser, getUserById, createUser, updateUser, deleteUser} = require("../controllers/users");
const {validateFields} = require('../middlewares');
const {userExistsByEmail, roleExistsById, userExistsById, isStateUserTrueById} = require('../helpers')

const router = Router();

// Obtener USUARIOS
router.get('/', getUser);

// Obtener USUARIO por ID
router.get('/:id', [
    check('id', 'Id de usuario es requerido').notEmpty(),
    check('id').custom(userExistsById),
    check('id').custom(isStateUserTrueById),
    validateFields
], getUserById);

// Crear USUARIO
router.post('/', [
    check('name', 'Nombre es requerido').notEmpty(),
    check('email', 'Email es requerido').notEmpty(),
    check('email', 'Email no válido').isEmail(),
    check('email').custom(userExistsByEmail),
    check('roleId', 'Id del ROLE es requerido').notEmpty(),
    check('roleId').custom(roleExistsById),
    validateFields
], createUser);


// Actualizar USUARIO por ID
router.put('/:id', [
    check('id', 'Id de usuario es requerido').notEmpty(),
    check('id').custom(userExistsById),
    check('id').custom(isStateUserTrueById),
    check('email', 'Email no válido').isEmail().optional(),
    check('email').custom(userExistsByEmail).optional(),
    check('roleId').custom(roleExistsById).optional(),
    validateFields
], updateUser);

// Eliminar USUARIO por ID
router.delete('/:id', [
    check('id', 'Id de usuario es requerido').notEmpty(),
    check('id').custom(userExistsById),
    check('id').custom(isStateUserTrueById),
    validateFields
], deleteUser)

module.exports = router;
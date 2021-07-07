const {Router} = require('express');
const {check} = require('express-validator');
const {getUser, getUserById, createUser} = require("../controllers/users");
const {validateFields} = require('../middlewares');
const {userExistsByEmail, roleExistsById, userExistsById, isStateUserTrue} = require('../helpers')

const router = Router();

router.get('/', getUser);

router.get('/:id', [
    check('id', 'Id de usuario es requerido').notEmpty(),
    check('id').custom(userExistsById),
    check('id').custom(isStateUserTrue),
    validateFields
], getUserById);

router.post('/', [
    check('name', 'Nombre es requerido').notEmpty(),
    check('email', 'Email es requerido').notEmpty(),
    check('email', 'Email no válido').isEmail(),
    check('email').custom(userExistsByEmail),
    check('roleId', 'Id del ROLE es requerido').notEmpty(),
    check('roleId').custom(roleExistsById),
    validateFields
], createUser);

module.exports = router;
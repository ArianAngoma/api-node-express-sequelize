const {Router} = require('express');
const {check} = require('express-validator');
const {getUser, createUser} = require("../controllers/users");
const {validateFields} = require('../middlewares');
const {userExistsByEmail, roleExistsById} = require('../helpers')

const router = Router();

router.get('/', getUser);

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
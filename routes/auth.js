const {Router} = require('express');
const {check} = require('express-validator');
const {validateFields} = require('../middlewares');
const {signIn} = require('../controllers/auth');
const {userExistsByEmailAuth, isStateUserTrueByEmail} = require('../helpers');

const router = Router();

router.post('/sign-in', [
    check('email', 'Email es requerido').notEmpty(),
    check('email', 'Email no válido').isEmail(),
    check('email').custom(userExistsByEmailAuth),
    check('email').custom(isStateUserTrueByEmail),
    check('password', 'Contraseña requerida').notEmpty(),
    validateFields
], signIn)

module.exports = router;


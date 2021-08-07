const {validationResult} = require("express-validator");

const validateFields = (req, res, next) => {
    // Valida si existe errores antes de ejecutar el controlador
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    next();
}

module.exports = {
    validateFields
}
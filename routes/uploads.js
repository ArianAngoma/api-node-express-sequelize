const {Router} = require('express');
const {check} = require('express-validator');

const {uploadFiles} = require('../controllers/uploads');
const {validateFileUpload} = require("../middlewares");

const router = Router();

router.post('/', [
    validateFileUpload
], uploadFiles);

module.exports = router;

const path = require('path');
const fs = require('fs');

const {uploadFile} = require("../helpers");

const uploadFiles = async (req, res) => {
    try {
        const name = await uploadFile(req.files, undefined, 'img');
        res.json({name});
    } catch (err) {
        res.status(400).json({err});
    }
}

module.exports = {
    uploadFiles
}
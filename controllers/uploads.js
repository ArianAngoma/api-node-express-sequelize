const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const {uploadFile} = require("../helpers");
const {User, Product} = require('../models');

const uploadFiles = async (req, res) => {
    try {
        const name = await uploadFile(req.files, undefined, 'img');
        res.json({name});
    } catch (err) {
        res.status(400).json({err});
    }
}

const updateImg = async (req, res) => {
    const {table, id} = req.params;

    let model;
    switch (table) {
        case 'users':
            model = await User.findByPk(id);
            if (!model) return res.status(400).json({msg: `No existe usuario con id ${id}`});
            break;
        case 'products':
            model = await Product.findByPk(id);
            if (!model) return res.status(400).json({msg: `No existe producto con id ${id}`});
            break;
        default:
            return res.status(500).json({msg: 'Se me olvidó validar esto'});
    }

    // Limpiar imágenes previas
    if (model.img) {
        // Borrar img del servidor local
        const pathImg = path.join(__dirname, '../uploads', table, model.img);
        if (fs.existsSync(pathImg)) fs.unlinkSync(pathImg);
    }

    try {
        model.img = await uploadFile(req.files, undefined, table);

        await model.save();

        res.json(model);
    } catch (err) {
        res.status(400).json({err});
    }
}

const showImg = async (req, res) => {
    const {table, id} = req.params;

    let model;
    switch (table) {
        case 'users':
            model = await User.findByPk(id);
            if (!model) return res.status(400).json({msg: `No existe usuario con id ${id}`});
            break;
        case 'products':
            model = await Product.findByPk(id);
            if (!model) return res.status(400).json({msg: `No existe producto con id ${id}`});
            break;
        default:
            return res.status(500).json({msg: 'Se me olvidó validar esto'});
    }

    // Limpiar imágenes previas
    if (model.img) {
        // Borrar imagen del servidor
        const pathImg = path.join(__dirname, '../uploads', table, model.img);
        if (fs.existsSync(pathImg)) return res.sendFile(pathImg);
    }

    const pathPlaceHolder = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathPlaceHolder);
}

// Cloudinary
const updateImgCloudinary = async (req, res) => {
    const {table, id} = req.params;

    let model;
    switch (table) {
        case 'users':
            model = await User.findByPk(id);
            if (!model) return res.status(400).json({msg: `No existe usuario con id ${id}`});
            break;
        case 'products':
            model = await Product.findByPk(id);
            if (!model) return res.status(400).json({msg: `No existe producto con id ${id}`});
            break;
        default:
            return res.status(500).json({msg: 'Se me olvidó validar esto'});
    }

    // Limpiar imágenes previas
    if (model.img) {
        // Borrar imagen de cloudinary
        const nameArray = model.img.split('/');
        const name = nameArray[nameArray.length - 1];
        const [public_id] = name.split('.');
        cloudinary.uploader.destroy(`${table}/${public_id}`);
    }

    // Extraer el path temporal
    const {tempFilePath} = req.files.file;

    const {secure_url} = await cloudinary.uploader.upload(tempFilePath, {folder: table});

    model.img = secure_url;

    await model.save();

    res.json(model);
}

module.exports = {
    uploadFiles,
    updateImg,
    showImg,
    updateImgCloudinary
}
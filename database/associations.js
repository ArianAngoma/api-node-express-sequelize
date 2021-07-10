const {User, Role, Category, Product} = require('../models');

// Un ROL tiene muchos USUARIOS, mientras que un USUARIO pertence a un ROL
Role.hasMany(User);
User.belongsTo(Role);

// USUARIO tiene muchas CATEGORIAS
User.hasMany(Category);
Category.belongsTo(User);

// USUARIO y CATEGORIA tiene muchos PRODUCTOS
User.hasMany(Product);
Category.hasMany(Product);

// PRODUCTO pertenece a ASUARIO y CATEGORIA
Product.belongsTo(User);
Product.belongsTo(Category);
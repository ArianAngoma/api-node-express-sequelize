const {User, Role, Category} = require('../models');

// Un ROL tiene muchos USUARIOS, mientras que un USUARIO pertence a un ROL
Role.hasMany(User);
User.belongsTo(Role);

// USUARIO tiene muchas CATEGORIAS
User.hasMany(Category);
Category.belongsTo(User);
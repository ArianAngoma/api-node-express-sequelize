const {User, Role} = require('../models');

// Un ROL tiene muchos USUARIOS, mientras que un USUARIO pertence a un ROL
Role.hasMany(User);
User.belongsTo(Role);
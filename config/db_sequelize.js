const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'web2_db',
  'postgres',
  '1234',
  {
    host: 'localhost',
    dialect: 'postgres'
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Usuario = require('../models/usuario')(sequelize, Sequelize);
db.Categoria = require('../models/categoria')(sequelize, Sequelize);
db.Evento = require('../models/evento')(sequelize, Sequelize);

db.Usuario.hasMany(db.Evento, { foreignKey: 'usuarioId' });
db.Evento.belongsTo(db.Usuario, { foreignKey: 'usuarioId' });

db.Categoria.hasMany(db.Evento, { foreignKey: 'categoriaId' });
db.Evento.belongsTo(db.Categoria, { foreignKey: 'categoriaId' });

module.exports = db;

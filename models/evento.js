module.exports = (sequelize, Sequelize) => {
  const Evento = sequelize.define('evento', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    titulo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    data: {
      type: Sequelize.DATE,
      allowNull: false
    },
    usuarioId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    categoriaId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });

  return Evento;
};

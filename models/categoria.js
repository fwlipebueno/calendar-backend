module.exports = (sequelize, Sequelize) => {
  const Categoria = sequelize.define('categoria', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return Categoria;
};

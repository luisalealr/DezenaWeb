const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orden_envio', {
    IDorden: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    local_idlocal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'local',
        key: 'IDlocal'
      }
    }
  }, {
    sequelize,
    tableName: 'orden_envio',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDorden" },
        ]
      },
      {
        name: "local_idlocal",
        using: "BTREE",
        fields: [
          { name: "local_idlocal" },
        ]
      },
    ]
  });
};

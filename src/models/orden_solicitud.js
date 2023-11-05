const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orden_solicitud', {
    ID: {
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
    taller_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'taller',
        key: 'ID'
      }
    }
  }, {
    sequelize,
    tableName: 'orden_solicitud',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "orden_solicitud_taller_fk",
        using: "BTREE",
        fields: [
          { name: "taller_ID" },
        ]
      },
    ]
  });
};

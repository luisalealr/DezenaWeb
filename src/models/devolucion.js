const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('devolucion', {
    IDdevolucion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    orden_envio_IDorden: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orden_envio',
        key: 'IDorden'
      }
    }
  }, {
    sequelize,
    tableName: 'devolucion',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDdevolucion" },
        ]
      },
      {
        name: "orden_envio_IDorden",
        using: "BTREE",
        fields: [
          { name: "orden_envio_IDorden" },
        ]
      },
    ]
  });
};

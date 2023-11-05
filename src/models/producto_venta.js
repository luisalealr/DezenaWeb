const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('producto_venta', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cantidad_vendida: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    orden_venta_fisica_IDventa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orden_venta_fisica',
        key: 'ID'
      }
    },
    producto_casa_matriz_producto_referencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'producto_casa_matriz',
        key: 'producto_referencia'
      }
    },
    producto_casa_matriz_producto_IDcolor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'producto_casa_matriz',
        key: 'color_IDcolor'
      }
    }
  }, {
    sequelize,
    tableName: 'producto_venta',
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
        name: "orden_venta_fisica_IDventa",
        using: "BTREE",
        fields: [
          { name: "orden_venta_fisica_IDventa" },
          { name: "producto_casa_matriz_producto_referencia" },
          { name: "producto_casa_matriz_producto_IDcolor" },
        ]
      },
      {
        name: "producto_casa_matriz_producto_referencia",
        using: "BTREE",
        fields: [
          { name: "producto_casa_matriz_producto_referencia" },
        ]
      },
      {
        name: "producto_casa_matriz_producto_IDcolor",
        using: "BTREE",
        fields: [
          { name: "producto_casa_matriz_producto_IDcolor" },
        ]
      },
    ]
  });
};

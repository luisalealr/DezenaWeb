const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('inventario_local', {
    producto_casa_matriz_producto_referencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'producto_casa_matriz',
        key: 'producto_referencia'
      }
    },
    producto_casa_matriz_color_IDcolor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'producto_casa_matriz',
        key: 'color_IDcolor'
      }
    },
    local_IDlocal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'local',
        key: 'IDlocal'
      }
    }
  }, {
    sequelize,
    tableName: 'inventario_local',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "producto_casa_matriz_producto_referencia" },
          { name: "producto_casa_matriz_color_IDcolor" },
          { name: "local_IDlocal" },
        ]
      },
      {
        name: "local_IDlocal",
        using: "BTREE",
        fields: [
          { name: "local_IDlocal" },
        ]
      },
      {
        name: "producto_casa_matriz_color_IDcolor",
        using: "BTREE",
        fields: [
          { name: "producto_casa_matriz_color_IDcolor" },
        ]
      },
      {
        name: "producto_casa_matriz_producto_referencia",
        using: "BTREE",
        fields: [
          { name: "producto_casa_matriz_producto_referencia" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('producto_casa_matriz', {
    producto_referencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'producto',
        key: 'referencia'
      }
    },
    color_IDcolor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'color',
        key: 'IDcolor'
      }
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'producto_casa_matriz',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "producto_referencia" },
          { name: "color_IDcolor" },
        ]
      },
      {
        name: "color_IDcolor",
        using: "BTREE",
        fields: [
          { name: "color_IDcolor" },
          { name: "producto_referencia" },
        ]
      },
    ]
  });
};

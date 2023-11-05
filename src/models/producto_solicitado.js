import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class producto_solicitado extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cantidad_solicitada: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    orden_solicitud_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orden_solicitud',
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
    producto_casa_matriz_color_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'producto_casa_matriz',
        key: 'color_IDcolor'
      }
    }
  }, {
    sequelize,
    tableName: 'producto_solicitado',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "producto_solicitado_orden_solicitud_fk",
        using: "BTREE",
        fields: [
          { name: "orden_solicitud_id" },
        ]
      },
      {
        name: "producto_solicitado_producto_casa_matriz_fk",
        using: "BTREE",
        fields: [
          { name: "producto_casa_matriz_color_id" },
          { name: "producto_casa_matriz_producto_referencia" },
        ]
      },
    ]
  });
  }
}

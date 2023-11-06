import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class producto_ordenado extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cantidad_ordenada: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    orden_envio_IDorden: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orden_envio',
        key: 'IDorden'
      }
    },
    devolucion_IDdevolucion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'devolucion',
        key: 'IDdevolucion'
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
    producto_casa_matriz_color_IDcolor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'producto_casa_matriz',
        key: 'color_IDcolor'
      }
    }
  }, {
    sequelize,
    tableName: 'producto_ordenado',
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
        name: "orden_envio_IDorden",
        using: "BTREE",
        fields: [
          { name: "orden_envio_IDorden" },
        ]
      },
      {
        name: "devolucion_IDdevolucion",
        using: "BTREE",
        fields: [
          { name: "devolucion_IDdevolucion" },
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
        name: "producto_casa_matriz_color_IDcolor",
        using: "BTREE",
        fields: [
          { name: "producto_casa_matriz_color_IDcolor" },
        ]
      },
    ]
  });
  }
}

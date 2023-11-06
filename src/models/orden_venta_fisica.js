import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class orden_venta_fisica extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
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
    vendedor_cedula: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'vendedor',
        key: 'cedula'
      }
    },
    cliente_cedula: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cliente',
        key: 'cedula'
      }
    }
  }, {
    sequelize,
    tableName: 'orden_venta_fisica',
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
        name: "orden_venta_fisica_vendedor_fk",
        using: "BTREE",
        fields: [
          { name: "vendedor_cedula" },
        ]
      },
      {
        name: "orden_venta_fisica_cliente_fk",
        using: "BTREE",
        fields: [
          { name: "cliente_cedula" },
        ]
      },
    ]
  });
  }
}

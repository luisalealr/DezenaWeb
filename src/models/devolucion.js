import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class devolucion extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
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
  }
}

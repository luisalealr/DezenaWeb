import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class orden_solicitud extends Model {
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
  }
}

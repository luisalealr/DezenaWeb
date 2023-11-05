import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class vendedor extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    cedula: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuario',
        key: 'cedula'
      }
    },
    comision: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'vendedor',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cedula" },
        ]
      },
    ]
  });
  }
}

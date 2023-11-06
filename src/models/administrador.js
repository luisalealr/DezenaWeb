import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class administrador extends Model {
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
    }
  }, {
    sequelize,
    tableName: 'administrador',
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

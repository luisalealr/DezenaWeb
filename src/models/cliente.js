import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class cliente extends Model {
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
    tableName: 'cliente',
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

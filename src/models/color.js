import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class color extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IDcolor: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(15),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'color',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDcolor" },
        ]
      },
    ]
  });
  }
}

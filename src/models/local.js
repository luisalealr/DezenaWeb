import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class local extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IDlocal: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'local',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDlocal" },
        ]
      },
    ]
  });
  }
}

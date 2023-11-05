import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class taller extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    direccion: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'taller',
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
    ]
  });
  }
}

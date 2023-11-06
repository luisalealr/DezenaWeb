import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class usuario extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    cedula: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    telefono: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: "correo"
    },
    contrasena: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'usuario',
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
      {
        name: "correo",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "correo" },
        ]
      },
    ]
  });
  }
}

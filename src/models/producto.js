import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class producto extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    referencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    precio_mercado: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    costo_produccion: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'producto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "referencia" },
        ]
      },
    ]
  });
  }
}

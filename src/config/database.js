import { config } from "dotenv";
config();
import { Sequelize, DataTypes } from "sequelize";
import initModels from "../models/init-models.js";

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
  }
);

const models = initModels(sequelize, DataTypes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("Error en la conexión a la base de datos:", error);
  }
})();

export default sequelize;

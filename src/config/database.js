import { config } from "dotenv";
config();
import { Sequelize } from "sequelize";

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

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("Error en la conexión a la base de datos:", error);
  }
})();

export default sequelize;

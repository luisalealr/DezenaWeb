import sequelize from "../config/database.js";
import initModels from "../models/init-models.js";
const models = initModels(sequelize);
const Taller = models.taller;
const OrdenEnvio = models.orden_envio;

const TallerController = {
  // Obtener todos los talleres
  async getAllTalleres(req, res) {
    try {
      const talleres = await Taller.findAll();
      return res.render("solicitarProducto", {talleres});
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Crear un nuevo taller
  async createTaller(req, res) {
    const { direccion, nombre, correo } = req.body;
    try {
      const newTaller = await Taller.create({
        direccion: direccion,
        nombre: nombre,
        correo: correo,
      });
      return res.render("agregarTaller", { estado: "Exito" });
    } catch (error) {
      console.log(error.message);
      return res.render("agregarTaller", { estado: "Algo Fallo" });
    }
  },

  // Obtener un taller por su ID
  async getTallerById(req, res) {
    const { ID } = req.params; // Suponiendo que el ID viene como parámetro en la URL

    try {
      const taller = await Taller.findByPk(ID);

      if (taller) {
        return res.json(taller);
      } else {
        return res.status(404).json({ message: "Taller no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar información de un taller por su ID
  async updateTallerById(req, res) {
    const { ID } = req.params;
    const newData = req.body; // Suponiendo que envías los nuevos datos a actualizar

    try {
      const taller = await Taller.findByPk(ID);

      if (taller) {
        await taller.update(newData);
        return res.json(taller);
      } else {
        return res.status(404).json({ message: "Taller no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Borrar un taller por su ID
  async deleteTallerById(req, res) {
    const { ID } = req.params;

    try {
      const taller = await Taller.findByPk(ID);

      if (taller) {
        await taller.destroy();
        return res.json({ message: "Taller eliminado exitosamente" });
      } else {
        return res.status(404).json({ message: "Taller no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default TallerController;

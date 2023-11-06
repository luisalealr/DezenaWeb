import sequelize from "../config/database.js";
import initModels from "../models/init-models.js";
const models = initModels(sequelize);
const OrdenEnvio = models.orden_envio;

const OrdenEnvioController = {
  // Obtener todas las órdenes de envío
  async getAllOrdenesEnvio(req, res) {
    try {
      const ordenesEnvio = await OrdenEnvio.findAll();
      return res.json(ordenesEnvio);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Crear una nueva orden de envío
  async createOrdenEnvio(req, res) {
    const { fecha, estado, local_idlocal } = req.body;
    try {
      const newOrdenEnvio = await OrdenEnvio.create({
        fecha,
        estado,
        local_idlocal,
      });
      return res.status(201).json(newOrdenEnvio);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener una orden de envío por su ID
  async getOrdenEnvioById(req, res) {
    const { id } = req.params; // Suponiendo que el ID viene como parámetro en la URL
    try {
      const ordenEnvio = await OrdenEnvio.findByPk(id);
      if (ordenEnvio) {
        return res.json(ordenEnvio);
      } else {
        return res
          .status(404)
          .json({ message: "Orden de envío no encontrada" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar información de una orden de envío por su ID
  async updateOrdenEnvioById(req, res) {
    const { id } = req.params;
    const newData = req.body; // Suponiendo que envías los nuevos datos a actualizar
    try {
      const ordenEnvio = await OrdenEnvio.findByPk(id);
      if (ordenEnvio) {
        await ordenEnvio.update(newData);
        return res.json(ordenEnvio);
      } else {
        return res
          .status(404)
          .json({ message: "Orden de envío no encontrada" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Borrar una orden de envío por su ID
  async deleteOrdenEnvioById(req, res) {
    const { id } = req.params;
    try {
      const ordenEnvio = await OrdenEnvio.findByPk(id);
      if (ordenEnvio) {
        await ordenEnvio.destroy();
        return res.json({ message: "Orden de envío eliminada exitosamente" });
      } else {
        return res
          .status(404)
          .json({ message: "Orden de envío no encontrada" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default OrdenEnvioController;

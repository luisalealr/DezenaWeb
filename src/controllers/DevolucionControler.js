import sequelize from "../config/database.js";
import initModels from "../models/init-models.js";
const models = initModels(sequelize);
const Devolucion = models.devolucion;

const DevolucionController = {
  // Obtener todas las devoluciones
  async getAllDevoluciones(req, res) {
    try {
      const devoluciones = await Devolucion.findAll();
      return res.json(devoluciones);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Crear una nueva devolución
  async createDevolucion(req, res) {
    const { observaciones, fecha, orden_envio_IDorden } = req.body;
    try {
      const newDevolucion = await Devolucion.create({
        observaciones,
        fecha,
        orden_envio_IDorden,
      });
      return res.status(201).json(newDevolucion);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener una devolución por su ID
  async getDevolucionById(req, res) {
    const { id } = req.params; // Suponiendo que el ID viene como parámetro en la URL
    try {
      const devolucion = await Devolucion.findByPk(id);
      if (devolucion) {
        return res.json(devolucion);
      } else {
        return res.status(404).json({ message: "Devolución no encontrada" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar información de una devolución por su ID
  async updateDevolucionById(req, res) {
    const { id } = req.params;
    const newData = req.body; // Suponiendo que envías los nuevos datos a actualizar
    try {
      const devolucion = await Devolucion.findByPk(id);
      if (devolucion) {
        await devolucion.update(newData);
        return res.json(devolucion);
      } else {
        return res.status(404).json({ message: "Devolución no encontrada" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Borrar una devolución por su ID
  async deleteDevolucionById(req, res) {
    const { id } = req.params;
    try {
      const devolucion = await Devolucion.findByPk(id);
      if (devolucion) {
        await devolucion.destroy();
        return res.json({ message: "Devolución eliminada exitosamente" });
      } else {
        return res.status(404).json({ message: "Devolución no encontrada" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default DevolucionController;

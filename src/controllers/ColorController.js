import sequelize from "../config/database.js";
import initModels from "../models/init-models.js";
const models = initModels(sequelize);
const Color = models.color;

const ColorController = {
  // Obtener todos los colores
  async getAllColores(req, res) {
    try {
      const colores = await Color.findAll();
      return res.json(colores);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener un color por su ID
  async getColorByID(req, res) {
    const { IDcolor } = req.params; // Suponiendo que IDcolor viene como parámetro en la URL
    try {
      const color = await Color.findByPk(IDcolor);
      if (color) {
        return res.json(color);
      } else {
        return res.status(404).json({ message: "Color no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Crear un nuevo color
  async createColor(req, res) {
    const { nombre } = req.body; // Suponiendo que recibes el nombre desde la solicitud
    try {
      const newColor = await Color.create({ nombre });
      return res.status(201).json(newColor);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar información de un color por su ID
  async updateColorByID(req, res) {
    const { IDcolor } = req.params;
    const newData = req.body; // Suponiendo que envías los nuevos datos a actualizar
    try {
      const color = await Color.findByPk(IDcolor);
      if (color) {
        await color.update(newData);
        return res.json(color);
      } else {
        return res.status(404).json({ message: "Color no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Eliminar un color por su ID
  async deleteColorByID(req, res) {
    const { IDcolor } = req.params;
    try {
      const color = await Color.findByPk(IDcolor);
      if (color) {
        await color.destroy();
        return res.json({ message: "Color eliminado exitosamente" });
      } else {
        return res.status(404).json({ message: "Color no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default ColorController;

import Local from '../models/local.js'; // Ruta al modelo

const LocalController = {
  // Obtener todos los locales
  async getAllLocales(req, res) {
    try {
      const locales = await Local.findAll();
      return res.json(locales);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Crear un nuevo local
  async createLocal(req, res) {
    const { nombre, direccion } = req.body;
    try {
      const newLocal = await Local.create({ nombre, direccion });
      return res.status(201).json(newLocal);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener un local por su ID
  async getLocalById(req, res) {
    const { id } = req.params; // Suponiendo que el ID viene como parámetro en la URL
    try {
      const local = await Local.findByPk(id);
      if (local) {
        return res.json(local);
      } else {
        return res.status(404).json({ message: 'Local no encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar información de un local por su ID
  async updateLocalById(req, res) {
    const { id } = req.params;
    const newData = req.body; // Suponiendo que envías los nuevos datos a actualizar
    try {
      const local = await Local.findByPk(id);
      if (local) {
        await local.update(newData);
        return res.json(local);
      } else {
        return res.status(404).json({ message: 'Local no encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Borrar un local por su ID
  async deleteLocalById(req, res) {
    const { id } = req.params;
    try {
      const local = await Local.findByPk(id);
      if (local) {
        await local.destroy();
        return res.json({ message: 'Local eliminado exitosamente' });
      } else {
        return res.status(404).json({ message: 'Local no encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default LocalController;
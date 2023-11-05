import Administrador from '../models/administrador.js'; 

const AdministradorController = {
  // Obtener todos los administradores
  async getAllAdministradores(req, res) {
    try {
      const administradores = await Administrador.findAll();
      return res.json(administradores);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Crear un nuevo administrador
  async createAdministrador(req, res) {
    const { cedula } = req.body; // Suponiendo que recibes cedula desde la solicitud
    try {
      const newAdministrador = await Administrador.create({ cedula });
      return res.status(201).json(newAdministrador);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener un administrador por su cedula
  async getAdministradorByCedula(req, res) {
    const { cedula } = req.params; // Suponiendo que la cedula viene como parámetro en la URL
    try {
      const administrador = await Administrador.findByPk(cedula);
      if (administrador) {
        return res.json(administrador);
      } else {
        return res.status(404).json({ message: 'Administrador no encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar información de un administrador por su cedula
  async updateAdministradorByCedula(req, res) {
    const { cedula } = req.params;
    const newData = req.body; // Suponiendo que envías los nuevos datos a actualizar
    try {
      const administrador = await Administrador.findByPk(cedula);
      if (administrador) {
        await administrador.update(newData);
        return res.json(administrador);
      } else {
        return res.status(404).json({ message: 'Administrador no encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Borrar un administrador por su cedula
  async deleteAdministradorByCedula(req, res) {
    const { cedula } = req.params;
    try {
      const administrador = await Administrador.findByPk(cedula);
      if (administrador) {
        await administrador.destroy();
        return res.json({ message: 'Administrador eliminado exitosamente' });
      } else {
        return res.status(404).json({ message: 'Administrador no encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default AdministradorController;

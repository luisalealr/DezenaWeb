import OrdenSolicitud from '../models/orden_solicitud.js'; // Ruta al modelo

const OrdenSolicitudController = {
  // Obtener todas las órdenes de solicitud
  async getAllOrdenesSolicitud(req, res) {
    try {
      const ordenesSolicitud = await OrdenSolicitud.findAll();
      return res.json(ordenesSolicitud);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Crear una nueva orden de solicitud
  async createOrdenSolicitud(req, res) {
    const { fecha, estado, taller_ID } = req.body;
    try {
      const newOrdenSolicitud = await OrdenSolicitud.create({ fecha, estado, taller_ID });
      return res.status(201).json(newOrdenSolicitud);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener una orden de solicitud por su ID
  async getOrdenSolicitudById(req, res) {
    const { id } = req.params; // Suponiendo que el ID viene como parámetro en la URL
    try {
      const ordenSolicitud = await OrdenSolicitud.findByPk(id);
      if (ordenSolicitud) {
        return res.json(ordenSolicitud);
      } else {
        return res.status(404).json({ message: 'Orden de solicitud no encontrada' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar información de una orden de solicitud por su ID
  async updateOrdenSolicitudById(req, res) {
    const { id } = req.params;
    const newData = req.body; // Suponiendo que envías los nuevos datos a actualizar
    try {
      const ordenSolicitud = await OrdenSolicitud.findByPk(id);
      if (ordenSolicitud) {
        await ordenSolicitud.update(newData);
        return res.json(ordenSolicitud);
      } else {
        return res.status(404).json({ message: 'Orden de solicitud no encontrada' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Borrar una orden de solicitud por su ID
  async deleteOrdenSolicitudById(req, res) {
    const { id } = req.params;
    try {
      const ordenSolicitud = await OrdenSolicitud.findByPk(id);
      if (ordenSolicitud) {
        await ordenSolicitud.destroy();
        return res.json({ message: 'Orden de solicitud eliminada exitosamente' });
      } else {
        return res.status(404).json({ message: 'Orden de solicitud no encontrada' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default OrdenSolicitudController;

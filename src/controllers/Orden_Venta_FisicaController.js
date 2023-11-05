import OrdenVentaFisica from '../models/orden_venta_fisica.js'; // Ruta al modelo

const OrdenVentaFisicaController = {
  // Obtener todas las órdenes de venta física
  async getAllOrdenesVentaFisica(req, res) {
    try {
      const ordenesVentaFisica = await OrdenVentaFisica.findAll();
      return res.json(ordenesVentaFisica);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Crear una nueva orden de venta física
  async createOrdenVentaFisica(req, res) {
    const { fecha, vendedor_cedula, cliente_cedula } = req.body;
    try {
      const newOrdenVentaFisica = await OrdenVentaFisica.create({ fecha, vendedor_cedula, cliente_cedula });
      return res.status(201).json(newOrdenVentaFisica);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener una orden de venta física por su ID
  async getOrdenVentaFisicaById(req, res) {
    const { id } = req.params; // Suponiendo que el ID viene como parámetro en la URL
    try {
      const ordenVentaFisica = await OrdenVentaFisica.findByPk(id);
      if (ordenVentaFisica) {
        return res.json(ordenVentaFisica);
      } else {
        return res.status(404).json({ message: 'Orden de venta física no encontrada' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar información de una orden de venta física por su ID
  async updateOrdenVentaFisicaById(req, res) {
    const { id } = req.params;
    const newData = req.body; // Suponiendo que envías los nuevos datos a actualizar
    try {
      const ordenVentaFisica = await OrdenVentaFisica.findByPk(id);
      if (ordenVentaFisica) {
        await ordenVentaFisica.update(newData);
        return res.json(ordenVentaFisica);
      } else {
        return res.status(404).json({ message: 'Orden de venta física no encontrada' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Borrar una orden de venta física por su ID
  async deleteOrdenVentaFisicaById(req, res) {
    const { id } = req.params;
    try {
      const ordenVentaFisica = await OrdenVentaFisica.findByPk(id);
      if (ordenVentaFisica) {
        await ordenVentaFisica.destroy();
        return res.json({ message: 'Orden de venta física eliminada exitosamente' });
      } else {
        return res.status(404).json({ message: 'Orden de venta física no encontrada' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default OrdenVentaFisicaController;

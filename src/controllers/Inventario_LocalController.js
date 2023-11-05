import InventarioLocal from '../models/inventario_local.js'; // Ruta al modelo

const InventarioLocalController = {
  // Obtener todos los registros de inventario local
  async getAllInventarioLocal(req, res) {
    try {
      const inventarioLocal = await InventarioLocal.findAll();
      return res.json(inventarioLocal);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Crear un nuevo registro de inventario local
  async createInventarioLocal(req, res) {
    const { producto_casa_matriz_producto_referencia, producto_casa_matriz_color_IDcolor, local_IDlocal } = req.body;
    try {
      const newInventarioLocal = await InventarioLocal.create({
        producto_casa_matriz_producto_referencia,
        producto_casa_matriz_color_IDcolor,
        local_IDlocal,
      });
      return res.status(201).json(newInventarioLocal);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener un registro de inventario local por clave primaria
  async getInventarioLocalByKey(req, res) {
    const {
      producto_casa_matriz_producto_referencia,
      producto_casa_matriz_color_IDcolor,
      local_IDlocal,
    } = req.params; // Suponiendo que las claves primarias vienen como parámetros en la URL
    try {
      const inventarioLocal = await InventarioLocal.findByPk({
        producto_casa_matriz_producto_referencia,
        producto_casa_matriz_color_IDcolor,
        local_IDlocal,
      });
      if (inventarioLocal) {
        return res.json(inventarioLocal);
      } else {
        return res.status(404).json({ message: 'Registro de inventario local no encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar información de un registro de inventario local por clave primaria
  async updateInventarioLocalByKey(req, res) {
    const {
      producto_casa_matriz_producto_referencia,
      producto_casa_matriz_color_IDcolor,
      local_IDlocal,
    } = req.params;
    const newData = req.body; // Suponiendo que envías los nuevos datos a actualizar
    try {
      const inventarioLocal = await InventarioLocal.findByPk({
        producto_casa_matriz_producto_referencia,
        producto_casa_matriz_color_IDcolor,
        local_IDlocal,
      });
      if (inventarioLocal) {
        await inventarioLocal.update(newData);
        return res.json(inventarioLocal);
      } else {
        return res.status(404).json({ message: 'Registro de inventario local no encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Borrar un registro de inventario local por clave primaria
  async deleteInventarioLocalByKey(req, res) {
    const {
      producto_casa_matriz_producto_referencia,
      producto_casa_matriz_color_IDcolor,
      local_IDlocal,
    } = req.params;
    try {
      const inventarioLocal = await InventarioLocal.findByPk({
        producto_casa_matriz_producto_referencia,
        producto_casa_matriz_color_IDcolor,
        local_IDlocal,
      });
      if (inventarioLocal) {
        await inventarioLocal.destroy();
        return res.json({ message: 'Registro de inventario local eliminado exitosamente' });
      } else {
        return res.status(404).json({ message: 'Registro de inventario local no encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default InventarioLocalController;

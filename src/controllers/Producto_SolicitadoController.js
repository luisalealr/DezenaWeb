import ProductoSolicitado from '../models/producto_solicitado.js'; // Ruta al modelo

const ProductoSolicitadoController = {
  // Obtener todos los productos solicitados
  async getAllProductosSolicitados(req, res) {
    try {
      const productosSolicitados = await ProductoSolicitado.findAll();
      return res.json(productosSolicitados);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Crear un nuevo producto solicitado
  async createProductoSolicitado(req, res) {
    const {
      cantidad_solicitada,
      orden_solicitud_id,
      producto_casa_matriz_producto_referencia,
      producto_casa_matriz_color_id,
    } = req.body;

    try {
      const newProductoSolicitado = await ProductoSolicitado.create({
        cantidad_solicitada,
        orden_solicitud_id,
        producto_casa_matriz_producto_referencia,
        producto_casa_matriz_color_id,
      });

      return res.status(201).json(newProductoSolicitado);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener un producto solicitado por su ID
  async getProductoSolicitadoById(req, res) {
    const { id } = req.params; // Suponiendo que el ID viene como parámetro en la URL

    try {
      const productoSolicitado = await ProductoSolicitado.findByPk(id);

      if (productoSolicitado) {
        return res.json(productoSolicitado);
      } else {
        return res.status(404).json({ message: 'Producto solicitado no encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar información de un producto solicitado por su ID
  async updateProductoSolicitadoById(req, res) {
    const { id } = req.params;
    const newData = req.body; // Suponiendo que envías los nuevos datos a actualizar

    try {
      const productoSolicitado = await ProductoSolicitado.findByPk(id);

      if (productoSolicitado) {
        await productoSolicitado.update(newData);
        return res.json(productoSolicitado);
      } else {
        return res.status(404).json({ message: 'Producto solicitado no encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Borrar un producto solicitado por su ID
  async deleteProductoSolicitadoById(req, res) {
    const { id } = req.params;

    try {
      const productoSolicitado = await ProductoSolicitado.findByPk(id);

      if (productoSolicitado) {
        await productoSolicitado.destroy();
        return res.json({ message: 'Producto solicitado eliminado exitosamente' });
      } else {
        return res.status(404).json({ message: 'Producto solicitado no encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default ProductoSolicitadoController;

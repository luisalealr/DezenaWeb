import ProductoOrdenado from '../models/producto_ordenado.js'; // Ruta al modelo

const ProductoOrdenadoController = {
  // Obtener todos los productos ordenados
  async getAllProductosOrdenados(req, res) {
    try {
      const productosOrdenados = await ProductoOrdenado.findAll();
      return res.json(productosOrdenados);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Crear un nuevo producto ordenado
  async createProductoOrdenado(req, res) {
    const {
      cantidad_ordenada,
      orden_envio_IDorden,
      devolucion_IDdevolucion,
      producto_casa_matriz_producto_referencia,
      producto_casa_matriz_color_IDcolor,
    } = req.body;

    try {
      const newProductoOrdenado = await ProductoOrdenado.create({
        cantidad_ordenada,
        orden_envio_IDorden,
        devolucion_IDdevolucion,
        producto_casa_matriz_producto_referencia,
        producto_casa_matriz_color_IDcolor,
      });

      return res.status(201).json(newProductoOrdenado);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener un producto ordenado por su ID
  async getProductoOrdenadoById(req, res) {
    const { id } = req.params; // Suponiendo que el ID viene como parámetro en la URL

    try {
      const productoOrdenado = await ProductoOrdenado.findByPk(id);

      if (productoOrdenado) {
        return res.json(productoOrdenado);
      } else {
        return res.status(404).json({ message: 'Producto ordenado no encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar información de un producto ordenado por su ID
  async updateProductoOrdenadoById(req, res) {
    const { id } = req.params;
    const newData = req.body; // Suponiendo que envías los nuevos datos a actualizar

    try {
      const productoOrdenado = await ProductoOrdenado.findByPk(id);

      if (productoOrdenado) {
        await productoOrdenado.update(newData);
        return res.json(productoOrdenado);
      } else {
        return res.status(404).json({ message: 'Producto ordenado no encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Borrar un producto ordenado por su ID
  async deleteProductoOrdenadoById(req, res) {
    const { id } = req.params;

    try {
      const productoOrdenado = await ProductoOrdenado.findByPk(id);

      if (productoOrdenado) {
        await productoOrdenado.destroy();
        return res.json({ message: 'Producto ordenado eliminado exitosamente' });
      } else {
        return res.status(404).json({ message: 'Producto ordenado no encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default ProductoOrdenadoController;

import ProductoVenta from '../models/producto_venta.js'; // Ruta al modelo

const ProductoVentaController = {
  // Obtener todos los productos vendidos
  async getAllProductosVendidos(req, res) {
    try {
      const productosVendidos = await ProductoVenta.findAll();
      return res.json(productosVendidos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Crear un nuevo producto vendido
  async createProductoVendido(req, res) {
    const {
      cantidad_vendida,
      orden_venta_fisica_IDventa,
      producto_casa_matriz_producto_referencia,
      producto_casa_matriz_producto_IDcolor,
    } = req.body;

    try {
      const newProductoVendido = await ProductoVenta.create({
        cantidad_vendida,
        orden_venta_fisica_IDventa,
        producto_casa_matriz_producto_referencia,
        producto_casa_matriz_producto_IDcolor,
      });

      return res.status(201).json(newProductoVendido);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener un producto vendido por su ID
  async getProductoVendidoById(req, res) {
    const { id } = req.params; // Suponiendo que el ID viene como parámetro en la URL

    try {
      const productoVendido = await ProductoVenta.findByPk(id);

      if (productoVendido) {
        return res.json(productoVendido);
      } else {
        return res.status(404).json({ message: 'Producto vendido no encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar información de un producto vendido por su ID
  async updateProductoVendidoById(req, res) {
    const { id } = req.params;
    const newData = req.body; // Suponiendo que envías los nuevos datos a actualizar

    try {
      const productoVendido = await ProductoVenta.findByPk(id);

      if (productoVendido) {
        await productoVendido.update(newData);
        return res.json(productoVendido);
      } else {
        return res.status(404).json({ message: 'Producto vendido no encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Borrar un producto vendido por su ID
  async deleteProductoVendidoById(req, res) {
    const { id } = req.params;

    try {
      const productoVendido = await ProductoVenta.findByPk(id);

      if (productoVendido) {
        await productoVendido.destroy();
        return res.json({ message: 'Producto vendido eliminado exitosamente' });
      } else {
        return res.status(404).json({ message: 'Producto vendido no encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default ProductoVentaController;

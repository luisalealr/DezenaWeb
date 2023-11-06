import sequelize from "../config/database.js";
import initModels from "../models/init-models.js";
const models = initModels(sequelize);
const Producto = models.producto;

const ProductoController = {
  // Obtener todos los productos
  async getAllProductos(req, res) {
    try {
      const productos = await Producto.findAll();
      return res.json(productos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Crear un nuevo producto
  async createProducto(req, res) {
    const {
      referencia,
      nombre,
      descripcion,
      precio_mercado,
      costo_produccion,
    } = req.body;

    try {
      const newProducto = await Producto.create({
        referencia,
        nombre,
        descripcion,
        precio_mercado,
        costo_produccion,
      });

      return res.status(201).json(newProducto);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener un producto por su referencia
  async getProductoByReferencia(req, res) {
    const { referencia } = req.params; // Suponiendo que la referencia viene como parámetro en la URL

    try {
      const producto = await Producto.findByPk(referencia);

      if (producto) {
        return res.json(producto);
      } else {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar información de un producto por su referencia
  async updateProductoByReferencia(req, res) {
    const { referencia } = req.params;
    const newData = req.body; // Suponiendo que envías los nuevos datos a actualizar

    try {
      const producto = await Producto.findByPk(referencia);

      if (producto) {
        await producto.update(newData);
        return res.json(producto);
      } else {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Borrar un producto por su referencia
  async deleteProductoByReferencia(req, res) {
    const { referencia } = req.params;

    try {
      const producto = await Producto.findByPk(referencia);

      if (producto) {
        await producto.destroy();
        return res.json({ message: "Producto eliminado exitosamente" });
      } else {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default ProductoController;

import sequelize from "../config/database.js";
import initModels from "../models/init-models.js";
const models = initModels(sequelize);
const ProductoCasaMatriz = models.producto_casa_matriz;

const ProductoCasaMatrizController = {
  // Obtener todos los productos en casa matriz
  async getAllProductosCasaMatriz(req, res) {
    try {
      const productosCasaMatriz = await ProductoCasaMatriz.findAll();
      return res.json(productosCasaMatriz);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Crear un nuevo producto en casa matriz
  async createProductoCasaMatriz(req, res) {
    const { producto_referencia, color_IDcolor, cantidad } = req.body;
    try {
      const newProductoCasaMatriz = await ProductoCasaMatriz.create({
        producto_referencia,
        color_IDcolor,
        cantidad,
      });
      return res.status(201).json(newProductoCasaMatriz);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener un producto en casa matriz por su referencia de producto y color
  async getProductoCasaMatrizByReferenciaColor(req, res) {
    const { producto_referencia, color_IDcolor } = req.params; // Suponiendo que los parámetros vienen como parte de la URL
    try {
      const productoCasaMatriz = await ProductoCasaMatriz.findByPk({
        producto_referencia,
        color_IDcolor,
      });
      if (productoCasaMatriz) {
        return res.json(productoCasaMatriz);
      } else {
        return res
          .status(404)
          .json({ message: "Producto en casa matriz no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar información de un producto en casa matriz por su referencia de producto y color
  async updateProductoCasaMatrizByReferenciaColor(req, res) {
    const { producto_referencia, color_IDcolor } = req.params;
    const newData = req.body; // Suponiendo que envías los nuevos datos a actualizar
    try {
      const productoCasaMatriz = await ProductoCasaMatriz.findByPk({
        producto_referencia,
        color_IDcolor,
      });
      if (productoCasaMatriz) {
        await productoCasaMatriz.update(newData);
        return res.json(productoCasaMatriz);
      } else {
        return res
          .status(404)
          .json({ message: "Producto en casa matriz no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Borrar un producto en casa matriz por su referencia de producto y color
  async deleteProductoCasaMatrizByReferenciaColor(req, res) {
    const { producto_referencia, color_IDcolor } = req.params;
    try {
      const productoCasaMatriz = await ProductoCasaMatriz.findByPk({
        producto_referencia,
        color_IDcolor,
      });
      if (productoCasaMatriz) {
        await productoCasaMatriz.destroy();
        return res.json({
          message: "Producto en casa matriz eliminado exitosamente",
        });
      } else {
        return res
          .status(404)
          .json({ message: "Producto en casa matriz no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default ProductoCasaMatrizController;

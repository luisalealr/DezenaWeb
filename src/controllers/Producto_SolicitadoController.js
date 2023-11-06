import sequelize from "../config/database.js";
import initModels from "../models/init-models.js";
const models = initModels(sequelize);
const ProductoSolicitado = models.producto_solicitado;
const OrdenSolicitud = models.orden_solicitud;
const Producto = models.producto;
const Color = models.color;
const Taller = models.taller;

const ProductoSolicitadoController = {
  // Obtener lista de productos solicitados y ordenes solicitadas
  async getAllProductosSolicitadosYOrdenes(req, res) {
    try {
      const productos_solicitados = await ProductoSolicitado.findAll();
      const ordenes = await OrdenSolicitud.findAll({
        where: { estado: "SOLICITADO" },
      });

      productos_solicitados.forEach(function (producto_solicitado) {
        let idProducto =
          producto_solicitado.producto_casa_matriz_producto_referencia;
        let idColor = producto_solicitado.producto_casa_matriz_color_id;
        producto_solicitado.nombre_producto =
          Producto.findByPk(idProducto).nombre;
        producto_solicitado.nombre_color = Color.findByPk(idColor).nombre;
      });

      ordenes.forEach(function (orden) {
        let idTaller = orden.taller_ID;
        orden.nombre_taller = Taller.findByPk(idTaller).nombre;
      });
      return res.render("produccion", { productos_solicitados, ordenes });
    } catch (error) {
      return res.status(500).json({ error: "Algo fallo" });
    }
  },
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
        return res
          .status(404)
          .json({ message: "Producto solicitado no encontrado" });
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
        return res
          .status(404)
          .json({ message: "Producto solicitado no encontrado" });
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
        return res.json({
          message: "Producto solicitado eliminado exitosamente",
        });
      } else {
        return res
          .status(404)
          .json({ message: "Producto solicitado no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default ProductoSolicitadoController;

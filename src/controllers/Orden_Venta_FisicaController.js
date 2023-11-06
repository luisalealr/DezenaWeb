import sequelize from "../config/database.js";
import initModels from "../models/init-models.js";
const models = initModels(sequelize);
const OrdenVentaFisica = models.orden_venta_fisica;
const Cliente = models.cliente;
const Vendedor = models.vendedor;
const Inventario_local = models.inventario_local;

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

  //Obtener vendedores, colores y productos
  async getColorVendedorProducto(req, res){
    try {
      const vendedores = await Vendedor.findAll();
      const inventarioLocalData = await Inventario_local.findAll({
        attributes: ['producto_casa_matriz_color_IDcolor', 'producto_casa_matriz_producto_referencia'],
      });
      const colores = inventarioLocalData.map((item) => item.producto_casa_matriz_color_IDcolor);
      const productos = inventarioLocalData.map((item) => item.producto_casa_matriz_producto_referencia);
      return res.render("registrarVenta", {vendedores, productos, colores});
    } catch (error) {
      return res.status(500).json({ error: error.message });  
    }
  },

  // Registrar orden de venta
  async createOrdenDeVenta(req, res) {
    try {
      const { identificacion, fecha, productos, montoTotal, moneda, cedulaVendedor } = req.body;

      // Verifica si el cliente ya existe en la base de datos
      let cliente = await Cliente.findOne({ where: {identificacion } });

      // Si el cliente no existe, créalo
      //llamar al metodo del controller
      if (!cliente) {
        cliente = await Cliente.create({
          cedula: identificacion,
          nombre: req.body.nombres,
          apellidos: req.body.apellidos,
          email: req.body.email,
          telefono: req.body.telefono,
        });
      }

      // Crea la orden de venta
      const ordenVenta = await OrdenVentaFisica.create({
        fecha: fecha,
        montoTotal: montoTotal,
        moneda: moneda,
        cedulaCliente: cliente.cedula,
        cedulaVendedor: cedulaVendedor,
      });

      // Registra los productos y sus cantidades en la tabla ProductoVenta
      for (const producto of productos) {
        await ProductoVenta.create({
          idOrdenVenta: ordenVenta.id,
          idProducto: producto.id,
          cantidad: producto.cantidad,
        });
      }

      return res.status(201).json({ mensaje: 'Orden de venta creada con éxito' });
    } catch (error) {
      console.error('Error al crear la orden de venta:', error);
      return res.status(500).json({ mensaje: 'Error al crear la orden de venta' });
    }
  },

  // Crear una nueva orden de venta física
  async createOrdenVentaFisica(req, res) {
    const { fecha, vendedor_cedula, cliente_cedula } = req.body;
    try {
      const newOrdenVentaFisica = await OrdenVentaFisica.create({
        fecha: fecha,
        vendedor_cedula: vendedor_cedula,
        cliente_cedula: cliente_cedula,
      });
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
        return res
          .status(404)
          .json({ message: "Orden de venta física no encontrada" });
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
        return res
          .status(404)
          .json({ message: "Orden de venta física no encontrada" });
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
        return res.json({
          message: "Orden de venta física eliminada exitosamente",
        });
      } else {
        return res
          .status(404)
          .json({ message: "Orden de venta física no encontrada" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default OrdenVentaFisicaController;

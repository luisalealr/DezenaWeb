import sequelize from "../config/database.js";
import initModels from "../models/init-models.js";
const models = initModels(sequelize);
const Vendedor = models.vendedor;

const VendedorController = {
  // Obtener todos los vendedores
  async getAllVendedores(req, res) {
    try {
      const vendedores = await Vendedor.findAll();
      return res.json(vendedores);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Crear un nuevo vendedor
  async createVendedor(req, res) {
    const { cedula, comision } = req.body;

    try {
      const newVendedor = await Vendedor.create({
        cedula,
        comision,
      });

      return res.status(201).json(newVendedor);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener un vendedor por su cédula
  async getVendedorByCedula(req, res) {
    const { cedula } = req.params; // Suponiendo que la cédula viene como parámetro en la URL

    try {
      const vendedor = await Vendedor.findByPk(cedula);

      if (vendedor) {
        return res.json(vendedor);
      } else {
        return res.status(404).json({ message: "Vendedor no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar información de un vendedor por su cédula
  async updateVendedorByCedula(req, res) {
    const { cedula } = req.params;
    const newData = req.body; // Suponiendo que envías los nuevos datos a actualizar

    try {
      const vendedor = await Vendedor.findByPk(cedula);

      if (vendedor) {
        await vendedor.update(newData);
        return res.json(vendedor);
      } else {
        return res.status(404).json({ message: "Vendedor no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Borrar un vendedor por su cédula
  async deleteVendedorByCedula(req, res) {
    const { cedula } = req.params;

    try {
      const vendedor = await Vendedor.findByPk(cedula);

      if (vendedor) {
        await vendedor.destroy();
        return res.json({ message: "Vendedor eliminado exitosamente" });
      } else {
        return res.status(404).json({ message: "Vendedor no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default VendedorController;

import sequelize from "../config/database.js";
import initModels from "../models/init-models.js";
const models = initModels(sequelize);
const Cliente = models.cliente;

const ClienteController = {
  // Obtener todos los clientes
  async getAllClientes(req, res) {
    try {
      const clientes = await Cliente.findAll();
      return res.json(clientes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener un cliente por su cedula
  async getClienteByCedula(req, res) {
    const { cedula } = req.params; // Suponiendo que la cedula viene como parámetro en la URL
    try {
      const cliente = await Cliente.findByPk(cedula);
      if (cliente) {
        return res.json(cliente);
      } else {
        return res.status(404).json({ message: "Cliente no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Crear un nuevo cliente
  async createCliente(req, res) {
    const { cedula } = req.body; // Suponiendo que recibes la cedula desde la solicitud
    try {
      const newCliente = await Cliente.create({ cedula });
      return res.status(201).json(newCliente);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar información de un cliente por su cedula
  async updateClienteByCedula(req, res) {
    const { cedula } = req.params;
    const newData = req.body; // Suponiendo que envías los nuevos datos a actualizar
    try {
      const cliente = await Cliente.findByPk(cedula);
      if (cliente) {
        await cliente.update(newData);
        return res.json(cliente);
      } else {
        return res.status(404).json({ message: "Cliente no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Borrar un cliente por su cedula
  async deleteClienteByCedula(req, res) {
    const { cedula } = req.params;
    try {
      const cliente = await Cliente.findByPk(cedula);
      if (cliente) {
        await cliente.destroy();
        return res.json({ message: "Cliente eliminado exitosamente" });
      } else {
        return res.status(404).json({ message: "Cliente no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default ClienteController;

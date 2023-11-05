import sequelize from "../config/database.js";
import initModels from "../models/init-models.js";
const models = initModels(sequelize);
const Usuario = models.usuario;

const UsuarioController = {
  // Obtener todos los usuarios
  async getAllUsuarios(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      return res.json(usuarios);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Crear un nuevo usuario
  async createUsuario(req, res) {
    const { cedula, nombre, apellido, telefono, correo, contrasena } = req.body;

    try {
      const newUsuario = await Usuario.create({
        cedula,
        nombre,
        apellido,
        telefono,
        correo,
        contrasena,
      });

      return res.status(201).json(newUsuario);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener un usuario por su cédula
  async getUsuarioByCedula(req, res) {
    const { cedula } = req.params; // Suponiendo que la cédula viene como parámetro en la URL

    try {
      const usuario = await Usuario.findByPk(cedula);

      if (usuario) {
        return res.json(usuario);
      } else {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar información de un usuario por su cédula
  async updateUsuarioByCedula(req, res) {
    const { cedula } = req.params;
    const newData = req.body; // Suponiendo que envías los nuevos datos a actualizar

    try {
      const usuario = await Usuario.findByPk(cedula);

      if (usuario) {
        await usuario.update(newData);
        return res.json(usuario);
      } else {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Borrar un usuario por su cédula
  async deleteUsuarioByCedula(req, res) {
    const { cedula } = req.params;

    try {
      const usuario = await Usuario.findByPk(cedula);

      if (usuario) {
        await usuario.destroy();
        return res.json({ message: "Usuario eliminado exitosamente" });
      } else {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default UsuarioController;

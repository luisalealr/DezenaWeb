import sequelize from "../config/database.js";
import initModels from "../models/init-models.js";
import crypto from "crypto";
const models = initModels(sequelize);
const Usuario = models.usuario;
const Administrador = models.usuario;
const Vendedor = models.vendedor;

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

  //Iniciar Sesión de un usuario
  async getUsuarioByCorreoAdministrador(req, res) {
    const { correo, contrasena } = req.body; // se agarran el correo y contraseña del usuario

    try {
      const usuario = await Usuario.findOne({
        where: { correo: correo },
      });
      const hash = crypto.createHash("sha256");
      hash.update(contrasena);
      const hashedPassword = hash.digest("hex");
      const c = await Administrador.count({
        where: { cedula: usuario.cedula },
      });
      if (c > 0 && hashedPassword == usuario.contrasena) {
        req.session.usuario = usuario;
        req.session.administrador = true;
        return res.redirect("/administrador");
      } else {
        return res.render("loginAdmin");
      }
    } catch (error) {
      return res.render("loginAdmin");
    }
  },

  async getUsuarioByCorreoVendedor(req, res) {
    const { correo, contrasena } = req.body; // se agarran el correo y contraseña del usuario

    try {
      const usuario = await Usuario.findOne({
        where: { correo: correo },
      });
      const hash = crypto.createHash("sha256");
      hash.update(contrasena);
      const hashedPassword = hash.digest("hex");
      const c = await Vendedor.count({
        where: { cedula: usuario.cedula },
      });
      if (c > 0 && hashedPassword == usuario.contrasena) {
        req.session.usuario = usuario;
        req.session.vendedor = true;
        return res.redirect("/vendedor");
      } else {
        return res.render("loginVendedor");
      }
    } catch (error) {
      return res.render("loginAdmin");
    }
  },

  //Crear un usuario para el login

  async createUsuarioLogin(req, res) {
    const { correo, contrasena } = req.body;

    try {
      const newUsuario = await Usuario.create({
        correo,
        contrasena,
      });

      return res.render("loginAdmin");
    } catch (error) {
      return res.render("registro");
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

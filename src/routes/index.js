import { Router } from "express";
import vendedorRouter from "./vendedor.js";
import productoRouter from "./producto.js";
import administradorRouter from "./administrador.js";
import UsuarioController from "../controllers/UsuarioController.js";
const router = Router();

var esAdministrador = function (req, res, next) {
  if (req.session.administrador == true) return next();
  else return res.redirect("/");
};

var estaAutenticado = function (req, res, next) {
  if (req.session.usuario == null) {
    return next();
  } else {
    if (req.session.administrador == true)
      return res.redirect("/administrador");
    else return res.redirect("/vendedor");
  }
};

router.get("/", (req, res) => {
  res.render("index2");
});


router.use("/vendedor", vendedorRouter);
router.use("/producto", productoRouter);
<<<<<<< HEAD
router.use("/administrador", administradorRouter);
router.get('/productosMujer', (req, res) => {
  res.render("productosMujer");
});
router.get('/productosHombre', (req, res) => {
  res.render("productosHombre");
});
router.get('/productosOutlet', (req, res) => {
  res.render("productosOutlet");
});
router.get('/productosNovedades', (req, res) => {
  res.render("productosNovedades");
});
router.get("/loginAdmin",(req, res) => {
=======
router.use("/administrador", esAdministrador, administradorRouter);
router.get("/loginAdmin", estaAutenticado, (req, res) => {
>>>>>>> 772c7e055ac2d5c3a7e60845d5c0e68a450a919a
  res.render("loginAdmin");
});
router.get("/loginVendedor", estaAutenticado, (req, res) => {
  res.render("loginVendedor");
});
router.get("/registro", (req, res) => {
  res.render("registro");
});

router.get("/ventanaPrincipal",(req, res) => {
  res.render("ventanaPrincipal");
});

router.get("/ventanaPrincipal",(req, res) => {
  res.render("ventanaPrincipal");
});

router.post("/loginAdmin", UsuarioController.getUsuarioByCorreoAdministrador);
router.post("/registro", UsuarioController.createUsuarioLogin);

router.get("/logout", function (req, res, next) {
  req.session.usuario = null;
  req.session.administrador = null;
  req.session.vendedor = null;
  req.session.save(function (err) {
    if (err) next(err);
    req.session.regenerate(function (err) {
      if (err) next(err);
      res.redirect("/");
    });
  });
});

export default router;

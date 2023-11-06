import { Router } from "express";
import ProductoController from "../controllers/ProductoController.js";
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

//Rutas producto/*

router.get("/productosMujer", (req, res) => {
  res.render("productosMujer");
});

router.get("/ver/:referencia", ProductoController.getProductoByReferencia);

router.get("/crearProducto", (req, res) => {
  res.render("crearReferencia");
});

router.post("/crearProducto", ProductoController.createProducto);

export default router;

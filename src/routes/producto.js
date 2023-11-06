import { Router } from "express";
import ProductoController from "../controllers/ProductoController.js";
const router = Router();

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

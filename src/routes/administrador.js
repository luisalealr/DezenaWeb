import { Router } from "express";
import ProductoSolicitadoController from "../controllers/Producto_SolicitadoController.js";
import TallerController from "../controllers/TallerController.js";

const router = Router();

//Rutas administrador/*

router.get("/", (req, res) => {
  res.render("administrador");
});

router.get("/agregarTaller", (req, res) => {
  res.render("agregarTaller");
});

router.get("/solicitarProducto", (req, res) => {
  res.render("solicitarProducto");
});

router.post("/agregarTaller", TallerController.createTaller);

// Ruta para mostrar la vista de produccion
router.get(
  "/produccion",
  ProductoSolicitadoController.getAllProductosSolicitadosYOrdenes
);


export default router;

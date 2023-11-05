import { Router } from "express";
import ProductoSolicitadoController from "../controllers/Producto_SolicitadoController.js";
import TallerController from "../controllers/TallerController.js";

const router = Router();

//Rutas administrador/*

router.get("/agregarTaller", (req, res) => {
  res.render("agregarTaller");
});

router.post("/agregarTaller", TallerController.createTaller);

// Ruta para mostrar la vista de produccion
router.get(
  "/produccion",
  ProductoSolicitadoController.getAllProductosSolicitadosYOrdenes
);

export default router;

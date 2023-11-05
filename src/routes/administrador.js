import { Router } from "express";
import ProductoSolicitadoController from "../controllers/Producto_SolicitadoController.js";

const router = Router();

//Rutas administrador/*

router.get("/agregarTaller", (req, res) => {
  res.render("agregarTaller");
});

// Ruta para mostrar la vista de produccion
router.get("/produccion", async (req, res) => {
  try {
    const productos_solicitados =
      await ProductoSolicitadoController.getAllProductosSolicitados(req, res);
    return res.render("produccion", { productos_solicitados });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;

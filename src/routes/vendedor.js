import { Router } from "express";
import VendedorController from "../controllers/VendedorController.js";
import OrdenVentaFisicaController from "../controllers/Orden_Venta_FisicaController.js";

const router = Router();

//Rutas vendedor/*

router.get("/", (req, res) => {
  res.render("vendedor");
});


router.get("/registrarVenta", OrdenVentaFisicaController.getColorVendedorProducto);


export default router;

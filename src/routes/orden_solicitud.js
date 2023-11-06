import { Router } from "express";
import ProductoSolicitadoController from "../controllers/Producto_SolicitadoController.js";
import Orden_solicitud from "../controllers/Orden_SolicitudController.js";

const router = Router();

//Rutas orden_solicitud/*

router.post("/update/:id", Orden_solicitud.updateOrdenSolicitudById);

export default router;

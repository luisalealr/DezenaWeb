import { Router } from "express";
import vendedorRouter from "./vendedor.js";
import productoRouter from "./productos.js";
import administradorRouter from "./administrador.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("index2");
});

router.use("/vendedor", vendedorRouter);
router.use("/producto", productoRouter);
router.use("/administrador", administradorRouter);

export default router;

import { Router } from "express";
import vendedorRouter from "./vendedor.js";
import productoRouter from "./productos.js";
import administradorRouter from "./administrador.js";
import UsuarioController from "../controllers/UsuarioController.js";
const router = Router();

router.get("/", (req, res) => {
  res.render("index2");
});


router.use("/vendedor", vendedorRouter);
router.use("/producto", productoRouter);
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
  res.render("loginAdmin");
});
router.get("/loginVendedor",(req, res) => {
  res.render("loginVendedor");
});
router.get("/registro",(req, res) => {
  res.render("registro");
});

router.post("/loginAdmin",UsuarioController.getUsuarioByCorreo);
router.post("/registro",UsuarioController.createUsuarioLogin);


export default router;

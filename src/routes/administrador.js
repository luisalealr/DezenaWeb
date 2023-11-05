import { Router } from "express";

const router = Router();

//Rutas administrador/*

router.get("/agregarTaller", (req, res) => {
  res.render("agregarTaller");
});
router.get("/", (req, res) => {
  res.render("header_admin");
});
export default router;

import { Router } from "express";

const router = Router();

//Rutas administrador/*

router.get("/agregarTaller", (req, res) => {
  res.render("agregarTaller");
});

router.get("/produccion", (req, res) => {
  res.render("produccion");
});


export default router;

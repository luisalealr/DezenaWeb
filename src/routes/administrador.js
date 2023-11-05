import { Router } from "express";

const router = Router();

//Rutas administrador/*

router.get("/agregarTaller", (req, res) => {
  res.render("agregarTaller");
});

export default router;

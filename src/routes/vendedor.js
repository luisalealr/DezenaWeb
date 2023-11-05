import { Router } from "express";

const router = Router();

//Rutas vendedor/*

router.get("/", (req, res) => {
  res.render("vendedor");
});
router.get("/registrarVenta", (req, res) => {
  res.render("registrarVenta");
});

export default router;

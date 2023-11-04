import { Router } from "express";

const router = Router();

//Rutas vendedor/*

router.get("/", (req, res) => {
  res.render("vendedor");
});

export default router;

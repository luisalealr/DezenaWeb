import { Router } from "express";

const router = Router();

//Rutas producto/*

router.get("/productoMujer", (req, res) => {
  res.render("productosMujer");
});

export default router;

import { Router } from "express";
import PlanoController from "../controllers/PlanoController";

const plano = Router();

plano.get("/", PlanoController.getPlanos);
plano.post("/", PlanoController.createPlano);
plano.delete("/:id", PlanoController.deletePlano);

export default plano;
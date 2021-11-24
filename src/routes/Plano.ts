import { Router } from "express";
import PlanoController from "../controllers/PlanoController";

const plano = Router();

plano.get("/:id", PlanoController.getPlano);
plano.get("/", PlanoController.getPlanos);
plano.post("/", PlanoController.createPlano);
plano.post("/adicionaProduto", PlanoController.addProduto)
plano.delete("/:id", PlanoController.deletePlano);

export default plano;
import { Router } from "express";
import UserController from "../controllers/UserController";
import CarrinhoController from "../controllers/CarrinhoController";
import Carrinho from "../services/Carrinho";

const user = Router();

user.get("/", UserController.getUser);
user.patch("/", UserController.changePassword);
user.delete("/", UserController.autoDelete);
user.patch("/endereco", UserController.changeAddress);

user.get("/carrinho", CarrinhoController.getAll);
user.get("/carrinho/:id", CarrinhoController.getById);
user.post("/carrinho/:id", CarrinhoController.addPlano);
user.delete("/carrinho", CarrinhoController.deleteAll);
user.delete("/carrinho/:id", CarrinhoController.deleteById);

export default user;
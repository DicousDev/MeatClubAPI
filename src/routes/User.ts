import { Router } from "express";
import UserController from "../controllers/UserController";

const user = Router();

user.get("/", UserController.getUser);
user.patch("/", UserController.changePassword);
user.delete("/", UserController.autoDelete);
user.patch("/endereco", UserController.changeAddress);


export default user;
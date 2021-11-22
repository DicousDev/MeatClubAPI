import { Router } from "express";
import AuthController from "../controllers/AuthController";

const auth = Router();

auth.post("/register", AuthController.create);
auth.post("/login", AuthController.login);

export default auth;
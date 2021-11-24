import express, { Router } from "express";

import auth from "./Auth"
import user from "./User";
import product from "./Product";
import plano from "./Plano";

import AuthUser from "../middlewares/Auth";

const routes = express.Router();

routes.use("/auth", auth);
routes.use("/produto", product);
routes.use("/plano", plano);

routes.use(AuthUser);

routes.use("/user", user);

export default routes;
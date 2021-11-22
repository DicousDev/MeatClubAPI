import express from "express";

import auth from "./Auth"

const routes = express.Router();

routes.use("/auth", auth);


export default routes;
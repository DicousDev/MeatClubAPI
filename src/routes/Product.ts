import { Router } from "express";
import ProductController from "../controllers/ProductController";

const product = Router();

product.get("/", ProductController.getProducts)
product.post("/", ProductController.create);
product.delete("/:id", ProductController.deleteById);

export default product;
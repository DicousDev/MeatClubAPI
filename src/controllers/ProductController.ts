import { Request, Response } from "express";
import ProductIsNotDescriptionException from "../errors/ProductIsNotDescriptionException";
import ProductNotFoundException from "../errors/ProductNotFoundException";
import ProductService from "../services/Product";

class ProductController {
    static async getProducts(req: Request, res: Response) {

        try {
            const products = await ProductService.getAll();
            return res.status(200).json(products);
        }
        catch {
            return res.status(500).json({message: "Erro de servidor. Tente novamente mais tarde!"});
        }
    }

    static async create(req: Request, res: Response) {
        const body: any = <any> req.body;

        try {
            await ProductService.create(body.produto);
            return res.status(201).json({message: "Produto inserido no sistema com sucesso!"});
        }
        catch(error) {
            if(error instanceof ProductIsNotDescriptionException) {
                return res.status(error.statusCode).json({message: error.message});
            }

            return res.status(500).json({message: "Erro de servidor. Tente novamente mais tarde!"});
        }
    }

    static async deleteById(req: Request, res: Response) {
        const id: any = <any> req.params.id;

        try {
            await ProductService.deleteById(Number(id));
            return res.status(200).json({message: "Produto removido com sucesso!"});
        }
        catch(error) {
            
            if(error instanceof ProductNotFoundException) {
                return res.status(error.statusCode).json({message: error.message});
            }

            return res.status(500).json({message: "Erro de servidor. Tente novamente mais tarde!"});
        }
    }
}

export default ProductController;
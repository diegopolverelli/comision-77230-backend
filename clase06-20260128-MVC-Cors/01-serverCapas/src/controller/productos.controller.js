import { ProductosDAO } from "../dao/ProductosDAO.js";
import { procesaErrores } from "../utils.js";

export class ProductsController{
    static async getProducts(req, res){
        try {
            // let productos="listado productos"
            let productos=await ProductosDAO.get()

            res.setHeader('Content-Type','application/json');
            return res.status(200).json({payload:productos});
        } catch (error) {
            procesaErrores(res, error)
        }
    }

    static async createProduct(req, res){
        try {
            let {title, price}=req.body

            // validaciones por cuenta del alumno

            // let nuevoProducto=`Nuevo producto ${title}`
            let nuevoProducto=await ProductosDAO.create({title, price})
            res.setHeader('Content-Type','application/json');
            return res.status(201).json({payload:nuevoProducto});            
        } catch (error) {
            procesaErrores(res, error)
        }
    }
}
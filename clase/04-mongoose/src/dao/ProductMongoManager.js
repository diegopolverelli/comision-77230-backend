import { productsModel } from "./models/product.model.js";

export class ProductMongoManager{
    static async getProducts(){
        return await productsModel.find().lean()
    }

    static async createProduct(product){
        let nuevoProducto=await productsModel.create(product)
        return nuevoProducto.toJSON()
    }

    // resto del CRUD
}
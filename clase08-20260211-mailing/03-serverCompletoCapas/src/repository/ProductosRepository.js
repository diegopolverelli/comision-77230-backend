export class ProductosRepository{
    #productosDAO
    constructor(dao){
        this.#productosDAO=dao
    }

    async getProducts(){
        return await this.#productosDAO.get()
    }

    async getProductById(id){
        let productos=await this.getProducts()
        return productos.find(p=>p.id==id)
    }
}
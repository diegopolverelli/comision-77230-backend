

export class ClientesService{
    constructor(clientesDAO, productosDAO){
        this.clientesDAO=clientesDAO
        this.productosDAO=productosDAO
    }

    async getClientes(){
        return await this.clientesDAO.get()
    }

    async createCliente(cliente){
        return await this.clientesDAO.create(cliente)
    }
}
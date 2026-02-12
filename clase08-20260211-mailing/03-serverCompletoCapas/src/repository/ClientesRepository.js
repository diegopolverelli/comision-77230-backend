export class ClientesRepository{
    #clientesDAO
    constructor(dao){
        this.#clientesDAO=dao
    }

    async getClientes(){
        return await this.#clientesDAO.get()
    }

    async getClienteById(id){
        let clientes=await this.getClientes()
        return clientes.find(c=>c.id==id)
    }

    async updateCliente(id, cliente){
        return await this.#clientesDAO.update(id, cliente)
    }
}
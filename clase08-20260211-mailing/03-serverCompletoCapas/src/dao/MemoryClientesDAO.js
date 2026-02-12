const clientes=[
    {
        id:1, 
        razonSocial:"Cliente 001", 
        idTributaria: "99-99999999-1", 
        compras:[],
    },
    {
        id:2, 
        razonSocial:"Cliente 002", 
        idTributaria: "99-99999999-2",
        compras:[],
    },
]


export class MemoryClientesDAO{
    constructor(){}

    get(){
        // throw new Error("error en DAO...!!!")
        return clientes
    }

    update(id, cliente){
        let indiceCliente=clientes.findIndex(c=>c.id==id)
        if(indiceCliente==-1) throw new Error(`Cliente inexistente: ${id}`)

        clientes[indiceCliente]=cliente
    }

    // getById, delete, create
}
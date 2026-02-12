export class ClientesService{
    #clientesRepository
    #productosRepository
    #ticketsRepository
    constructor(clientesRepo, productosRepo, ticketsRepo){
        this.#clientesRepository=clientesRepo
        this.#productosRepository=productosRepo
        this.#ticketsRepository=ticketsRepo
    }

    async getClientes(){
        return await this.#clientesRepository.getClientes()
    }

    async generaTicket(cid, productos=[]){
        let cliente=await this.#clientesRepository.getClienteById(cid)
        if(!cliente){
            throw new Error(`No existe el cliente con id ${cid}`)
        }
        console.log(cliente)

        let error=false
        let errores=[]
        let total=0

        // no puedo usar await con forEach, map, etc... 
        for(let i=0; i<productos.length; i++){
            let cantidad=productos[i].cantidad
            let pid=productos[i].pid
            let producto=await this.#productosRepository.getProductById(pid)
            if(!producto || producto.stock<cantidad){
                error=true
                productos[i].error=true
                errores.push(`Problemas con el producto de id ${pid}`)
            }else{
                productos[i].error=false
                productos[i].descrip=producto.descrip
                productos[i].price=producto.price
                productos[i].stock=producto.stock
                productos[i].subtotal=producto.price * cantidad
                total=total+producto.price * cantidad

                // descuento de stock...!!!
            }
        }

        let productosOK=productos.filter(p=>p.error==false)
        if(productosOK.length==0){
            throw new Error(`No existen ítems en condiciones de ser adquiridos: ${JSON.stringify(errores)}`) 
        }


        let ticket={
            nroComp: Date.now(), 
            fecha: new Date().toUTCString(), 
            cliente: cliente.razonSocial, 
            productos: productosOK, 
            total, 
            errores,
        }

        ticket=await this.#ticketsRepository.createTicket(ticket)

        // actualizar cliente compras o ctacte
        cliente.compras.push(ticket)
        this.#clientesRepository.updateCliente(cid, cliente)

        return ticket
    }

}
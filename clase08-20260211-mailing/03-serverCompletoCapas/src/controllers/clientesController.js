// import { MemoryClientesDAO as DAO } from "../dao/MemoryClientesDAO.js"

import { clientesService } from "../services/index.js"

// let clientesService=new DAO()

async function getClientes(req,res){

    try {
        // let clientes=await clientesService.get()
        let clientes=await clientesService.getClientes()
    
        res.status(200).json({clientes})
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal Server Error`})
    }
}

async function comprar(req, res){
    try {
        let {cid, productos}=req.body

        // validaciones pertinentes
        if(!Array.isArray(productos)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`productos debe ser un array de productos validos`})
        }

        let ticket=await clientesService.generaTicket(cid, productos)
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:ticket});

    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal Server Error`, info: error.message})
    }
}

export default {getClientes, comprar}
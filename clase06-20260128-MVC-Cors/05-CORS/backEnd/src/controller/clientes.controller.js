// import { ClientesDAO } from "../dao/ClientesDAO.js";
import { clientesService } from "../service/index.js";
import { procesaErrores } from "../utils.js"

export const getClientes=async(req, res)=>{
    try {
        // let clientes="Listado Clientes"
        // let clientes=await ClientesDAO.get()
        let clientes=await clientesService.getClientes()
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:clientes});
    } catch (error) {
        procesaErrores(res, error)
    }
}

export const createCliente=async(req, res)=>{
    try {
        let {razonSocial, cuit, saldo}=req.body

        // validaciones ustedes...!!!

        // let nuevoCliente=`Nuevo Cliente ${razonSocial}`
        // let nuevoCliente=await ClientesDAO.create({razonSocial, cuit, saldo})
        let nuevoCliente=await clientesService.createCliente({razonSocial, cuit, saldo})
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({payload: nuevoCliente});
    } catch (error) {
        procesaErrores(res, error)
    }
}
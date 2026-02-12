import { MemoryClientesDAO } from "../dao/MemoryClientesDAO.js";
import { MemoryProductosDAO } from "../dao/MemoryProductosDAO.js";
import { MemoryTicketsDAO } from "../dao/MemoryTicketsDAO.js";
import { ClientesRepository } from "../repository/ClientesRepository.js";
import { ProductosRepository } from "../repository/ProductosRepository.js";
import { TicketsRepository } from "../repository/TicketsRepository.js";
import { ClientesService } from "./Clientes.service.js";


const clientesDAO=new MemoryClientesDAO()
const clientesRepo=new ClientesRepository(clientesDAO)

const productosDAO=new MemoryProductosDAO()
const productosRepo=new ProductosRepository(productosDAO)

const ticketsDAO=new MemoryTicketsDAO()
const ticketsRepo=new TicketsRepository(ticketsDAO)

export const clientesService=new ClientesService(
    clientesRepo, productosRepo, ticketsRepo
)
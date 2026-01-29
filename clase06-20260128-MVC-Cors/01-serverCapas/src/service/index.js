import { ClientesDAO } from "../dao/ClientesDAO.js";
import { ProductosDAO } from "../dao/ProductosDAO.js";
import { ClientesService } from "./clientes.service.js";

// const clientesDAO=new ClientesDAO()

export const clientesService=new ClientesService(ClientesDAO, ProductosDAO)
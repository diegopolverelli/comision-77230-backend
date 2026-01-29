import { Router } from 'express';
import { createCliente, getClientes } from '../controller/clientes.controller.js';
export const router=Router()

router.get('/', getClientes)
router.post('/', createCliente)
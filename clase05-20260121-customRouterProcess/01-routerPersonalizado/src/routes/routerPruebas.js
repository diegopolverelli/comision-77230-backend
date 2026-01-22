import { Router } from 'express';
import { controllerHandler, midd01, midd02, midd03, midd04 } from '../middlewares/middlewares.js';
export const router=Router()

router.get('/', midd01, (req,res)=>{

    res.setHeader('Content-Type','application/json')
    res.status(200).json({message:"router pruebas - GET"})
})

const funciones=[midd01, midd02, midd03, midd04, controllerHandler]

router.get("/prueba2", funciones)
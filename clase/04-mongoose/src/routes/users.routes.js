import { Router } from 'express';
export const router=Router()

router.get('/',(req,res)=>{

    let usuarios=`Listado usuarios`

    res.setHeader('Content-Type','application/json')
    res.status(200).json({usuarios})
})

router.post("/", (req, res)=>{


    res.setHeader('Content-Type','application/json');
    return res.status(201).json({payload:`Nuevo usuario creado`});
})
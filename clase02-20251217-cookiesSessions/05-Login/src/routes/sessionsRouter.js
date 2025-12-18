import { Router } from 'express';
import { UsuariosManagerMongo } from '../dao/UsuariosManagerMONGO.js';
import { createHash } from '../utils.js';
export const router=Router()

let usersManager=new UsuariosManagerMongo()

router.post('/register',async(req,res)=>{

    let {nombre, email, password}=req.body
    if(!nombre || !email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`nombre, email, password son requeridos`})
    }

    // resto validaciones pertinentes
    try {
        let existe=await usersManager.getBy({email})
        if(existe){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Ya hay usuarios registrados con email ${email}`})
        }

        password=createHash(password)

        let nuevoUsuario=await usersManager.create({nombre, email, password})

        res.setHeader('Content-Type','application/json')
        res.status(200).json({message:`Registro exitoso...!!!`, nuevoUsuario})
    } catch (error) {
        
    }
    

})
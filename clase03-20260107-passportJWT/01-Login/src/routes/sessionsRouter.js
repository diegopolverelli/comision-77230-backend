import { Router } from 'express';
import { UsuariosManagerMongo } from '../dao/UsuariosManagerMONGO.js';
import { createHash, validaPass } from '../utils.js';
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
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal Server Error`})
    }
})

router.post('/login',async(req,res)=>{

    let {email, password}=req.body
    if(!email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`email, password son requeridos`})
    }

    try {
        let usuario=await usersManager.getBy({email})
        if(!usuario){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`Credenciales inválidas`})
        }

        if(!validaPass(password, usuario.password)){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`Credenciales inválidas`})
        }

        // eliminar datos sensibles:
        delete usuario.password

        req.session.usuario=usuario

        res.setHeader('Content-Type','application/json')
        res.status(200).json({message:`Login exitoso...!!!`, usuarioLogueado: usuario})
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal Server Error`})
    }
})

router.get("/logout", (req, res)=>{
    req.session.destroy(e=>{
        if(e){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error al realizar logout`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Logout exitoso...!!!"});        
    })
})
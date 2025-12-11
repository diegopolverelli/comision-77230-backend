// import { Router } from 'express';
// export const router=Router()
import express from "express"
// import { ProductManager } from "../dao/ProductManager.js"
import { ProductMongoManager as ProductManager } from "../dao/ProductMongoManager.js"
export const router=express.Router()


router.use(
    (req, res, next)=>{

        console.log(`Middleware online a nivel router`)

        next()
    }
)

router.get('/',async(req,res)=>{

    // let productos="listado productos"
    let productos=await ProductManager.getProducts()

    res.setHeader('Content-Type','application/json')
    res.status(200).json({productos})
})

router.post("/", async(req, res)=>{
    try {

        // validar previamente

        let nuevoProducto=await ProductManager.createProduct(req.body)

        res.setHeader('Content-Type','application/json');
        return res.status(201).json({payload:`Nuevo producto generado!`, nuevoProducto});
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }
})


// resto CRUD
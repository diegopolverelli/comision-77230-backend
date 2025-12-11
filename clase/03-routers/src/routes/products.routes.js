// import { Router } from 'express';
// export const router=Router()
import express from "express"
import { ProductManager } from "../dao/ProductManager.js"
export const router=express.Router()

router.use(
    (req, res, next)=>{

        console.log(`Middleware online a nivel router`)

        next()
    }
)

router.get('/',(req,res)=>{

    // let productos="listado productos"
    let productos=ProductManager.getProducts()

    res.setHeader('Content-Type','application/json')
    res.status(200).json({productos})
})


// resto CRUD
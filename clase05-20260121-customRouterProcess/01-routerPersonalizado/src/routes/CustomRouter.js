import {Router} from "express"

export class CustomRouter{
    #router
    // nombre
    constructor(){
        this.#router=Router()
        // this.nombre
        this.init()
    }

    init(){}

    getRouter(){
        return this.#router
    }

    get(ruta, ...funciones){   // los ... son en este contexto el operador REST
        this.#router.get(ruta, this.customResponses, this.procesaFunciones(funciones))
    }

    post(ruta, ...funciones){   // los ... son en este contexto el operador REST
        this.#router.post(ruta, this.customResponses, this.procesaFunciones(funciones))
    }

    put(ruta, ...funciones){   // los ... son en este contexto el operador REST
        this.#router.put(ruta, this.customResponses, this.procesaFunciones(funciones))
    }

    delete(ruta, ...funciones){   // los ... son en este contexto el operador REST
        this.#router.delete(ruta, this.customResponses, this.procesaFunciones(funciones))
    }

    procesaFunciones=(funciones=[])=>{   // funciones: (req, res, next)=>{}, (req, res)=>{}
        return funciones.map(fn=>{
            return (...argumentos)=>{   // ... son acá REST
                try {
                    return fn(...argumentos)  // ... son acá SPREAD
                } catch (error) {
                    return argumentos[1].internalServerError(error.message)
                }
            }
        })
    }

    customResponses=(req, res, next)=>{
        res.success=(message)=>res.status(200).json({status:"OK", message, date: new Date().toUTCString()})
        res.successCreate=(message, objeto)=>res.status(201).json({status:"OK", message, objeto, date: new Date().toUTCString()})
        res.badRequest=(error)=>res.status(400).json({status:"bad Request", error, date: new Date().toUTCString()})
        res.unauthorize=(error)=>res.status(401).json({status:"unauthorize", error, date: new Date().toUTCString()})
        res.internalServerError=(error)=>res.status(400).json({status:"internal Server Error", error, date: new Date().toUTCString()})
        
        next()
    }

}

// const router1=new CustomRouter()
// router1.nombre
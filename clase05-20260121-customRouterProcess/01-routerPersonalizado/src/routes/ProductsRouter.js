import { midd01 } from "../middlewares/middlewares.js";
import { CustomRouter } from "./CustomRouter.js";

export class ProductsRouter extends CustomRouter {
    init() {
        this.get("/", (req, res) => {

            if(req.query.nombre=="juan"){
                return res.badRequest("Juan no tiene permisos para ver productos")
            }

            if(req.query.error){
                throw new Error("Error de prueba...")
            }

            // res.setHeader('Content-Type', 'application/json');
            // return res.status(200).json({ payload: "listado de productos" });
            return res.success("listado de productos")
        })

        this.get(
            "/precios",
            midd01,
            (req, res, next)=>{
                console.log(`Alguien listo los precios...!!!`)
                next()
            },
            (req, res) => {

                // res.setHeader('Content-Type', 'application/json');
                // return res.status(200).json({ payload: "Lista de precios" });
                return res.success("Lista de precios")
            }
        )

        this.post("/", (req, res)=>{

            // validaciones... 

            res.successCreate("Producto creado con éxito", {code:"pr0001", title:"Placard", price:180000})
        })
    }
}
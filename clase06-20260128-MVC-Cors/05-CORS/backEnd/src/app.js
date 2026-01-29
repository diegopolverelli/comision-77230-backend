import express from 'express';
import cors from "cors"
import { router as productsRouter } from './routes/productosRouter.js';
import { router as clientesRouter } from './routes/clientesRouter.js';
const PORT=3000;

const app=express();

app.use(cors())
// app.use(cors({}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/products", productsRouter)
// app.use("/api/products", cors(), productsRouter)
app.use("/api/customers", clientesRouter)

app.get('/', (req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

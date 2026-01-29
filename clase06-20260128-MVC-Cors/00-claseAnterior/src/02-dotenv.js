// process.loadEnvFile("./.env")
import dotenv from "dotenv"

dotenv.config(
    {
        path: "./.env",
        override: true, 
        quiet: true
    }
)

// console.log("PRUEBA_PORT:", process.env.PRUEBA_PORT)
// console.log("PRUEBA_SECRET", process.env.PRUEBA_SECRET)
// console.log(process.env.PORT)
// console.log(process.env.DB_NAME)
// console.log(process.env.SECRET)

import express from 'express';
const PORT=process.env.PORT;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

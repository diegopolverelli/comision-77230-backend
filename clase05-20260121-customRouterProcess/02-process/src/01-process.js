import express from 'express';
import fs from "fs"
// console.log("hola")

console.log(`process id:`, process.pid)
console.log(`uso de memoria:`, process.memoryUsage())
console.log(`directorio actual:`, process.cwd())

// console.log(`variables de entorno:`, process.env)
console.log(`JAVA_HOME var ent.:`, process.env.JAVA_HOME)
console.log(`PORT var ent.:`, process.env.PRUEBA_PORT)

// console.log(`Argumentos consola:`, process.argv)

// const [ rn, rs, ...argumentos ] = process.argv   // ... son rest
const [ , , ...argumentos ] = process.argv   // ... son rest

console.log(argumentos)

let indicePort

indicePort=argumentos.findIndex(a=>a=="--port")
if(indicePort==-1){
    console.log(`Es obligatorio indicar el --port <PORT>`)
    process.exit()
}

// const PORT=3000;
const PORT=argumentos[indicePort+1];

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

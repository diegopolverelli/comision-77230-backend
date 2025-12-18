import express from 'express';
import sessions from "express-session"
import { config } from './config/config.js';
import { auth } from './middleware/auth.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(
    sessions({
        secret: config.SECRET, 
        resave: true, 
        saveUninitialized: true
    })
)


app.get('/',(req,res)=>{

    let texto
    if(req.session.contador){
        req.session.contador=req.session.contador+1
        texto=`visitas: ${req.session.contador}`
    }else{
        req.session.contador=1
        texto=`Bienvenido`
    }

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({texto});
})

// registro, login, logout
let usuarios=[
    {id:1, nombre:"Luciana", email:"luciana@test.com", password:"123", rol:"user"},
    {id:2, nombre:"Juan", email:"juan@test.com", password:"123", rol:"user"},
    {id:3, nombre:"Romina", email:"romina@test.com", password:"123", rol:"admin"},
]

app.post("/login", (req, res)=>{
    let {nombre, password} = req.body
    if(!nombre || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`nombre | password son requeridos`})
    }

    let usuario=usuarios.find(u=>u.nombre==nombre && u.password==password)
    if(!usuario){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Credenciales invalidas`})
    }

    usuario={...usuario}
    delete usuario.password // nunca enviar datos sensibles
    req.session.usuario=usuario

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`Login exitoso para ${usuario.nombre}`});
})

app.get("/logout", (req, res)=>{
    req.session.destroy(error=>{
        if(error){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error al procesar Logout... :(`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Logout exitoso"});
    })
    
})


app.get("/datos", auth, (req, res)=>{


    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`Datos privados, usuario ${req.user.nombre}`});
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

import express from 'express';
import cookieParser from "cookie-parser"
import { config } from './config/config.js';
const PORT=config.PORT;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(cookieParser("CoderCoder123"))
app.use(cookieParser(config.SECRET))
app.use(express.static('./src/public'))

app.get('/',(req,res)=>{

    console.log(req.headers.cookie)
    let auxiliar=req.headers.cookie.split(";")
    console.log(auxiliar)
    let cookie01=auxiliar[0].split("=")
    console.log(`Valor de ${cookie01[0]} = ${cookie01[1]}`)
    let cookie02=auxiliar[1].split("=")
    console.log(`Valor de ${cookie02[0]} = ${cookie02[1]}`)


    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get("/setcookies", (req, res)=>{

    let datos={
        fontSize: 18,
        theme: "dark", 
        color: "red"
    }

    res.cookie("cookie01server", datos, {})
    res.cookie("cookie02serverVto", datos, {maxAge: 1000*5})
    res.cookie("cookie03serverVto", datos, {expires: new Date(2025, 11, 18)})
    res.cookie("cookie04serverVtoSigned", datos, {expires: new Date(2025, 11, 18), signed: true})


    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`Cookies generadas...!!!`});
})


app.get("/getcookies", (req, res)=>{

    let cookies=req.cookies
    let signedCookies=req.signedCookies

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:{
        cookies, 
        signedCookies,
        color: req.cookies.cookie03serverVto?.color
    }});
})

app.get("/delcookies", (req, res)=>{

    // res.clearCookie("cookie03serverVto")
    let cookies=Object.keys(req.cookies)
    cookies.forEach(c=>res.clearCookie(c))

    cookies=Object.keys(req.signedCookies)
    cookies.forEach(c=>res.clearCookie(c))

    let prueba={
        nombre:"Juan", 
        apellido: "Molina"
    }

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Cookies eliminadas"});
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

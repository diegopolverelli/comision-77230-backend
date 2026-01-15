import jwt from "jsonwebtoken"
export const auth=(req, res, next)=>{
    // if(!req.session.usuario){
    // if(!req.headers.authorization){
    if(!req.cookies.cookieToken){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`No hay usuarios autenticados`})
    }

    // BEARER adsfasdf.asdfasdfasdfasf.338adsfasdsfa
    // let token=req.headers.authorization.split(" ")[1]
    let token=req.cookies.cookieToken

    try {
        let usuario=jwt.verify(token, "CoderCoder123")
        req.user=usuario
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Error: ${error.message}`})
    }

    
    next()
}
import passport from "passport"
import passportJWT from "passport-jwt"
import local from "passport-local"
import fs from "fs"

const buscarToken=req=>{
    let token=null

    if(req.cookies.cookieToken){
        token=req.cookies.cookieToken
    }

    return token
}

export const initPassport=()=>{
    // paso 1
    passport.use("login", new local.Strategy(
        {
            usernameField: "email"
        }, 
        async(username, password, done)=>{
            try {
                let usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf8'))

                let usuario = usuarios.find(u => u.email === username && u.password === password)
                if (!usuario){
                    // return res.status(400).send({ error: `Error credenciales` })
                    return done(null, false, {message:`Credenciales inválidas`})
                } 

                return done(null, usuario)
                            
            } catch (error) {
                return done(error)
            }
        }
    ))

    
    passport.use("current", new passportJWT.Strategy(
        {
            secretOrKey: "CoderCoder123", 
            jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([buscarToken])
        },
        async(usuario, done)=>{
            try {
                // return done(null, false)
                if(usuario.nombre=="Juan"){
                    return done(null, false, {message:`El sr. Juan tiene el acceso temporalmente inhabilitado. Contacte con RRHH`})
                }
                return done(null, usuario)
            } catch (error) {
                return done(error)
            }
        }
    ))


    // paso 1'   // se configura solo si uso SESSION
    // passport.serializeUser()
    // passport.deserializeUser()
}
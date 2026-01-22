import express from 'express';
import fs from 'fs'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import passport from "passport"
import passportJWT from "passport-jwt"
import cookieParser from "cookie-parser"
import { buscarToken } from './utils.js';
import { config } from './config/config.js';
import { auth, isAdmin, isUser } from './middlewares/auth.js';

const PORT = config.PORT;


const app = express();

app.use(cookieParser())
app.use(passport.initialize())
// app.use(passport.session())  // solo si usamos express-sessions

passport.use("current", new passportJWT.Strategy(
    {
        secretOrKey: config.SECRET,
        jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([buscarToken])
    },
    async (usuario, done) => {
        try {
            return done(null, usuario)
        } catch (error) {
            return done(error)
        }
    }
))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
})

let usuarios = []
if (fs.existsSync('./src/usuarios.json')) {
    usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf-8'))
}

app.post('/registro', (req, res) => {
    let { nombre, email, password } = req.body
    if (!nombre || !email || !password) return res.status(400).send({ error: 'Ingrese todos los datos' })

    let usuario = usuarios.find(u => u.email === email)
    if (usuario) return res.status(400).send({ error: `El usuario ${email} ya existe en la DB` })

    let id = 1
    if (usuarios.length > 0) id = usuarios[usuarios.length - 1].id + 1

    usuario = {
        id,
        nombre,
        email,
        password: bcrypt.hashSync(password, 10),
        rol: "user"
    }

    usuarios.push(usuario)

    fs.writeFileSync('./src/usuarios.json', JSON.stringify(usuarios, null, 5))

    res.json({
        usuarioCreado: usuario
    })
})

app.post('/login', (req, res) => {
    let { email, password } = req.body
    if (!email || !password) return res.status(400).send({ error: 'Ingrese email y password' })

    usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf8'))

    let usuario = usuarios.find(u => u.email === email)
    if (!usuario) return res.status(400).send({ error: `Error credenciales` })

    if (!bcrypt.compareSync(password, usuario.password)) return res.status(400).send({ error: `Error credenciales` })

    let token = jwt.sign(usuario, config.SECRET, { expiresIn: 60 * 15 })

    res.cookie("codertoken", token)
    return res.status(200).json({
        usuarioLogueado: usuario,
    })

})

app.get(
    '/usuario',
    passport.authenticate("current", { session: false }),
    // isUser,
    auth(["Admin", "user", "premium"]),
    (req, res) => {


        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            mensaje: 'Perfil usuario',
        });
    }
);


app.get(
    '/admin',
    passport.authenticate("current", { session: false }),
    // isAdmin,
    auth(["Admin", "root"]),
    (req, res) => {


        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            mensaje: 'Perfil admin',
        });
    }
);


const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

import express from 'express';
import { logger } from './middlewares/logger.js';
import { format } from './middlewares/format.js';
import { auth } from './middlewares/auth.js';

import { router as usersRouter } from './routes/users.routes.js';
import { router as productsRouter } from './routes/products.routes.js';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger)

app.use("/api/users", usersRouter)
app.use("/api/products", productsRouter)

app.get('/', (req, res) => {

    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
})

app.get('/prueba', logger, (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: `Ruta prueba` });
})

app.post(
    '/users',
    format,
    auth,
    (req, res) => {

        console.log(`Procesando user...!!!`)

        let { name, email } = req.body
        if (!name || !email) {

            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `name | email son requridos` })
        }

        let nuevoUsuario = {
            name, email, cod: req.code
        }

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ nuevoUsuario });
    }
)

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

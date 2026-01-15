import { fileURLToPath } from 'url';
import { dirname } from 'path';

import passport from 'passport';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const passportCall = estrategia => {
    return function (req, res, next) {
        passport.authenticate(estrategia, function (err, user, info, status) {
            if (err) { return next(err) }   // return done(error)
            if (!user) {
                // return res.redirect('/signin')
                return res.status(401).json({
                    error: info.message?info.message:info.toString(), 
                    detalle: `Contacte al administrador`
                })
            } // return done(null, false)
            // res.redirect('/account');  
            req.user=user// return done(null, user)
            next()
        })(req, res, next);
    }
}




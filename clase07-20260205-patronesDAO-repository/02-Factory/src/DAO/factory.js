import { config } from "../config/config.js";
import { Singleton } from "../config/Singleton.js";


let persistence = config.PERSISTENCE
export let DAO

switch (persistence) {
    case "MONGODB":
        Singleton.conectarDB(config.MONGO_URL, config.DB_NAME)
        DAO=(await import("./usuariosMongoDAO.js")).usuariosMongoDAO
        break;
    case "FS":
        let auxiliarDAO=await import("./usuariosFsDAO.js")
        DAO=auxiliarDAO.usuariosFsDAO
        break;

    default:
        throw new Error("Persistencia incorrecta; revise parametros")
}
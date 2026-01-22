import {fileURLToPath} from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const buscarToken=req=>{
    let token=null

    if(req.cookies.codertoken){
        token=req.cookies.codertoken
    }

    return token
}




import dotenv from "dotenv"
import {Command, Option} from "commander"

const program=new Command()
program.option("-d, --debug", "Activa el mode debug", )
// program.requiredOption("-p, --port <PORT>", "Puerto", )
program.option("-u, --user <USER>", "User que corre el script", "root")
program.addOption(new Option("-m, --mode <MODE>", "Entorno de trabajo").choices(["dev", "prod"]).default("prod"))

program.parse()
// const opts=program.opts()

// console.log(opts)

const {mode}=program.opts()

dotenv.config({
    path: mode=="prod"?"./.env.prod":"./.env.dev", 
    quiet: true
})

export const config={
    PORT: process.env.PORT, 
    MONGO_URL: process.env.MONGO_URL, 
    SECRET: process.env.SECRET, 
    DB_NAME: process.env.DB_NAME
}
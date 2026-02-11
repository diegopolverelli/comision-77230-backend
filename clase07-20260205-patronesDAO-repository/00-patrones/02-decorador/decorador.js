
// @decorador(parametro1, parametro2)  // forma habitual de encontrar decoradores (en frameworks)
const suma=(a,b)=>{

    return a+b
}

console.log(suma(4,5))


// @Controller('cats')
// export class CatsController {

//   @Get()
//   findAll() {
//     return 'This action returns all cats';
//   }
// }


const decoradorLog=(fn)=>{
    return ( ...argumentos)=>{   // ... son el operador REST
        console.log(`La función ${fn.name} se ha ejecutado el ${new Date().toUTCString()}`)
        console.time("Demora en la ejecución de la funcion "+fn.name)
        
        let resultado=fn( ...argumentos)   // ... son el operador SPREAD

        console.timeEnd("Demora en la ejecución de la funcion "+fn.name)

        return resultado
    }
}

const sumaDecorada=decoradorLog(suma)


console.log(sumaDecorada(10,4))
console.log(suma(4,5))

const saludar=nombre=>{
    return `Hola ${nombre}...!!!`
}


console.log(saludar("Juan"))
const saludarConLog=decoradorLog(saludar)

console.log(saludarConLog("Mariana"))
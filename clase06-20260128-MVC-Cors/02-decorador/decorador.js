
// @decorador(parametro1, parametro2)  // forma habitual de encontrar decoradores (en frameworks)
const suma=(a,b)=>{
    return a+b
}

console.log(suma(4,5))


const decoradorLog=(fn)=>{
    return (...argumentos)=>{   // ... son operador rest

        // agregar lógica...
        console.log(`La función ${fn.name} se ejecuto en ${new Date().toUTCString()}`)

        return fn(...argumentos)   // ... son el operador spread
    }
}


const sumaDecorada=decoradorLog(suma)

console.log(sumaDecorada(10, 4))
console.log(suma(4,5))

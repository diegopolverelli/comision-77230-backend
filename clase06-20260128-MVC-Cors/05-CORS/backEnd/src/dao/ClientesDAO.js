
const clientes=[
    {
        "id": 1,
        "razonSocial": "Empresa 001",
        "cuit": "30-88888888-9",
        "saldo": 2000000, 
        "masVendidos": [
            {
                id: 1, cant: 9800
            },
            {
                id: 7, cant: 4600
            },
        ]
    },
    {
        "id": 2,
        "razonSocial": "Empresa 002",
        "cuit": "30-88888888-7",
        "saldo": 2900000,
        "masVendidos": [
            {
                id: 5, cant: 1800
            },
            {
                id: 3, cant: 970
            },
        ]
    },    
]

export class ClientesDAO{
    static async get(){
        return clientes
    }

    static async create(cliente){
        let id=1
        if(clientes.length>0){
            id=Math.max(...clientes.map(d=>d.id))+1
        }

        let nuevoCliente={
            id, 
            ...cliente
        }

        clientes.push(nuevoCliente)

        return nuevoCliente
    }
}
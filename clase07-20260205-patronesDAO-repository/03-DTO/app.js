import { UsersDTO } from "./usersDTO.js"

let userReq={
    nombre:"Juan", 
    apellido:"Martinez", 
    email: "jmartinez@test.com"
}


let userDB=new UsersDTO(userReq)


console.log({userReq})
console.log(userDB)
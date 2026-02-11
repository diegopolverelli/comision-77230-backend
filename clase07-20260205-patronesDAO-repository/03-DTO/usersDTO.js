export class UsersDTO{
    constructor(usuario){
        this.firstName=usuario.nombre.toUpperCase()
        this.lastName=usuario.apellido.toUpperCase()
        this.fullName=`${this.firstName} ${this.lastName}`
        this.email=usuario.email
        this.role="user"
        this.username=usuario.email.split("@")[0]
    }
}
const divDatos=document.getElementById("datos")
const btnDatos=document.getElementById("btnDatos")

const divMensaje=document.getElementById("mensaje")
const inputEmail=document.getElementById("email")
const inputPass=document.getElementById("password")
const btnSubmit=document.getElementById("btnSubmit")

btnSubmit.addEventListener("click", async(e)=>{

    e.preventDefault()

    let email=inputEmail.value 
    let password=inputPass.value

    if(!email || !password){
        divMensaje.textContent=`Complete email y contraseña`

        setTimeout(() => {
            divMensaje.textContent=""
        }, 3000);
        return 
    }

    const response=await fetch("/login", {
        method: "post", 
        headers:{
            "Content-Type":"application/json"
        }, 
        body: JSON.stringify({email, password})
    })

    if(response.status>=400){

        let {error}=await response.json()
        divMensaje.textContent=`Error: ${error}`

        setTimeout(() => {
            divMensaje.textContent=""
        }, 3000);
        return 
    }

    let {usuarioLogueado, token}=await response.json()
    localStorage.setItem("CoderToken", token)
    divMensaje.textContent=`Login exitoso para ${usuarioLogueado.nombre}...!!!`

})

btnDatos.addEventListener("click", async(e)=>{
    e.preventDefault()

    const response=await fetch("/usuario", {
        headers:{
            "authorization":`BEARAR ${localStorage.getItem("CoderToken")}`
        }
    })
    if(response.status>=400){
        let {error}=await response.json()
        divDatos.textContent=`Error: ${error}`
        return 
    }

    let {mensaje}=await response.json()
    divDatos.textContent=mensaje
})

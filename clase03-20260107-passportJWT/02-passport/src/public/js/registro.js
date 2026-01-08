const divMensaje=document.getElementById("mensaje")
const inputNombre=document.getElementById("nombre")
const inputEmail=document.getElementById("email")
const inputPassword=document.getElementById("password")

const btnInput=document.getElementById("btnSubmit")

btnInput.addEventListener("click", async(e)=>{
    e.preventDefault()

    let nombre=inputNombre.value 
    let email=inputEmail.value 
    let password=inputPassword.value 

    if(!nombre || !email || !password){
        divMensaje.textContent="Complete los datos...!!!"
        setTimeout(() => {
            divMensaje.textContent=""
        }, 3000);
        return
    }

    let body={nombre, email, password}

    let response=await fetch("/api/sessions/register", {
        method: "post", 
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(body)
    })
    if(response.status>=400){
        let {error}=await response.json()
        divMensaje.textContent=`Error en el registro: ${error}`
        setTimeout(() => {
            divMensaje.textContent=""
        }, 3000);
        return 
    }

    window.location.href="/login?mensaje=Registro exitoso para "+nombre
})
const divDatos=document.getElementById("datos")
const btnDatos=document.getElementById("btnDatos")

btnDatos.addEventListener("click", async(e)=>{
    e.preventDefault()

    try {
        const response=await fetch("http://localhost:3000/api/customers")
        if(response.status>=400){
            const {error}=await response.json()
            divDatos.textContent=`Error response: ${error}`
            return 
        }
    
        let {payload}=await response.json()
        divDatos.textContent=JSON.stringify(payload)
    } catch (error) {
        divDatos.textContent=`Error catch...: ${error.message}`
    }

})
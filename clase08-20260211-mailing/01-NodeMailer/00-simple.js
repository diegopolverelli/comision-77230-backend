import nodemailer from "nodemailer"

// bhvu mxxb cpsg devi

const transporter=nodemailer.createTransport(
    {
        // host: "mail.miempresa.com.ar",
        service: "gmail", 
        port: 587, 
        auth: {
            user: "diegopolverelli@gmail.com",
            pass: "bhvu mxxb cpsg devi",
        }
    }
)

export const enviar=()=>{
    return transporter.sendMail(
        {
            from: "Diego Polverelli diegopolverelli@gmail.com",
            to: "diegopolverelli@hotmail.com, diepol@yahoo.com",
            subject: "Prueba mail simple", 
            // text: "prueba...!!!",
            html: `
            <h2>Prueba email</h2>
            <br><p><strong style="color:blue;">Prueba párrafo</strong></p>
            
            ` 
        }
    )
}

enviar()
    .then(resultado=>{
        // console.log(resultado)
        if(resultado.rejected.length>0){
            console.log(`Error en algun envío...`)
        }else{
            console.log("Mensaje enviado...!!!")
        }
    })
    .catch(e=>{
        console.log(`Error: ${e.message}`)
    })
    
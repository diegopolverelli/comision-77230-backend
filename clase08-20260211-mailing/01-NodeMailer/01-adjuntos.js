import nodemailer from "nodemailer"

const transport=nodemailer.createTransport(
    {
        service: "gmail", 
        port: 587, 
        auth: {
            user: "diegopolverelli@gmail.com", 
            pass: "bhvu mxxb cpsg devi",
        },
    }
)

const enviar=()=>{
    return transport.sendMail(
        {
            from: "Diego Polverelli diegopolverelli@gmail.com",
            to: "diegopolverelli@hotmail.com, diepol@yahoo.com",
            subject: "Prueba mail con adjuntos", 
            // text: "prueba...!!!",
            html: `
            <h2>Prueba email</h2>
            <br><p><strong style="color:blue;">Prueba párrafo</strong></p>
            
            `, 
            attachments: [
                {
                    path: "./images/diego10.jpg", 
                    filename: "diegote.jpg",
                }, 
                {
                    path: "./images/lio.jpg", 
                    filename: "lio.jpg",
                }, 
                {
                    path: "./images/lio2.jpg", 
                    filename: "lio2.jpg",
                },
            ]
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
    // .finally()
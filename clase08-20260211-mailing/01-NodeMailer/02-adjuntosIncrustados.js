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

let cliente="Cliente 001"

const enviar=()=>{
    return transport.sendMail(
        {
            from: "Diego Polverelli diegopolverelli@gmail.com",
            to: "diegopolverelli@hotmail.com, diepol@yahoo.com",
            subject: "Prueba mail con adjuntos incrustados", 
            // text: "prueba...!!!",
            html: `
            <h2>Prueba email</h2>
            <br><p><strong style="color:blue;">Prueba párrafo. Compra OK para ${cliente}</strong></p>
            <img src="cid:archivo01" width="300"/>
            <div> 
            <p>Lio...
            
            <img src="cid:archivo02" width="300"/>
            </p>
            </div>
            <img src="cid:archivo03" width="300"/>
            `, 
            attachments: [
                {
                    path: "./images/diego10.jpg", 
                    filename: "diegote.jpg",
                    cid: "archivo01", 
                }, 
                {
                    path: "./images/lio.jpg", 
                    filename: "lio.jpg",
                    cid: "archivo02",
                }, 
                {
                    path: "./images/lio2.jpg", 
                    filename: "lio2.jpg",
                    cid: "archivo03",
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
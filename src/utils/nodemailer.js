import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "",
        pass: ""
    }
})

 export const  sendEmailChangePassword = async (email, linkChangePassword) => {
    const mailOptions = {
      from: 'juancmg002@gmail.com',
      to: email,
      subject: 'Recuperación de email',
      text: `Haz click en el siguiente enlace para cambiar tu contraseña: ${linkChangePassword}`,
   
      html: `<p>Haz click en el siguiente enlace para cambiar tu contraseña:</p><a href="${linkChangePassword}" ><button>Cambiar contraseña</button></a>`
    }

    transporter.sendMail(mailOptions, (error,info)=>{
        if(error){
            console.log("Error al enviar correo de cambio de contraseña")
        }else{
            console.log("correo enviado correctamente", info.response)
        }
    })


}
const nodemailer = require('nodemailer');


const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });
  

module.exports = {
    confirmRegister: async (data)=>{

        const {name, email, token} = data;
 
        try{

            const infoMail = await transport.sendMail({
                from: "Project Manager <info@projectManager.com",
                to: email,
                subject: "Confirma tu cuenta",
                text: "Confirma tu cuenta en PM",
                html: `
                <p>Hola ${name}, haz click en el siguiente enlace</p>,
                <a href="${process.env.URL_FRONTEND}/confirm/${token}">Confirma tu cuenta</a>          
                `
            })
            
            console.log(infoMail);
        }catch(err){
            console.log(err);
        }


    },
    forgotPassword: async (data)=>{

        const {name, email, token} = data;
        try{

            const infoMail = await transport.sendMail({
                from: "Project Manager <info@projectManager.com",
                to: email,
                subject: "Restablecer la contraseña",
                text: "Restablecer la contraseña en PM",
                html: `
                <p>Hola ${name}, haz click en el siguiente enlace</p>,
                <a href="${process.env.URL_FRONTEND}/recover-password/${token}">Restablece tu contraseña</a> 
                
                `
            })
            
            console.log(infoMail);
        }catch(err){
            console.log(err);
        }
    }

}
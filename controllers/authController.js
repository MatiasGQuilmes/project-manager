module.exports = {
    register: async(req, res)=>{

        try{

            const {name, email, password} = req.body;

             if([name, email, password].includes("")){
                let error = new Error("Todos los campos son obligatorios");
                error.status = 400;
                throw error;
             }


            return res.status(201).json({
                ok: true,
                msg: 'usuario registrado'
            })
        }catch(error){
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'ups, hubo un error'
            })
        }     
    },
    login: async(req, res)=>{

        try{
            return res.status(200).json({
                ok: true,
                msg: 'usuario logueado'
            })
        }catch(error){
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'ups, hubo un error en el login'
            })
        }
    },
    checked: async(req, res)=>{

        try{
            return res.status(201).json({
                ok: true,
                msg: 'usuario chequeado'
            })
        }catch(error){
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'ups, hubo un error en el checked'
            })
        }
    },
    sendToken: async(req, res)=>{

        try{
            return res.status(200).json({
                ok: true,
                msg: 'Token enviado'
            })
        }catch(error){
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'ups, hubo un error en el send-token'
            })
        }
    },
    verifyToken: async(req, res)=>{

        try{
            return res.status(200).json({
                ok: true,
                msg: 'Token enviado'
            })
        }catch(error){
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'ups, hubo un error en el send-token'
            })
        }
    },
    changePassword: async(req, res)=>{

        try{
            return res.status(200).json({
                ok: true,
                msg: 'Password actualizado'
            })
        }catch(error){
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'ups, hubo un error en change-password'
            })
        }
    }
}
const createError = require('http-errors');
const UserDB = require("../database/models/User")
const errorResponse = require('../helpers/errorResponse');
const generateTokenRandom = require('../helpers/generateTokenRandom');
const generateJWT = require("../helpers/generateJWT");

module.exports = {
    register: async(req, res)=>{

        try{

            const {name, email, password} = req.body;

            if([name, email, password].includes("")){
                throw createError(400,"Todos los campos son obligatorios");
            }

            let user = await UserDB.findOne({
                email: email
            })


            if(user){
                throw createError(400,"El email ya se encuentra registrado");
            }

            user = new UserDB(req.body);
            user.token = generateTokenRandom()
            
            const userSaved = await user.save();

            //todo: enviar email de confirmacion


            return res.status(201).json({
                ok: true,
                msg: 'usuario registrado',
                data: userSaved
            })

        }catch(error){
            console.log(error);
            return errorResponse(res, error, "REGISTER")
        }     
    },
    login: async(req, res)=>{

        try{
            const {email, password} = req.body;

            if([email, password].includes("")){
                throw createError(400,"Todos los campos son obligatorios");
            }
    
            // let user = await UserDB.findOne({
            //     email: email
            // }, (err, user) => {
            //     if(err) throw createError(403,"El email ingresado no existe");
            //     return user
            // })

            let user = await UserDB.findOne({
                email: email
            })
    
            if(!user){
                throw createError(403,"El email ingresado no existe");
            }

            if(!user.checked){
                throw createError(403,"Tienes que confirmar tu cuenta");
            }

            if(!await user.checkedPassword(password)){
                throw createError(403,"contraseña incorrecta");
            }


            return res.status(200).json({
                ok: true,
                msg: 'usuario logueado',
                user: {
                    nombre: user.name,
                    email: user.email,
                    token: generateJWT({
                        id: user._id
                    })

                }
            })
            
        }catch(error){
            console.log(error);
            return errorResponse(res, error, "LOGIN")
        }
    },
    checked: async(req, res)=>{

        const {token} = req.query; 

        try{
            if(!token){
                throw createError(400,"token inexistente");
            }

            const user = await UserDB.findOne({
                token
            });

            if(!user){
                throw createError(400,"token invalido");
            }

            user.checked = true;
            user.token = "";

            await user.save()

            return res.status(201).json({
                ok: true,
                msg: 'registro completado exitosamente'
            })
        }catch(error){
            console.log(error);
            return errorResponse(res, error, "CHECKED")
        }
    },
    sendToken: async(req, res)=>{

        const {email} = req.body;

        try{

            let user = await UserDB.findOne({
                email
            })

            if(!user) throw createError(400,"el email es incorrecto");
            
            user.token = generateTokenRandom()

            await user.save()

            // todo: enviar email para restablecer la contraseña
            

            return res.status(200).json({
                ok: true,
                msg: 'Se ha enviado las instrucciones al email'
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
             return errorResponse(res, error, "SEND-TOKEN")
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
             return errorResponse(res, error, "CHANGE-PASSWORD")
        }
    }
}
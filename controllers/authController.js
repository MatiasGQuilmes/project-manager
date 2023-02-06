const createError = require('http-errors');
const UserDB = require("../database/models/User")
const errorResponse = require('../helpers/errorResponse');
const generateTokenRandom = require('../helpers/generateTokenRandom');
const generateJWT = require("../helpers/generateJWT");
const { confirmRegister, forgotPassword } = require('../helpers/sendMails');

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

            const token = generateTokenRandom();

            user = new UserDB(req.body);
            user.token = token;
            
            const userSaved = await user.save();

            //envia email de confirmacion
            await confirmRegister({
                name: userSaved.name,
                email: userSaved.email,
                token: userSaved.token
            })

            return res.status(201).json({
                ok: true,
                msg: `Se ha enviado las instruccion para completar el registro al email ${email} `,
                user: userSaved
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
                    _id: user._id,
                },
                token: generateJWT({
                    id: user._id
                })
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

            if(!user) throw createError(400,"el email no esta registrado");
            
            const token = generateTokenRandom();

            user.token = token

            const userSaved = await user.save()

            // todo: enviar email para restablecer la contraseña

            await forgotPassword({
                name: userSaved.name,
                email: userSaved.email,
                token: userSaved.token
            })

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

            const {token} = req.query;

            if(!token) throw createError(400, "debe colocar un token en la peticion")

            const user = await UserDB.findOne({
                token
            })

            if(!user) throw createError(400, "el token no existe")

            return res.status(200).json({
                ok: true,
                msg: 'Token verificado'
            })
        }catch(error){
            console.log(error);
             return errorResponse(res, error, "VERIFY-TOKEN")
        }
    },
    changePassword: async(req, res)=>{

        try{

            const {token} = req.query;
            const {password} = req.body;

            if(!password) throw createError(400, "debe colocar el password!!");

            const user = await UserDB.findOne({
                token
            })

            if(!user) throw createError(400, "el token es invalido!!");

            user.password = password;
            user.token = "";

            await user.save();

            return res.status(200).json({
                ok: true,
                msg: 'La contraseña ha sido reestablecido exitosamente'
            })
        }catch(error){
            console.log(error);
             return errorResponse(res, error, "CHANGE-PASSWORD")
        }
    }
}
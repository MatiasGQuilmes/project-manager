const Project = require("../database/models/Project");
const createError = require('http-errors');
const ObjectId = require("mongoose").Types.ObjectId

module.exports = {
    list: async(req, res)=>{

        try{

            const projects = await Project.find().where('createdBy').equals(req.user)


            return res.status(201).json({
                ok: true,
                msg: 'lista de proyectos',
                projects 
            })

        }catch(error){
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'ups, hubo un error en lista de proyectos'
            })
        }     
    },
    store: async(req, res)=>{

        try{

            const { name, description, client} = req.body;

            if([name, description, client].includes("") || !name || !description || !client) throw createError(400, "todos los campos son obligatorios")

            if(!req.user) throw createError(401, "Error de authentication")

            const project = new Project(req.body)
            project.createdBy = req.user._id
            // console.log(project);

            const projectSaved = await project.save()

            return res.status(201).json({
                ok: true,
                msg: 'proyecto guardado',
                project: projectSaved
            })
        }catch(error){
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'ups, hubo un error en store'
            })
        }
    },
    detail: async(req, res)=>{

        try{

            const { id } = req.params;

            if(!ObjectId.isValid(id)){
                throw createError(400, "no es un id valido")
              }

            const project = await Project.findById(id);
            
            if(!project) throw createError(404, "proyecto no encontrado")

            if(req.user._id.toString() !== project.createdBy.toString()) throw createError(401, "No estas autorizado capo/a")


            return res.status(200).json({
                ok: true,
                msg: 'detalle del proyecto',
                project
            })
        }catch(error){
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'ups, hubo un error en project-detail'
            })
        }
    },
    update: async(req, res)=>{

        try{

            const { id } = req.params;
            if(!ObjectId.isValid(id)){
                throw createError(400, "no es un id valido")
            }

            const project = await Project.findById(id);
            
            if(!project) throw createError(404, "proyecto no encontrado")

            if(req.user._id.toString() !== project.createdBy.toString()) throw createError(401, "No estas autorizado capo/a")

            const {name ,description, client, dataExpire} = req.body;

            project.name = name || project.name;
            project.description = description || project.description;
            project.client = client || project.client;
            project.dataExpire = dataExpire || project.dataExpire;

            const projectUpdated = await project.save()

            return res.status(201).json({
                ok: true,
                msg: 'proyecto actualizado',
                project: projectUpdated
            })
        }catch(error){
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'ups, hubo un error en project-update'
            })
        }
    },
    remove: async(req, res)=>{

        try{

            const { id } = req.params;
            if(!ObjectId.isValid(id)){
                throw createError(400, "no es un id valido")
            }

            const project = await Project.findById(id);
            
            if(!project) throw createError(404, "proyecto no encontrado")

            if(req.user._id.toString() !== project.createdBy.toString()) throw createError(401, "No estas autorizado capo/a")

            await project.deleteOne()

            return res.status(200).json({
                ok: true,
                msg: 'proyecto eliminado'
            })
        }catch(error){
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'ups, hubo un error en el project-remove'
            })
        }
    },
    addCollaborator: async(req, res)=>{

        try{
            return res.status(200).json({
                ok: true,
                msg: 'colaborador agregado'
            })
        }catch(error){
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'ups, hubo un error en colaborator-add'
            })
        }
    },
    removeCollaborator: async(req, res)=>{

        try{
            return res.status(200).json({
                ok: true,
                msg: 'colaborador eliminado'
            })
        }catch(error){
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'ups, hubo un error en colaborator-remove'
            })
        }
    }
}
const Project = require("../database/models/Project");
const Task = require("../database/models/Task");

module.exports = {
    list: async(req, res)=>{

        try{
            return res.status(201).json({
                ok: true,
                msg: 'lista de tareas'
            })
        }catch(error){
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'ups, hubo un error en task-list'
            })
        }     
    },
    store: async(req, res)=>{

        try{

            const {name, description, priority, project : projectId} = req.body;
            
            if( [name, description, priority].includes("") || !name || !description || !priority) throw createError(400, "Todos los campos son obligatorios");

            const project = await Project.findById(projectId);

            if (req.user._id.toString() !== project.createdBy.toString()) throw createError(403, "No estás autorizado");


            const taskStore = await Task.create(req.body);

            project.tasks.push(taskStore._id);
            
            await project.save();


            return res.status(201).json({
                ok: true,
                msg: 'tarea guardado'
            })
        }catch(error){
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'ups, hubo un error en store-task'
            })
        }
    },
    detail: async(req, res)=>{

        try{
            return res.status(200).json({
                ok: true,
                msg: 'detalle de la tarea'
            })
        }catch(error){
            console.log(error);
            return errorResponse(res, error, "STORE-TASK");
        }
    },
    update: async(req, res)=>{

        try{
            return res.status(201).json({
                ok: true,
                msg: 'tarea actualizada'
            })
        }catch(error){
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'ups, hubo un error en task-update'
            })
        }
    },
    remove: async(req, res)=>{

        try{
            return res.status(200).json({
                ok: true,
                msg: 'tarea eliminada'
            })
        }catch(error){
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'ups, hubo un error en el task-remove'
            })
        }
    },
    changeState: async(req, res)=>{

        try{
            return res.status(200).json({
                ok: true,
                msg: 'tarea completada'
            })
        }catch(error){
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'ups, hubo un error en change-state'
            })
        }
    }
}
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
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'ups, hubo un error en task-detail'
            })
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
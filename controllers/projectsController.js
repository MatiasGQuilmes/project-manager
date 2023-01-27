module.exports = {
    list: async(req, res)=>{

        try{
            return res.status(201).json({
                ok: true,
                msg: 'lista de proyectos'
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
            return res.status(201).json({
                ok: true,
                msg: 'proyecto guardado'
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
            return res.status(200).json({
                ok: true,
                msg: 'detalle del proyecto'
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
            return res.status(201).json({
                ok: true,
                msg: 'proyecto actualizado'
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
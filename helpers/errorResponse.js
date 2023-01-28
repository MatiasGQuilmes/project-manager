module.exports = (res, error, method) =>{    
    return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || `ups, hubo un error en el ${method}`
    })
}
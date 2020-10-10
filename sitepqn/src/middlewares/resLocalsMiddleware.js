module.exports =(req,res,next)=> {
    if(req.session.usuario){
        res.local.usuario = req.session.usuario
        
    }
    next()
}
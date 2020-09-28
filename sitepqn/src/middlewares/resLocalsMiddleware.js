module.exports =(req,res,next)=> {
    if(req.session.user){
        res.local.user = req.session.user
        next ()
    }
    next()
}
module.exports = function sessionUserCheck(req,res,next){
    if(req.session.usuario){
        res.redirect('/')
    }else{
    	next()
    }
}
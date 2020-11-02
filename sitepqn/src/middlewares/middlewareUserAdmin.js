module.exports = function sessionUserAdminCheck(req,res,next){
    if(req.session.usuario && req.session.usuario.rol == "admin"){
        next()
    }else{
    	req.session.url = req.originalUrl;
        res.redirect('/registro')
    }
}
module.exports = function(req,res,next){
    if(req.cookies.userPQNTA){
        req.session.usuario = req.cookies.userMercadoLiebre;
        next()
    }else{
        next()
    }
}
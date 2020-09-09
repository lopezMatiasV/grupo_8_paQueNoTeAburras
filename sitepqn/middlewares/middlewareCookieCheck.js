module.exports = function(req,res,next){
    if(req.cookies.userPQNTA){
        req.session.usuario = req.cookies.userPQNTA;
        next()
    }else{
        next()
    }
}
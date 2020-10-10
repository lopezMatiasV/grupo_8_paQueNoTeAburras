module.exports = function(req,res,next){
    if(req.cookies.userPQNTA){
        console.log(`
        -------------------------------------------------
        ${req.cookies.userPQNTA}
        -------------------------------------------------`)
        req.session.usuario = req.cookies.userPQNTA;
        res.locals.usuario = req.session.usuario
    }
    next()
}
module.exports = function sessionUserCheck(req,res,next){
    if(req.session.usuario){
        next()
    }else{
    	req.session.url = req.originalUrl;
        res.redirect('/registro')
    }
}
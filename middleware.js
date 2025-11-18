module.exports.isLoggedIn=(req,res,next)=>{
     
    if(!req.isAuthenticated()){// this is checking user is login or not 
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in to create listing");
        res.redirect("/login"); 
          
    }
    next();
}

module.exports.saveRedirectUrl = (req, res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirect = req.session.redirect;
    }
    next();
}


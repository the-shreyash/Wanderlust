module.exports.isLoggedIn=(req,res)=>{
    if(!req.isAuthenticated()){// this is checking user is login or not 
        req.flash("error","you must be logged in to create listing");
        res.redirect("/login"); 
    }
    next();
}
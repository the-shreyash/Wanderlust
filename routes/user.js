const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { route } = require("./listing.js");
const passport = require("passport");
const { saveRedirectUrl}= require("../middleware.js");


router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
})

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "user was registered successfull");
            res.redirect("/listings");
        }) 
        
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }



})); 

router.get("/login", (req, res) => {
    res.render("users/signup.ejs")
})


router.post("/login", saveRedirectUrl,
    passport.authenticate("local", 
    { faliureRedirect: "/login", failireFlash: true }),
    async (req, res) => {
    res.flash("logged in successfully");
    let redirectUrl = res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl); 
})

router.get("/logout",(req,res,next)=>{
    req.logOut((err)=>{
        return next(err);
    })
    req.flash("success","you are logged out!");
    res.redirect("/listings");
})

module.exports = router;

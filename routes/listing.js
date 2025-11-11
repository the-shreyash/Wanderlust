const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema}= require("../schema.js")
const listing = require("../models/listing.js");
const {isLoggedIn} = require("../middleware.js");




// router.get("/test",(req,res)=>{
//     res.send("this is a test route");
//     console.log("test route working");
// }) 


//midleware for validation
const validateListing = (req,res,next)=>{
    let {error}= (listingSchema.req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}

//index route
router.get("/",wrapAsync(async (req,res)=>{
    const allListing=await listing.find({});
    res.render("listings/index.ejs",{allListing});
    }));  

//new route
router.get("/new",isLoggedIn,(req,res)=>{
    console.log(req.user); 
    
    res.render("listings/new.ejs");

})


//show route
router.get("/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id).populate();
    if(!listing){
        req.flash("error","cannot find that listing");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
 
}))

//create route
router.post("/",isLoggedIn,validateListing,wrapAsync(async(req,res,next)=>{
    // let{title,description,image,price,locatoin,countery}=req.body
    // let listing= req.body.listing;
    // console.log(listing);
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send a valid data for listing");
    // }

    
    const newListing = new Listing(req.body.listing);

    
    // if(!newListing.title){
    //    throw new ExpressError(400,"Title is missing");
    // }
    // if(!newListing.discriptino){
    //    throw new ExpressError(400,"discription is missing");
    // }
    // if(!newListing.image){
    //    throw new ExpressError(400,"image is missing");
    // }
    // if(!newListing.location){
    //    throw new ExpressError(400,"location is missing");
    // }

    await newListing.save();
    req.flash("success", "listing created successfully");
    res.redirect("/");
    
        
    }))  


//edit route
router.get("/:id/edit",isLoggedIn,wrapAsync(async (req,res)=>{
    let{id}= req.params;
    const listing = await Listing.findById(id);
    req.flash("success", "listing edited successfully");
    if(!listing){
        req.flash("error","cannot find that listing");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
}));

//update route
router.put("/:id",isLoggedIn,validateListing,wrapAsync(async (req,res)=>{
    
    let{id}= req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success", "listing updated successfully");
    res.redirect(`/listings/${id}`);
}))

//delete route
router.delete("/:id",isLoggedIn,wrapAsync(async (req,res)=>{
    let {id}= req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log("deleted listing is ",deletedListing);
    req.flash("delete", "listing deleted successfully");
    res.redirect("/listings");
}))

module.exports = router;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing");
const MONGO_UR = "mongodb://localhost:27017/wonderlust";
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js"); 




const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");




main()
    .then((() => {
        console.log("Connected to MongoDB");
         
    }))
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_UR);
}
main();
// async function main() {
//   try {
//     await mongoose.connect(MONGO_UR, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log("✅ Connected to MongoDB successfully");
//   } catch (err) {
//     console.error("❌ MongoDB connection failed:", err.message);
//   }
// }
// main();





app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, 'public')));


const sesssionOption ={
    secret: "mysupersceret",
    resave:false,
    saveninitailized:true,
    cookie:{
        expire: Date.now()+ 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly:true,
    }
};

app.use(session(sesssionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.delete = req.flash("delete");
    res.locals.error = req.flash("error");
    next();
});

app.get("/demouser",async(req,res)=>{
    let fakeUser = new User({
        email: "shreya@gmail.com",
        username: "shreyash"

    });

   let registeredUser= await User.register(fakeUser,"mypassword");
   res.send(registeredUser);
})


app.get("/", async (req, res) => {

    // res.send("Hi ,I m shreyash");
    const allListing = await listing.find({});
    res.render("listings/index.ejs", { allListing });
    // res.send("Welcome to Wonderlust Home Page");

});



//now all this code for listing route  shifted into listing.js because now we use router to just covnert this long into small one line code by requiring code of listing.js file by router 

app.use("/listings", listingsRouter);


//post review route
//post route create 

app.use("/listing/:id/review",reviewsRouter);



// app.get("/testinglisting",async (req,res)=>{
//     let sampleListing = new listing({
//         title :"my new villa" ,
//         description: "A beautiful villa with a sea view",
//         priceL:1200,
//         location:"Goa",
//         countery:"india",

//  });


//     await sampleListing.save();
//     console.log("sample was saved ");
//     res.send("successfull testing ");
// })

app.use("/",userRouter);

app.all("/*", (req, res, next) => {
    next(new ExpressError(404, "page not found"));
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { err });

})

// const listEndpoints = require('express-list-endpoints');

// console.log(listEndpoints(app));



app.listen(8080, () => {
            console.log("Server is running on port 8080");
    });

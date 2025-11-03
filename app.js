const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing");
const MONGO_UR = "mongodb://localhost:27017/wonderlust";
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");



const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");


main()
    .then((() => {
        console.log("Connected to MongoDB");
        app.listen(8080, () => {
            console.log("Server is running on port 8080");
        }); 
    }))
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_UR);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, 'public')));



app.get("/", async (req, res) => {

    // res.send("Hi ,I m shreyash");
    const allListing = await listing.find({});
    res.render("listings/index.ejs", { allListing });
    // res.send("Welcome to Wonderlust Home Page");

});



//now all this code for listing route  shifted into listing.js because now we use router to just covnert this long into small one line code by requiring code of listing.js file by router 

app.use("/listings", listings);


//post review route
//post route create 

app.use("/listing/:id/review",reviews);



// app.get("/testinglisting",async (req,res)=>{
//     let sampleListing = new listing({
//         title :"my new villa" ,
//         description: "A beautiful villa with a sea view",
//         priceL:1200,
//         location:"Goa",
//         countery:"india",

//     });

//     await sampleListing.save();
//     console.log("sample was saved ");
//     res.send("successfull testing ");
// })

app.all("/*", (req, res, next) => {
    next(new ExpressError(404, "page not found"));
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { err });

})

// const listEndpoints = require('express-list-endpoints');

// console.log(listEndpoints(app));

app.get("/seed", async (req, res) => {
  const sample = new listing({
    title: "Mountain View Cabin",
    description: "A cozy wooden cabin in Himachal.",
    price: 1500,
    location: "Manali",
    country: "India"
  });
  await sample.save();
  res.send("Sample listing added!");
});


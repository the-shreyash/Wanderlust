const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


const MONGO_UR="mongodb://localhost:27017/wonderlust";

main()
    .then((()=>{
        console.log("Connected to MongoDB");
    }))
    .catch((err)=>{
        console.log(err);
    });

async function main(){
    await mongoose.connect(MONGO_UR);
}

const initDB= async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initalized");
};

initDB();
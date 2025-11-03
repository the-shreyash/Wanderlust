const mongoose = require("mongoose");
const review = require("./review.js");
const Schema = mongoose.Schema;



const listingSchema = new Schema({
    title:{
        type:String,
        required: true,
    },
    description:String,
    image:{
        filename: {
            type: String,
            default: "listingimage"
        },
        url:{
            type: String,
            default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s",
            set : (v)=>v === "" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s" : v,

        }
        
    },
    price:Number,
    location:String,
    country:String,

    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ]
});

//post mongoose midleware that help to delete the review of listing if delete that listing

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await review.deleteMany({_id: {$in:listing.reviews}})
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;
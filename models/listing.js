const { ref } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js');

const listingSchema = new Schema({
    title: {
        type : String,
        required : true,
    },
    description : String,
    image : {
       url : String,
       filename : String,
    },
    price : Number,
    location : String,
    country : String,
    // Array of review ObjectIds referencing the Review model and its a part of mongoose relationships and population
    geometry: {
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
},
    reviews : [{
        type : Schema.Types.ObjectId,
        ref : 'Review',
    }],
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    }
});

listingSchema.post('findOneAndDelete', async (listing)=>{
    if(listing){
        await Review.deleteMany({
            _id : {
                $in : listing.reviews
            }
        })
    }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports =  Listing;



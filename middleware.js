const Listing = require('./models/listing');
const ExpressError = require('./utils/ExpressError.js');
const Review = require('./models/review');
const { listingSchema , reviewSchema} = require('./schema.js');

module.exports.isLoggedIn = (req, res, next) => {
    console.log(req.user);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash('error', 'You must be logged in to access that page!');       
        return res.redirect('/login');
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;   
    }   
    next();
}


module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currentUser._id)){    
        req.flash('error', 'You are not the owner of this listing!');
        return res.redirect(`/listings/${id}`);
    }
    next();
}   


// schema validation middleware for listings
module.exports.validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
   if(error){
    let errorMessages = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, errorMessages)
   }else{
    next();
   }
}



// schema validation middleware for reviews
module.exports.validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
   if(error){
    let errorMessages = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, errorMessages)
   }else{
    next();
   }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id , reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currentUser._id)){    
        req.flash('error', 'You are not the author of this review.');
        return res.redirect(`/listings/${id}`);
    }
    next();
}   


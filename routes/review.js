const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const Review = require('../models/review');
const Listing = require('../models/listing');
const { validateReview, isLoggedIn , isReviewAuthor } = require('../middleware.js');
const reviewControllers = require('../controllers/reviews');


// reviews routes
// post route for creating a review for a listing
router.post("/", isLoggedIn ,validateReview, wrapAsync(reviewControllers.createReview));

// Delete route for deleting a review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewControllers.deleteReview));

module.exports = router;


